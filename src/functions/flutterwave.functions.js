// functions/flutterwave.js
//
// Flutterwave payment integration for Femin9 Founding Member reservations.
// Region: europe-west2 (matches the rest of the Femin9 Firebase project).
//
// Setup:
//   1. npm install axios firebase-admin firebase-functions (in your functions dir)
//   2. Set secrets (never commit these, never put them in frontend code):
//        firebase functions:secrets:set FLW_SECRET_KEY
//        firebase functions:secrets:set FLW_WEBHOOK_HASH
//      FLW_SECRET_KEY is your Flutterwave secret key (starts with FLWSECK_).
//      FLW_WEBHOOK_HASH is a string YOU choose — enter the same string under
//      Flutterwave Dashboard > Settings > Webhooks as the "secret hash".
//      Flutterwave echoes it back on every webhook call so you can verify
//      the request actually came from them.
//   3. Set the webhook URL in the Flutterwave dashboard to the deployed
//      HTTPS endpoint for `flutterwaveWebhook` below.
//   4. require/export these from your main functions/index.js:
//        module.exports = { ...require('./flutterwave'), ...otherExports };
//
// Deploy:
//   firebase deploy --only functions:createFoundingMemberCheckout,functions:verifyFoundingMemberPayment,functions:flutterwaveWebhook

const { onCall, onRequest, HttpsError } = require('firebase-functions/v2/https');
const { defineSecret } = require('firebase-functions/params');
const axios = require('axios');
const admin = require('firebase-admin');

if (!admin.apps.length) {
  admin.initializeApp();
}

const REGION = 'europe-west2';
const RESERVATION_FEE_GBP = 6.99; // Founding Member reservation fee — adjust if this isn't the intended amount
const CURRENCY = 'GBP';
const FLW_BASE_URL = 'https://api.flutterwave.com/v3';

const FLW_SECRET_KEY = defineSecret('FLW_SECRET_KEY');
const FLW_WEBHOOK_HASH = defineSecret('FLW_WEBHOOK_HASH');

// ── Helpers ──────────────────────────────────────────────────────────────

function isValidEmail(email) {
  return typeof email === 'string' && /^\S+@\S+\.\S+$/.test(email);
}

async function markReservationPaid(db, txRef, flwTransactionId) {
  const snapshot = await db
    .collection('foundingMembers')
    .where('txRef', '==', txRef)
    .limit(1)
    .get();

  if (snapshot.empty) {
    console.warn(`No foundingMembers doc found for txRef ${txRef}`);
    return;
  }

  await snapshot.docs[0].ref.set(
    {
      status: 'paid',
      flwTransactionId,
      paidAt: admin.firestore.FieldValue.serverTimestamp(),
    },
    { merge: true }
  );
}

function transactionIsValid(data) {
  return (
    !!data &&
    data.status === 'successful' &&
    data.currency === CURRENCY &&
    Number(data.amount) >= RESERVATION_FEE_GBP
  );
}

// ── createFoundingMemberCheckout ────────────────────────────────────────
// Callable from the client. Initializes a Flutterwave Standard Checkout
// transaction and returns a hosted payment link to redirect to.

