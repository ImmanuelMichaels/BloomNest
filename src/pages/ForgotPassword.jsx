// src/pages/ForgotPassword.jsx
//
// ── SECURITY NOTE FOR MICK ──────────────────────────────────────────────────
// Everything in this file is CLIENT-SIDE hardening: it deters casual abuse,
// prevents accidental spam, and closes the "user enumeration" leak (i.e. an
// attacker can't tell whether an email is registered from the response).
//
// It does NOT stop a determined attacker, because anyone can read this JS
// bundle and call Firebase's sendPasswordResetEmail directly from a script,
// bypassing every check below. The real defenses for this flow are:
//   1. Firebase Auth's own server-side rate limits (already active, out of
//      your control, can't be bypassed by editing this file)
//   2. Firebase App Check + reCAPTCHA Enterprise — verifies the request came
//      from your real app, not a script/bot. NOT wired up yet — this is
//      backend phase work. See TODO at bottom of file.
//   3. A Cloud Function fronting password-reset requests (instead of calling
//      the client SDK directly) so you can log/throttle/alert server-side.
// Ship this component now, but don't market it as "unhackable" — it's one
// layer of a defense-in-depth stack, and the important layers are still
// pending in the backend phase.
// ─────────────────────────────────────────────────────────────────────────

import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../context/firebase';
import { sendPasswordResetEmail } from 'firebase/auth';
import './Login.css'; // reuse the lg- design system from Login.jsx

// ─── Constants ────────────────────────────────────────────────────────────────
const EMAIL_REGEX        = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const RESEND_COOLDOWN_MS = 60 * 1000;       // 60s between sends to the same email
const MAX_REQUESTS       = 3;               // requests allowed per window
const WINDOW_MS          = 15 * 60 * 1000;  // 15 minute rolling window
const LOCKOUT_MS         = 30 * 60 * 1000;  // 30 min lockout after exceeding window cap

const STORAGE_KEY = 'pwResetGuard'; // single namespaced key, not scattered ones

// ─── Guard state helpers (all client-side, all bypassable — see note above) ──
function readGuard() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { requests: [], lockoutUntil: 0, lastEmail: '', lastSentAt: 0 };
    return JSON.parse(raw);
  } catch {
    return { requests: [], lockoutUntil: 0, lastEmail: '', lastSentAt: 0 };
  }
}

function writeGuard(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch { /* silent — localStorage may be unavailable (private mode etc.) */ }
}

function getGuardStatus() {
  const now = Date.now();
  const g = readGuard();

  // Expired lockout clears itself
  if (g.lockoutUntil && now >= g.lockoutUntil) {
    const cleared = { requests: [], lockoutUntil: 0, lastEmail: '', lastSentAt: 0 };
    writeGuard(cleared);
    return { locked: false, remainingLockMs: 0, cooldownMs: 0 };
  }

  if (g.lockoutUntil && now < g.lockoutUntil) {
    return { locked: true, remainingLockMs: g.lockoutUntil - now, cooldownMs: 0 };
  }

  // Per-email resend cooldown
  const sinceLastSend = now - (g.lastSentAt || 0);
  const cooldownMs = sinceLastSend < RESEND_COOLDOWN_MS
    ? RESEND_COOLDOWN_MS - sinceLastSend
    : 0;

  return { locked: false, remainingLockMs: 0, cooldownMs };
}

function recordRequest() {
  const now = Date.now();
  const g = readGuard();

  // Drop requests outside the rolling window
  const recent = (g.requests || []).filter(t => now - t < WINDOW_MS);
  recent.push(now);

  const next = { ...g, requests: recent, lastSentAt: now };

  if (recent.length > MAX_REQUESTS) {
    next.lockoutUntil = now + LOCKOUT_MS;
  }

  writeGuard(next);
  return next;
}

function formatMs(ms) {
  const mins = Math.ceil(ms / 60000);
  return `${mins} minute${mins !== 1 ? 's' : ''}`;
}

// ─── Icons (matching Login.jsx) ────────────────────────────────────────────
const MailIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#e84393" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="3"/>
    <polyline points="2,4 12,13 22,4"/>
  </svg>
);

const ShieldIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2 4 5v6c0 5 3.5 9 8 11 4.5-2 8-6 8-11V5z"/>
  </svg>
);

