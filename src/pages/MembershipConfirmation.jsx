import { Link } from 'react-router-dom';

const PURPLE = '#4108a5';

export default function MembershipConfirmation() {
  return (
    <div style={{ maxWidth: 480, margin: '0 auto', padding: '64px 20px', textAlign: 'center' }}>
      <h1 style={{ fontSize: 26, fontWeight: 800, color: '#222', marginBottom: 12 }}>
        Thanks for reserving your spot 🎉
      </h1>
      <p style={{ fontSize: 15, color: '#666', marginBottom: 28 }}>
        We're confirming your payment now. You'll get an email as soon as your
        Founding Member status is active — usually within a few minutes.
      </p>
      <Link
        to="/app"
        style={{
          display: 'inline-block',
          padding: '12px 28px',
          borderRadius: 40,
          background: PURPLE,
          color: '#fff',
          fontSize: 14,
          fontWeight: 700,
          textDecoration: 'none',
        }}
      >
        Back to Femin9
      </Link>
    </div>
  );
}