const functions = require('firebase-functions');
const Stripe = require('stripe');

const stripe = Stripe(functions.config().stripe.secret_key);

exports.createFoundingMemberCheckout = functions.https.onCall(async (data, context) => {
  const { email, name } = data || {};

  if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
    throw new functions.https.HttpsError('invalid-argument', 'A valid email is required.');
  }

  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    payment_method_types: ['card'],
    customer_email: email,
    line_items: [
      {
        price_data: {
          currency: 'gbp',
          product_data: {
            name: 'Femin9 Founding Member Reservation',
            description:
              'Reserves your Founding Member spot at £6.99/month, locked for 12 months from launch. ' +
              'Fully refundable any time before launch.',
          },
          unit_amount: 699, // £6.99, in pence
        },
        quantity: 1,
      },
    ],
    metadata: {
      type: 'founding_member_reservation',
      name: name || '',
    },
    success_url: 'https://femin9.online/founding-member/success?session_id={CHECKOUT_SESSION_ID}',
    cancel_url: 'https://femin9.online/founding-member',
  });

  return { url: session.url };
});

