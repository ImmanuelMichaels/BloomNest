import { useState, useRef, useCallback } from 'react';
import './RangeSlider.css';


export default function RangeSlider({
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  unit = '',
  label,
  formatValue,
  accent = 'var(--t)',
}) {
  const isRange = Array.isArray(value);
  const trackRef = useRef(null);
  const [dragging, setDragging] = useState(null); // null | 'lo' | 'hi' | 'single'

  const pct = v => ((v - min) / (max - min)) * 100;
  const clampSnap = v => {
    const snapped = Math.round((v - min) / step) * step + min;
    return Math.min(max, Math.max(min, Number(snapped.toFixed(4))));
  };

  const valueFromClientX = useCallback((clientX) => {
    const rect = trackRef.current.getBoundingClientRect();
    const ratio = (clientX - rect.left) / rect.width;
    return clampSnap(min + ratio * (max - min));
  }, [min, max, step]);

  const startDrag = (thumb) => (e) => {
    e.preventDefault();
    setDragging(thumb);

    const move = (moveEvent) => {
      const clientX = moveEvent.touches ? moveEvent.touches[0].clientX : moveEvent.clientX;
      const next = valueFromClientX(clientX);
      if (isRange) {
        const [lo, hi] = value;
        if (thumb === 'lo') onChange([Math.min(next, hi), hi]);
        else onChange([lo, Math.max(next, lo)]);
      } else {
        onChange(next);
      }
    };
    const end = () => {
      setDragging(null);
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseup', end);
      window.removeEventListener('touchmove', move);
      window.removeEventListener('touchend', end);
    };
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseup', end);
    window.addEventListener('touchmove', move, { passive: false });
    window.addEventListener('touchend', end);
  };

  const nudge = (thumb, dir) => (e) => {
    if (!['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(e.key)) return;
    e.preventDefault();
    const delta = (e.key === 'ArrowLeft' || e.key === 'ArrowDown') ? -step : step;
    if (isRange) {
      const [lo, hi] = value;
      if (thumb === 'lo') onChange([clampSnap(lo + delta), hi]);
      else onChange([lo, clampSnap(hi + delta)]);
    } else {
      onChange(clampSnap(value + delta));
    }
  };

  const display = v => (formatValue ? formatValue(v) : `${v}${unit}`);

  const loPct = isRange ? pct(value[0]) : 0;
  const hiPct = isRange ? pct(value[1]) : pct(value);
  const activeThumb = isRange ? dragging : (dragging === 'single' ? 'single' : null);

  return (
    <div className="rs-wrap">
      {label && (
        <div className="rs-label-row">
          <p className="rs-label">{label}</p>
          <p className="rs-static-value">
            {isRange ? `${display(value[0])} – ${display(value[1])}` : display(value)}
          </p>
        </div>
      )}

      <div className="rs-track" ref={trackRef} style={{ '--accent': accent }}>
        <div className="rs-track-bg" />
        <div
          className="rs-fill"
          style={{ left: `${isRange ? loPct : 0}%`, width: `${Math.max(hiPct - (isRange ? loPct : 0), 0)}%` }}
        />

        {isRange && (
          <button
            type="button"
            className={`rs-thumb ${dragging === 'lo' ? 'rs-thumb--active' : ''}`}
            style={{ left: `${loPct}%` }}
            onMouseDown={startDrag('lo')}
            onTouchStart={startDrag('lo')}
            onKeyDown={nudge('lo')}
            aria-label={`${label || 'Minimum'} ${display(value[0])}`}
          >
            <span className={`rs-bubble ${dragging === 'lo' ? 'rs-bubble--show' : ''}`}>{display(value[0])}</span>
          </button>
        )}

        <button
          type="button"
          className={`rs-thumb ${dragging === (isRange ? 'hi' : 'single') ? 'rs-thumb--active' : ''}`}
          style={{ left: `${hiPct}%` }}
          onMouseDown={startDrag(isRange ? 'hi' : 'single')}
          onTouchStart={startDrag(isRange ? 'hi' : 'single')}
          onKeyDown={nudge(isRange ? 'hi' : 'single')}
          aria-label={`${label || 'Value'} ${display(isRange ? value[1] : value)}`}
        >
          <span className={`rs-bubble ${activeThumb === (isRange ? 'hi' : 'single') ? 'rs-bubble--show' : ''}`}>
            {display(isRange ? value[1] : value)}
          </span>
        </button>
      </div>
    </div>
  );
}