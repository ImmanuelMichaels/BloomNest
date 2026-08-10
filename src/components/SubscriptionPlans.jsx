// src/components/SubscriptionPlans.jsx
import { useState } from 'react';
import { createPortal } from 'react-dom';
import { getFunctions, httpsCallable } from 'firebase/functions';
import { app, auth } from '../context/firebase';
import {
  PAYMENTS_LIVE,
  FUNCTIONS_REGION,
  FOUNDING_PRICE,
  FOUNDING_PERKS,
  getReservationErrorMessage,
} from '../config/foundingMember';

// ── Plan IDs ─────────────────────────────────────────────────────────────────
// These values MUST match AppContext.jsx's PLAN_TYPES exactly (same strings),
// since AppContext.getAiMessageLimit() checks subscriptionPlan === PLAN_TYPES.PLUS.
// If you rename either side, rename both — do not let them drift.
export const PLAN_IDS = {
  FREE:       'free',
  BLOOM_PLUS: 'plus',
};

const PURPLE = '#4108a5';
const GREEN  = '#2E9E67';

export default function SubscriptionPlans({ onClose, onUpgrade }) {
  const [email, setEmail]         = useState(auth.currentUser?.email || '');
  const [name, setName]           = useState(auth.currentUser?.displayName || '');
  const [loading, setLoading]     = useState(false);
  const [error, setError]         = useState(null);
  const [waitlisted, setWaitlisted] = useState(false);

  const handleReserve = async () => {
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    if (!name || name.trim().length < 2) {
      setError('Please enter your full name.');
      return;
    }

    setError(null);
    setLoading(true);

    if (!PAYMENTS_LIVE) {
      // Payments aren't live — capture interest, don't fake an upgrade.
      try {
        const functions = getFunctions(app, FUNCTIONS_REGION);
        const joinWaitlist = httpsCallable(functions, 'joinFoundingMemberWaitlist');
        await joinWaitlist({ email: email.trim(), name: name.trim() });
        setWaitlisted(true);
      } catch (err) {
        console.error('Waitlist error:', err);
        setError(getReservationErrorMessage(err));
      } finally {
        setLoading(false);
      }
      return;
    }

    // Payments live — send them to real Flutterwave checkout.
    // IMPORTANT: onUpgrade is intentionally NOT called here. The user is
    // leaving the app for the Flutterwave checkout page, so we never know
    // client-side whether they actually paid. subscriptionPlan must be
    // flipped to PLAN_IDS.BLOOM_PLUS by a server-side webhook (the same
    // Cloud Function stack behind createFoundingMemberCheckout) once
    // Flutterwave confirms payment — not from this redirect.
    try {
      const functions = getFunctions(app, FUNCTIONS_REGION);
      const createCheckout = httpsCallable(functions, 'createFoundingMemberCheckout');
      const { data } = await createCheckout({
        email: email.trim(),
        name: name.trim(),
        redirectUrl: `${window.location.origin}/membership-confirmation`,
      });

      if (data && data.link) {
        window.location.href = data.link;
      } else {
        throw new Error('No payment link returned');
      }
    } catch (err) {
      console.error('Checkout error:', err);
      setError(getReservationErrorMessage(err));
      setLoading(false);
    }
  };

  const modal = (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="subscription-modal-title"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: 'rgba(0,0,0,0.45)',
        backdropFilter: 'blur(2px)',
        WebkitBackdropFilter: 'blur(2px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
        overflowY: 'auto',
      }}
    >
      <div
        style={{
          background: '#fff',
          borderRadius: 24,
          padding: '28px 24px',
          maxWidth: 440,
          width: '100%',
          boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
          position: 'relative',
        }}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          style={{
            position: 'absolute', top: 16, right: 16,
            background: 'none', border: 'none',
            fontSize: 20, cursor: 'pointer', color: '#999',
            lineHeight: 1, padding: 4,
          }}
        >
          ✕
        </button>

        {waitlisted ? (
          <div style={{ textAlign: 'center', padding: '12px 0' }}>
            <h2 id="subscription-modal-title" style={{ fontSize: 22, fontWeight: 800, color: '#222', marginBottom: 8 }}>
              You're on the list 🎉
            </h2>
            <p style={{ fontSize: 14, color: '#666', marginBottom: 20 }}>
              We'll email you at <strong>{email}</strong> with a link to lock in your
              {' '}{FOUNDING_PRICE}/month founding price the moment payments open.
            </p>
            <button
              onClick={onClose}
              style={{
                width: '100%', padding: '12px 18px', borderRadius: 40,
                background: PURPLE, color: '#fff', fontSize: 14, fontWeight: 700,
                border: 'none', cursor: 'pointer',
              }}
            >
              Done
            </button>
          </div>
        ) : (
          <>
            <h2 id="subscription-modal-title" style={{ fontSize: 22, fontWeight: 800, color: '#222', textAlign: 'center', marginBottom: 4 }}>
              Become a Founding Member
            </h2>
            <p style={{ fontSize: 13, color: '#666', textAlign: 'center', marginBottom: 20 }}>
              Be one of the first 100 Founding Members and lock in founding pricing
              before we launch.
            </p>

            <div style={{
              border: `2px solid ${PURPLE}`,
              borderRadius: 18,
              padding: '18px 16px',
              marginBottom: 18,
            }}>
              <div style={{ textAlign: 'center', marginBottom: 14 }}>
                <span style={{ fontSize: 32, fontWeight: 800, color: PURPLE }}>{FOUNDING_PRICE}</span>
                <span style={{ fontSize: 12, color: '#999' }}>/month — locked for 12 months</span>
              </div>

              <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: 13, color: '#444' }}>
                {FOUNDING_PERKS.map((perk) => (
                  <li key={perk} style={{ display: 'flex', gap: 8, padding: '4px 0' }}>
                    <span style={{ color: GREEN, flexShrink: 0 }}>✓</span>{perk}
                  </li>
                ))}
              </ul>
            </div>

            <input
              type="text"
              placeholder="Your full name *"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{
                width: '100%', padding: '11px 14px', borderRadius: 12,
                border: '1.5px solid #e0d5f5', fontSize: 14, marginBottom: 10,
                boxSizing: 'border-box', outline: 'none',
              }}
            />
            <input
              type="email"
              placeholder="Your email address *"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: '100%', padding: '11px 14px', borderRadius: 12,
                border: '1.5px solid #e0d5f5', fontSize: 14, marginBottom: 14,
                boxSizing: 'border-box', outline: 'none',
              }}
            />

            {error && (
              <div style={{
                background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: 10,
                padding: '9px 14px', marginBottom: 14, fontSize: 13, color: '#991B1B',
                textAlign: 'center',
              }}>
                {error}
              </div>
            )}

            <button
              onClick={handleReserve}
              disabled={loading}
              style={{
                width: '100%', padding: '14px 18px', borderRadius: 40,
                background: PURPLE, color: '#fff', fontSize: 15, fontWeight: 700,
                border: 'none', cursor: loading ? 'not-allowed' : 'pointer',
                opacity: loading ? 0.7 : 1,
              }}
            >
              {loading
                ? 'Please wait…'
                : PAYMENTS_LIVE
                  ? `Reserve my Founding Member spot — ${FOUNDING_PRICE}`
                  : 'Join the Founding Member list'}
            </button>

            {PAYMENTS_LIVE && (
              <p style={{ fontSize: 11, color: '#999', textAlign: 'center', marginTop: 10 }}>
                You'll be taken to secure checkout to complete payment.
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );

  return createPortal(modal, document.body);
}