exports.createFoundingMemberCheckout = onCall(
  { region: REGION, secrets: [FLW_SECRET_KEY] },
  async (request) => {
    const { email, name, redirectUrl } = request.data || {};

    if (!isValidEmail(email)) {
      throw new HttpsError('invalid-argument', 'A valid email is required.');
    }
    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      throw new HttpsError('invalid-argument', 'A valid name is required.');
    }
    if (!redirectUrl || typeof redirectUrl !== 'string') {
      throw new HttpsError('invalid-argument', 'redirectUrl is required.');
    }

    const db = admin.firestore();
    const normalizedEmail = email.trim().toLowerCase();

    const existing = await db
      .collection('foundingMembers')
      .where('email', '==', normalizedEmail)
      .limit(1)
      .get();

    if (!existing.empty && existing.docs[0].data().status === 'paid') {
      throw new HttpsError(
        'already-exists',
        'This email is already registered for a founding member spot.'
      );
    }

    const docRef = existing.empty
      ? db.collection('foundingMembers').doc()
      : existing.docs[0].ref;

    const txRef = `fm_${docRef.id}_${Date.now()}`;

    let response;
    try {
      response = await axios.post(
        `${FLW_BASE_URL}/payments`,
        {
          tx_ref: txRef,
          amount: RESERVATION_FEE_GBP.toFixed(2),
          currency: CURRENCY,
          redirect_url: redirectUrl,
          customer: {
            email: normalizedEmail,
            name: name.trim(),
          },
          customizations: {
            title: 'Femin9 Founding Member',
            description: 'Founding Member reservation — £6.99/month locked for 12 months',
          },
          meta: {
            foundingMemberId: docRef.id,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${FLW_SECRET_KEY.value()}`,
            'Content-Type': 'application/json',
          },
        }
      );
    } catch (err) {
      console.error('Flutterwave initialize error:', err.response?.data || err.message);
      throw new HttpsError('internal', 'Could not start payment. Please try again.');
    }

    const link = response.data?.data?.link;
    if (!link) {
      console.error('Flutterwave response missing link:', response.data);
      throw new HttpsError('internal', 'Could not start payment. Please try again.');
    }

    await docRef.set(
      {
        email: normalizedEmail,
        name: name.trim(),
        txRef,
        status: 'pending',
        amount: RESERVATION_FEE_GBP,
        currency: CURRENCY,
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
        createdAt: existing.empty
          ? admin.firestore.FieldValue.serverTimestamp()
          : existing.docs[0].data().createdAt || admin.firestore.FieldValue.serverTimestamp(),
      },
      { merge: true }
    );

    return { link, txRef };
  }
);

// ── verifyFoundingMemberPayment ─────────────────────────────────────────
// Callable from the /membership-confirmation page after Flutterwave
// redirects the user back. Flutterwave appends `transaction_id` and
// `status` as query params on redirect_url — pass transaction_id here to
// verify server-side before showing a success screen.

exports.verifyFoundingMemberPayment = onCall(
  { region: REGION, secrets: [FLW_SECRET_KEY] },
  async (request) => {
    const { transactionId } = request.data || {};
    if (!transactionId) {
      throw new HttpsError('invalid-argument', 'transactionId is required.');
    }

    let response;
    try {
      response = await axios.get(`${FLW_BASE_URL}/transactions/${transactionId}/verify`, {
        headers: { Authorization: `Bearer ${FLW_SECRET_KEY.value()}` },
      });
    } catch (err) {
      console.error('Flutterwave verify error:', err.response?.data || err.message);
      throw new HttpsError('internal', 'Could not verify payment.');
    }

    const data = response.data?.data;
    const valid = transactionIsValid(data);

    if (valid) {
      await markReservationPaid(admin.firestore(), data.tx_ref, data.id);
    }

    return { success: valid };
  }
);

// ── flutterwaveWebhook ──────────────────────────────────────────────────
// HTTP endpoint Flutterwave calls directly. Configure this URL under
// Flutterwave Dashboard > Settings > Webhooks. This is the source of
// truth for payment status — it fires independently of whether the
// customer's browser makes it back to the confirmation page.

exports.flutterwaveWebhook = onRequest(
  { region: REGION, secrets: [FLW_WEBHOOK_HASH, FLW_SECRET_KEY] },
  async (req, res) => {
    const signature = req.headers['verif-hash'];
    if (!signature || signature !== FLW_WEBHOOK_HASH.value()) {
      res.status(401).send('Invalid signature');
      return;
    }

    const event = req.body;
    if (event?.event !== 'charge.completed' || event?.data?.status !== 'successful') {
      res.status(200).send('Ignored');
      return;
    }

    // Don't trust the webhook payload's amount/status alone — re-verify
    // directly against Flutterwave's API, which defends against forged
    // webhook calls even if the shared hash ever leaks.
    try {
      const verifyResponse = await axios.get(
        `${FLW_BASE_URL}/transactions/${event.data.id}/verify`,
        { headers: { Authorization: `Bearer ${FLW_SECRET_KEY.value()}` } }
      );

      const data = verifyResponse.data?.data;
      if (transactionIsValid(data)) {
        await markReservationPaid(admin.firestore(), data.tx_ref, data.id);
      }
    } catch (err) {
      console.error('Webhook verify error:', err.response?.data || err.message);
      res.status(500).send('Verification failed');
      return;
    }

    res.status(200).send('OK');
  }
);
