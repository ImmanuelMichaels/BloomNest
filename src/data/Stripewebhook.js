const functions = require('firebase-functions');
const admin = require('firebase-admin');
const Stripe = require('stripe');

if (!admin.apps.length) admin.initializeApp();

const stripe = Stripe(functions.config().stripe.secret_key);
const endpointSecret = functions.config().stripe.webhook_secret;
const db = admin.firestore();

exports.stripeWebhook = functions.https.onRequest(async (req, res) => {
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.rawBody,
      req.headers['stripe-signature'],
      endpointSecret
    );
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;

    if (session.metadata?.type === 'founding_member_reservation') {
      await db.collection('foundingMembers').add({
        email: session.customer_email,
        name: session.metadata.name || null,
        amountPaid: session.amount_total / 100,
        currency: session.currency,
        stripeSessionId: session.id,
        stripeCustomerId: session.customer,
        // status lifecycle: reserved -> refunded, or reserved -> converted (at launch)
        status: 'reserved',
        reservedAt: admin.firestore.FieldValue.serverTimestamp(),
      });
    }
  }

  res.json({ received: true });
});