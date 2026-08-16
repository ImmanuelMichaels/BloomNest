// src/pages/Splash.jsx
import { useEffect, useState } from 'react';

export default function Splash() {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    // Trigger animation after a brief delay
    const timer = setTimeout(() => setAnimate(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className="fi"
      style={{
        position: 'fixed', inset: 0,
        background: '#2B0F8C',
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        justifyContent: 'center', zIndex: 9999, padding: 'var(--pad-x)',
        overflow: 'hidden',
      }}
    >
      {/* Logo — settles in the vertical center, rising a little from below */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: animate
            ? 'translate(-50%, -50%)'
            : 'translate(-50%, calc(-50% + 24px))',
          opacity: animate ? 1 : 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
          width: '100%',
          padding: '0 var(--pad-x)',
        }}
      >
        <div
          className="serif"
          style={{
            width: '250px',
            letterSpacing: -0.5,
          }}
        >
          <img src="./logo.png" alt="Femin9 logo" style={{ width: '100%', display: 'block' }} />
        </div>
      </div>

      {/* Footer branding — fixed at the bottom, fades in after the logo settles */}
      <div
        style={{
          position: 'absolute',
          bottom: 'clamp(32px,8vw,52px)',
          left: 0,
          right: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 6,
          opacity: animate ? 1 : 0,
          transform: animate ? 'translateY(0)' : 'translateY(12px)',
          transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1) 0.35s',
        }}
      >
        <span
          style={{
            color: 'rgba(255,255,255,0.85)',
            fontSize: 13,
            letterSpacing: 0.5,
          }}
        >
          From
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <img
            src="./arvenue-mark.png"
            alt=""
            style={{ width: 18, height: 18 }}
          />
          <span
            style={{
              color: '#FFFFFF',
              fontSize: 15,
              fontWeight: 700,
              letterSpacing: 0.2,
            }}
          >
            Arvenue Innovation
          </span>
        </div>
      </div>
    </div>
  );
}