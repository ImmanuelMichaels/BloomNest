
export const PAYMENTS_LIVE = true;

export const FUNCTIONS_REGION = 'europe-west2';

export const FOUNDING_PRICE = '£6.99';

export const FOUNDING_PERKS = [
  'Guaranteed early access on launch day',
  'Founding Member price locked for 12 months from launch',
  'First access to nutrition, medication safety, and tracking features as they release',
  'Direct input into what we build next',
];

export const SUPPORT_EMAIL = 'hello@femin9.co.uk';

// Maps Firebase Functions error codes to user-facing copy. Shared so both
// components show identical messaging for the same failure.
export function getReservationErrorMessage(err) {
  if (err.code === 'functions/unauthenticated' || err.code === 'unauthenticated') {
    return 'You need to be signed in to make a reservation. Please log in and try again.';
  }
  if (err.code === 'functions/already-exists' || err.code === 'already-exists') {
    return 'This email is already registered for a founding member spot.';
  }
  return `Something went wrong. Please try again, or email ${SUPPORT_EMAIL}.`;
}