// ─── Banners ────────────────────────────────────────────────────────────────
function InfoBanner({ tone, message, onDismiss }) {
  if (!message) return null;
  const palette = {
    success: { bg: '#D1FAE5', border: '#A7F3D0', text: '#065F46' },
    warning: { bg: '#FEF3C7', border: '#FDE68A', text: '#92400E' },
    error:   { bg: '#FEE2E2', border: '#FECACA', text: '#B91C1C' },
  }[tone];

  return (
    <div style={{
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      gap: 10,
      padding: '12px 14px',
      background: palette.bg,
      border: `1px solid ${palette.border}`,
      borderRadius: 10,
      marginBottom: 16,
      fontSize: 13,
      color: palette.text,
      lineHeight: 1.5,
    }}>
      <span>{message}</span>
      {onDismiss && (
        <button
          onClick={onDismiss}
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: palette.text, fontSize: 16, lineHeight: 1, flexShrink: 0 }}
        >
          ✕
        </button>
      )}
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function ForgotPassword() {
  const navigate = useNavigate();

  const [email,       setEmail]       = useState('');
  const [honeypot,    setHoneypot]    = useState(''); // bots fill hidden fields, humans don't
  const [loading,     setLoading]     = useState(false);
  const [sent,        setSent]        = useState(false);
  const [error,       setError]       = useState('');
  const [focused,     setFocused]     = useState(false);
  const [cooldownMs,  setCooldownMs]  = useState(0);
  const [lockoutMs,   setLockoutMs]   = useState(0);

  const submitInFlight = useRef(false); // prevents double-submit races (e.g. double-click / double Enter)

  // ── Check guard state on mount + tick countdowns ──────────────────────────
  useEffect(() => {
    const { locked, remainingLockMs, cooldownMs } = getGuardStatus();
    setLockoutMs(locked ? remainingLockMs : 0);
    setCooldownMs(cooldownMs);
  }, []);

  useEffect(() => {
    if (lockoutMs <= 0 && cooldownMs <= 0) return;
    const interval = setInterval(() => {
      setLockoutMs(prev => Math.max(0, prev - 1000));
      setCooldownMs(prev => Math.max(0, prev - 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, [lockoutMs, cooldownMs]);

  const isLocked   = lockoutMs > 0;
  const inCooldown = cooldownMs > 0;
  const trimmed    = email.trim().toLowerCase();
  const validEmail = EMAIL_REGEX.test(trimmed);

  // ── Submit ─────────────────────────────────────────────────────────────────
  const handleSubmit = async () => {
    setError('');

    // Honeypot: if a bot filled this hidden field, silently pretend success.
    // Don't tell the bot it was caught — just don't do the work.
    if (honeypot) {
      setSent(true);
      return;
    }

    if (!validEmail) {
      setError('Please enter a valid email address.');
      return;
    }

    const { locked, remainingLockMs, cooldownMs: cd } = getGuardStatus();
    if (locked) {
      setLockoutMs(remainingLockMs);
      setError(`Too many reset requests. Please wait ${formatMs(remainingLockMs)} before trying again.`);
      return;
    }
    if (cd > 0) {
      setCooldownMs(cd);
      setError(`Please wait ${formatMs(cd)} before requesting another reset link.`);
      return;
    }

    if (submitInFlight.current || loading) return;
    submitInFlight.current = true;
    setLoading(true);

    // Record the attempt BEFORE the network call, so a slow/failed request
    // can't be used to bypass the rate limit by firing many in parallel.
    const guardAfter = recordRequest();

    try {
      await sendPasswordResetEmail(auth, trimmed);
    } catch (err) {
      // Deliberately swallow Firebase's error detail. We NEVER reveal whether
      // the email exists — auth/user-not-found gets the exact same UI as
      // success. Only genuinely actionable errors (bad format, rate limit
      // from Firebase's own backend) get surfaced.
      if (err?.code === 'auth/invalid-email') {
        setError('Please enter a valid email address.');
        submitInFlight.current = false;
        setLoading(false);
        return;
      }
      if (err?.code === 'auth/too-many-requests') {
        setError('Too many requests right now. Please wait a few minutes and try again.');
        submitInFlight.current = false;
        setLoading(false);
        return;
      }
      // Any other error (including user-not-found): fall through to the
      // generic success state below — no enumeration leak.
    }

    if (guardAfter.lockoutUntil) {
      setLockoutMs(guardAfter.lockoutUntil - Date.now());
    } else {
      setCooldownMs(RESEND_COOLDOWN_MS);
    }

    setSent(true);
    setLoading(false);
    submitInFlight.current = false;
  };

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div className="lg-root">
      <div className="lg-card">
        <div className="lg-hero">
          <div className="lg-brand" />
        </div>

        <h1 className="lg-title">Reset your password</h1>
        <p className="lg-sub">
          {sent
            ? "Check your inbox for a reset link"
            : "Enter your email and we'll send you a link to reset it"}
        </p>

        {isLocked && (
          <InfoBanner
            tone="warning"
            message={`Too many reset attempts. Try again in ${formatMs(lockoutMs)}.`}
          />
        )}

        {error && <InfoBanner tone="error" message={error} onDismiss={() => setError('')} />}

        {sent ? (
          <>
            <InfoBanner
              tone="success"
              message={`If an account exists for ${trimmed}, a password reset link has been sent. It may take a few minutes to arrive — check spam too.`}
            />
            {inCooldown && !isLocked && (
              <p style={{ fontSize: 12, color: 'var(--mt)', marginBottom: 16 }}>
                You can request another link in {formatMs(cooldownMs)}.
              </p>
            )}
            <button
              className="lg-signin"
              onClick={() => navigate('/login')}
              style={{ marginTop: 4 }}
            >
              Back to Sign In
            </button>
          </>
        ) : (
          <>
            <div className="lg-field">
              <label className="lg-label">Email Address</label>
              <div className={`lg-input-wrap${focused ? ' lg-input-wrap--focus' : ''}`}>
                <div className="lg-icon-box"><MailIcon /></div>
                <input
                  type="email"
                  value={email}
                  onChange={e => { setEmail(e.target.value); setError(''); }}
                  placeholder="mama@example.com"
                  className="lg-input"
                  onFocus={() => setFocused(true)}
                  onBlur={() => setFocused(false)}
                  onKeyDown={e => e.key === 'Enter' && handleSubmit()}
                  disabled={isLocked || loading}
                  autoComplete="email"
                  autoFocus
                />
              </div>
            </div>

            {/* Honeypot field — hidden from real users via CSS, bots fill it anyway.
                Kept out of tab order and unlabeled to a screen reader. */}
            <input
              type="text"
              name="website"
              value={honeypot}
              onChange={e => setHoneypot(e.target.value)}
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, opacity: 0 }}
            />

            <button
              className={`lg-signin${validEmail && !isLocked ? '' : ' lg-signin--dim'}`}
              onClick={handleSubmit}
              disabled={!validEmail || loading || isLocked}
            >
              {loading ? <span className="lg-spinner" /> : <>Send Reset Link &nbsp;→</>}
            </button>

            <p className="lg-footer">
              Remembered it?{' '}
              <button className="lg-signup-link" onClick={() => navigate('/login')}>
                Back to Sign In
              </button>
            </p>
          </>
        )}

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          marginTop: 20,
          paddingTop: 16,
          borderTop: '1px solid var(--border)',
          fontSize: 11,
          color: 'var(--mt)',
        }}>
          <ShieldIcon />
          <span>This link expires shortly and can only be used once.</span>
        </div>
      </div>
    </div>
  );
}

// ── TODO (backend phase) ─────────────────────────────────────────────────
// 1. Firebase App Check (reCAPTCHA Enterprise provider) on the `auth` app —
//    blocks scripted/automated calls before they reach Firebase Auth at all.
//    https://firebase.google.com/docs/app-check
// 2. Consider routing this through a Cloud Function instead of calling
//    sendPasswordResetEmail from the client directly, so you can log
//    IP/device fingerprints and alert on abuse patterns server-side —
//    something no amount of client-side code here can do, since this
//    entire file is visible and editable by anyone in devtools.
// 3. Add a Content-Security-Policy + Strict-Transport-Security header at
//    the Vercel edge (vercel.json), not in this component.
// ─────────────────────────────────────────────────────────────────────────
