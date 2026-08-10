import { useState, useEffect, useRef, useCallback } from 'react';
import '../../styles/motion.css';

const PHASES   = ['in', 'hold', 'out', 'rest'];
const DURATION = { in: 4, hold: 7, out: 8, rest: 2 }; // seconds

export default function BreathingExercise() {
  const [phase, setPhase]       = useState(null);   // null | 'in'|'hold'|'out'|'rest' | 'done'
  const [cycle, setCycle]       = useState(0);      // 0-based cycle number
  const [seconds, setSeconds]   = useState(0);      // countdown within current phase

  const mountedRef  = useRef(true);
  const runningRef  = useRef(false);   // guards against double-start
  const intervalRef = useRef(null);
  const timeoutRef  = useRef(null);

  // Cleanup on unmount — no phantom state updates
  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      clearInterval(intervalRef.current);
      clearTimeout(timeoutRef.current);
    };
  }, []);

  // Live countdown ticker for current phase
  useEffect(() => {
    if (!phase || phase === 'done') return;
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      if (!mountedRef.current) return;
      setSeconds(s => Math.max(0, s - 1));
    }, 1000);
    return () => clearInterval(intervalRef.current);
  }, [phase]);

  const runPhase = useCallback((phaseIdx, cycleNum) => {
    if (!mountedRef.current) return;
    const phaseName = PHASES[phaseIdx];
    const duration  = DURATION[phaseName];

    setPhase(phaseName);
    setSeconds(duration);
    setCycle(cycleNum);

    timeoutRef.current = setTimeout(() => {
      if (!mountedRef.current) return;
      const nextPhaseIdx = (phaseIdx + 1) % 4;
      const nextCycle    = nextPhaseIdx === 0 ? cycleNum + 1 : cycleNum;

      if (nextCycle >= 4 && nextPhaseIdx === 0) {
        setPhase('done');
        runningRef.current = false;
        return;
      }
      runPhase(nextPhaseIdx, nextCycle);
    }, duration * 1000);
  }, []);

  const startBreath = () => {
    if (runningRef.current) return; // guard double-start
    runningRef.current = true;
    runPhase(0, 0);
  };

  const reset = () => {
    clearInterval(intervalRef.current);
    clearTimeout(timeoutRef.current);
    runningRef.current = false;
    setPhase(null);
    setCycle(0);
    setSeconds(0);
  };

  // Visual colour per phase with enhanced animation states
  const PHASE_STYLE = {
    in:   { 
      bg: 'var(--sgl)', 
      border: 'var(--sg)',  
      scale: '1.3', 
      label: 'Breathe In',
      ringColor: 'var(--sg)',
      instruction: 'Fill your lungs slowly'
    },
    hold: { 
      bg: 'var(--lvl)', 
      border: 'var(--lv)',  
      scale: '1.4', 
      label: 'Hold',
      ringColor: 'var(--lv)',
      instruction: 'Hold your breath'
    },
    out:  { 
      bg: 'var(--bll)', 
      border: 'var(--bl)',  
      scale: '0.9', 
      label: 'Breathe Out',
      ringColor: 'var(--bl)',
      instruction: 'Release slowly'
    },
    rest: { 
      bg: 'var(--warm)',
      border: 'var(--gd)',  
      scale: '1.0', 
      label: 'Rest',
      ringColor: 'var(--gd)',
      instruction: 'Pause before next breath'
    },
  };

  return (
    <div className="card-in card-in-1" style={{ 
      background: 'linear-gradient(135deg,var(--lvl),#F8F6FE)', 
      border: '1px solid var(--lvm)33', 
      borderRadius: 'var(--r2)', 
      padding: 'var(--card-p)', 
      marginBottom: 'var(--gap-md)' 
    }}>
      <p style={{ fontSize: 'var(--fs-lg)', fontWeight: 800, color: 'var(--lv)', marginBottom: 'var(--sp-2)' }}>
        🌬️ 4-7-8 Breathing
      </p>
      <p style={{ fontSize: 'var(--fs-sm)', color: 'var(--mt)', marginBottom: 'var(--sp-4)', lineHeight: 1.5 }}>
        Reduces anxiety and cortisol. Safe for everyone. 4 cycles recommended.
      </p>

      {/* Not started */}
      {!phase && (
        <button 
          onClick={startBreath} 
          className="btn-tap"
          style={{ 
            background: 'var(--lv)', 
            color: '#fff', 
            padding: '20px', 
            border: 'none', 
            borderRadius: 'var(--r)',
            fontWeight: 800,
            fontSize: 'var(--fs-md)',
            cursor: 'pointer',
            width: '100%',
            transition: 'all 0.2s ease'
          }}
        >
          ▶ Start Exercise
        </button>
      )}

      {/* Done */}
      {phase === 'done' && (
        <div className="reveal-in" style={{ textAlign: 'center', padding: 'var(--sp-4)' }}>
          <div style={{ fontSize: 'clamp(48px,12vw,64px)', marginBottom: 'var(--sp-2)' }}>✨</div>
          <p style={{ fontSize: 'var(--fs-lg)', fontWeight: 800, color: 'var(--sg)' }}>
            Well done! 4 cycles complete.
          </p>
          <p style={{ fontSize: 'var(--fs-sm)', color: 'var(--mt)', marginTop: 'var(--sp-1)' }}>
            You've just completed a full breathing exercise. Notice how you feel.
          </p>
          <button
            onClick={reset}
            className="btn-tap"
            style={{ 
              marginTop: 'var(--sp-3)', 
              background: 'var(--sg)', 
              color: '#fff', 
              border: 'none', 
              borderRadius: 20, 
              padding: 'clamp(7px,1.8vw,10px) clamp(18px,4.5vw,24px)', 
              fontSize: 'var(--fs-sm)', 
              fontWeight: 800, 
              cursor: 'pointer' 
            }}
          >
            Done
          </button>
        </div>
      )}

      {/* Active */}
      {phase && phase !== 'done' && (() => {
        const ps = PHASE_STYLE[phase];
        return (
          <div style={{ textAlign: 'center', padding: 'var(--sp-4)' }}>
            <div className="timer-pulse-wrap" style={{ margin: '0 auto var(--sp-3)' }}>
              <div 
                className="timer-pulse-ring" 
                style={{ 
                  '--pulse-color': ps.ringColor,
                  animation: `timer-pulse ${DURATION[phase]}s ease-out infinite`
                }} 
              />
              <div style={{
                width: 'clamp(100px,25vw,140px)',
                height: 'clamp(100px,25vw,140px)',
                borderRadius: '50%',
                background: ps.bg,
                border: `4px solid ${ps.border}`,
                display: 'flex', 
                flexDirection: 'column',
                alignItems: 'center', 
                justifyContent: 'center',
                transition: 'transform 1s cubic-bezier(0.34, 1.56, 0.64, 1)',
                transform: `scale(${ps.scale})`,
                position: 'relative',
                zIndex: 1,
              }}>
                <p style={{ 
                  fontSize: 'clamp(16px,4vw,24px)', 
                  fontWeight: 800, 
                  color: 'var(--dp)',
                  marginBottom: 'var(--sp-1)'
                }}>
                  {ps.label}
                </p>
                <p style={{ 
                  fontSize: 'clamp(12px,2.5vw,16px)', 
                  color: 'var(--mt)',
                  fontWeight: 600
                }}>
                  {seconds}s
                </p>
              </div>
            </div>
            
            <p style={{ fontSize: 'var(--fs-sm)', color: 'var(--mt)', marginBottom: 'var(--sp-1)' }}>
              {ps.instruction}
            </p>
            
            <div style={{ 
              display: 'flex', 
              justifyContent: 'center', 
              gap: 'var(--gap-sm)',
              marginTop: 'var(--sp-2)'
            }}>
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  style={{
                    width: 'clamp(8px,2vw,12px)',
                    height: 'clamp(8px,2vw,12px)',
                    borderRadius: '50%',
                    background: i <= cycle ? ps.border : 'var(--border)',
                    transition: 'background 0.3s ease',
                  }}
                />
              ))}
            </div>
            
            <p style={{ fontSize: 'var(--fs-xs)', color: 'var(--mt)', marginTop: 'var(--sp-2)' }}>
              Cycle {cycle + 1} of 4
            </p>
          </div>
        );
      })()}
    </div>
  );
}