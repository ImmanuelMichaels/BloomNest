// src/pages/FoundingMemberReservation.jsx
import { useState } from 'react';
import { getFunctions, httpsCallable } from 'firebase/functions';
import { app } from '../context/firebase';
import {
  PAYMENTS_LIVE,
  FUNCTIONS_REGION,
  FOUNDING_PRICE,
  FOUNDING_PERKS,
  SUPPORT_EMAIL,
  getReservationErrorMessage,
} from '../config/foundingMember';

// ── Design tokens ──────────────────────────────────────────────────────────────
const PURPLE = '#4108a5';
const GREEN  = '#2E9E67';

export default function FoundingMemberReservation() {
  const [email, setEmail]   = useState('');
  const [name, setName]     = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState(null);
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

    // Payments aren't live yet — capture interest instead of calling
    // a Cloud Function that has no payment provider behind it.
    if (!PAYMENTS_LIVE) {
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
      console.error('Reservation error:', err);
      setError(getReservationErrorMessage(err));
      setLoading(false);
    }
  };

  if (waitlisted) {
    return (
      <div style={{ maxWidth: 480, margin: '0 auto', padding: '48px 20px', textAlign: 'center' }}>
        <h1 style={{ fontSize: 24, fontWeight: 800, color: '#222', marginBottom: 8 }}>
          You're on the list 🎉
        </h1>
        <p style={{ fontSize: 15, color: '#666' }}>
          Founding Member payments open shortly — we'll email you at{' '}
          <strong>{email}</strong> with a link to lock in your {FOUNDING_PRICE}/month spot
          the moment they do.
        </p>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 480, margin: '0 auto', padding: '48px 20px', fontFamily: 'inherit' }}>
      <h1 style={{ fontSize: 28, fontWeight: 800, color: '#222', textAlign: 'center', marginBottom: 8 }}>
        Be one of the first 100 Founding Members of Femin9
      </h1>
      <p style={{ fontSize: 15, color: '#666', textAlign: 'center', marginBottom: 32 }}>
        You're on the waitlist. This is the next step — reserve your place and lock in
        founding member pricing before we launch.
      </p>

      <div style={{
        background: '#fff',
        border: `2px solid ${PURPLE}`,
        borderRadius: 22,
        padding: '24px 22px',
        boxShadow: '0 8px 32px rgba(65,8,165,0.13)',
        marginBottom: 24,
      }}>
        <div style={{ textAlign: 'center', marginBottom: 18 }}>
          <span style={{ fontSize: 40, fontWeight: 800, color: PURPLE }}>{FOUNDING_PRICE}</span>
          <span style={{ fontSize: 13, color: '#999' }}>/month — Founding Member price, locked for 12 months</span>
        </div>

        <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 20px', fontSize: 13.5, color: '#444' }}>
          {FOUNDING_PERKS.map((item) => (
            <li key={item} style={{ display: 'flex', gap: 9, padding: '5px 0' }}>
              <span style={{ color: GREEN }}>✓</span>{item}
            </li>
          ))}
        </ul>

        <input
          type="text"
          placeholder="Your full name *"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{
            width: '100%', padding: '11px 14px', borderRadius: 12,
            border: '1.5px solid #e0d5f5', fontSize: 14, marginBottom: 10,
            boxSizing: 'border-box',
            outline: 'none',
            transition: 'border-color 0.2s',
          }}
          onFocus={(e) => e.target.style.borderColor = PURPLE}
          onBlur={(e) => e.target.style.borderColor = '#e0d5f5'}
        />

        <input
          type="email"
          placeholder="Your email address *"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: '100%', padding: '11px 14px', borderRadius: 12,
            border: '1.5px solid #e0d5f5', fontSize: 14, marginBottom: 14,
            boxSizing: 'border-box',
            outline: 'none',
            transition: 'border-color 0.2s',
          }}
          onFocus={(e) => e.target.style.borderColor = PURPLE}
          onBlur={(e) => e.target.style.borderColor = '#e0d5f5'}
        />

        {error && (
          <div style={{
            background: '#FEF2F2',
            border: '1px solid #FECACA',
            borderRadius: 10,
            padding: '9px 14px',
            marginBottom: 14,
            fontSize: 13,
            color: '#991B1B',
            textAlign: 'center',
          }}>
            {error}
          </div>
        )}

        <button
          onClick={handleReserve}
          disabled={loading}
          style={{
            width: '100%',
            padding: '14px 18px',
            borderRadius: 40,
            background: PURPLE,
            color: '#fff',
            fontSize: 15,
            fontWeight: 700,
            border: 'none',
            cursor: loading ? 'not-allowed' : 'pointer',
            opacity: loading ? 0.7 : 1,
            transition: 'opacity 0.2s, transform 0.1s',
          }}
        >
          {loading
            ? 'Please wait…'
            : PAYMENTS_LIVE
              ? `Reserve my Founding Member spot — ${FOUNDING_PRICE}`
              : 'Join the Founding Member list'}
        </button>

        <p style={{ fontSize: 11.5, color: '#999', textAlign: 'center', marginTop: 12 }}>
          Your reservation fee goes directly toward building the app. Full refund available
          any time before launch — email {SUPPORT_EMAIL}.
        </p>
      </div>

      <p style={{ fontSize: 11.5, color: '#aaa', textAlign: 'center' }}>
        By reserving, you agree this is a pre-launch reservation, not an active subscription.
        See our{' '}
        <a href="/privacy-notice" style={{ color: PURPLE, textDecoration: 'none', borderBottom: `1px solid ${PURPLE}` }}>
          interim privacy notice
        </a>{' '}
        and{' '}
        <a href="/founding-member-terms" style={{ color: PURPLE, textDecoration: 'none', borderBottom: `1px solid ${PURPLE}` }}>
          terms
        </a>.
      </p>
    </div>
  );
}