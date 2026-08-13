import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { WCard, SectionTitle, Tag } from '../../components/ui';
import { formatTime } from '../../utils/helpers';
import { lsGet, lsSet } from '../../utils/storage';
import {
  KICK_THRESHOLDS, MAX_HISTORY_SIZE, STATUS_DISPLAY, STATUS_CARD_STYLE,
  PATTERN_MESSAGES, TIPS, classifyKicks, getTimeSlotForHour,
} from '../../data/kickTrackerConfig';

const STORAGE_KEY = 'kickHistory';

export default function Kicks() {
  // Session state
  const [session, setSession] = useState(false);
  const [sessionKicks, setSessionKicks] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [elapsed, setElapsed] = useState(0);

  const startTimeRef = useRef(null);

  // Load ALL real data from localStorage using safe storage
  const [realHistory, setRealHistory] = useState(() => lsGet(STORAGE_KEY, []));

  // Get today's date in consistent format
  const getTodayKey = useCallback(() => {
    const today = new Date();
    return today.toLocaleDateString('en-GB', {
      weekday: 'short',
      day: 'numeric'
    });
  }, []);

  const todayKey = getTodayKey();

  // Find today's entry in real history
  const todayEntry = realHistory.find(entry => entry.date === todayKey);
  const savedKicks = todayEntry?.kicks || 0;
  const totalKicksToday = savedKicks + sessionKicks;

  // Get last 7 days from REAL data with proper date ordering
  const last7Days = useMemo(() => {
    const days = [];
    const today = new Date();

    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      const dateKey = date.toLocaleDateString('en-GB', {
        weekday: 'short',
        day: 'numeric'
      });

      const entry = realHistory.find(e => e.date === dateKey);
      const DAY_STATUS_MAP = { GOOD: 'high', MONITOR: 'normal', LOW: 'low', NO_DATA: 'no-data' };
      const dayKickStatus = entry ? DAY_STATUS_MAP[classifyKicks(entry.kicks)] : 'no-data';

      days.push({
        date: dateKey,
        fullDate: date,
        kicks: entry?.kicks || 0,
        hasData: !!entry,
        sessionCount: entry?.sessionCount || 0,
        status: dayKickStatus
      });
    }

    return days;
  }, [realHistory]);

  // Check if we have any data in the last 7 days
  const hasDataInLast7Days = useMemo(() => {
    return last7Days.some(day => day.hasData);
  }, [last7Days]);

  // Find max kick value for chart scaling (from last 7 days + today's session)
  const maxKick = useMemo(() => {
    const allKicks = [...last7Days.map(d => d.kicks), totalKicksToday];
    return Math.max(...allKicks, 5); // Minimum scale of 5
  }, [last7Days, totalKicksToday]);

  // Determine status
  const status = classifyKicks(totalKicksToday);
  const cardStyle = STATUS_CARD_STYLE[status];
  const statusDisplay = STATUS_DISPLAY[status];

  // Calculate baseline from REAL history (last 7 days with data)
  const avgKicks = useMemo(() => {
    const daysWithData = last7Days.filter(d => d.hasData);
    if (daysWithData.length === 0) return '—';
    const sum = daysWithData.reduce((acc, d) => acc + d.kicks, 0);
    return (sum / daysWithData.length).toFixed(1);
  }, [last7Days]);

  // Find low days from last 7 days
  const lowDays = last7Days.filter(d => d.status === 'low' && d.hasData);

  // Find best movement time based on real data, using configured TIME_SLOTS
  const bestMovementTime = useMemo(() => {
    if (realHistory.length === 0) return TIPS.trackMoreDays;

    const slotTotals = {}; // id -> { count, totalKicks, label }

    realHistory.forEach(entry => {
      if (entry.timestamp) {
        const hour = new Date(entry.timestamp).getHours();
        const slot = getTimeSlotForHour(hour);
        if (!slot) return;
        if (!slotTotals[slot.id]) slotTotals[slot.id] = { count: 0, totalKicks: 0, label: slot.label };
        slotTotals[slot.id].count++;
        slotTotals[slot.id].totalKicks += entry.sessionKicks || entry.kicks;
      }
    });

    let bestLabel = null;
    let bestAvg = 0;
    Object.values(slotTotals).forEach(data => {
      const avg = data.totalKicks / data.count;
      if (avg > bestAvg) {
        bestAvg = avg;
        bestLabel = data.label;
      }
    });

    return bestLabel || TIPS.logMoreSessions;
  }, [realHistory]);

  useEffect(() => {
    let t;
    if (session && startTimeRef.current) {
      t = setInterval(() => {
        setElapsed(Math.floor((Date.now() - startTimeRef.current) / 1000));
      }, 1000);
    }
    return () => clearInterval(t);
  }, [session]);

  const startSession = () => {
    const now = Date.now();
    startTimeRef.current = now;
    setStartTime(now);
    setSession(true);
    setSessionKicks(0);
    setElapsed(0);
  };

  const logKick = () => {
    if (!session) return;
    setSessionKicks(k => k + 1);
  };

  const stopSession = () => {
    if (!session) return;

    const totalKicksForDay = savedKicks + sessionKicks;

    const entry = {
      date: todayKey,
      kicks: totalKicksForDay,
      sessionKicks: sessionKicks,
      elapsed: elapsed,
      sessionCount: (todayEntry?.sessionCount || 0) + 1,
      timestamp: new Date().toISOString(),
      lastUpdated: new Date().toISOString()
    };

    const prev = lsGet(STORAGE_KEY, []);
    const filteredPrev = prev.filter(e => e.date !== todayKey);
    const newHistory = [entry, ...filteredPrev].slice(0, MAX_HISTORY_SIZE);
    newHistory.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    lsSet(STORAGE_KEY, newHistory);
    setRealHistory(newHistory);

    setSession(false);
    setSessionKicks(0);
    setStartTime(null);
    startTimeRef.current = null;
    setElapsed(0);
  };

  return (
    <div className="page-pad">
      <SectionTitle title=" Kick Counter" />

      <WCard style={{ background: cardStyle.bg, display: "flex", flexDirection: "column", alignItems: "normal", border: `1.5px solid ${cardStyle.border}44` }}>
        <div style={{ textAlign: "center", padding: "var(--sp-3) 0 var(--sp-4)" }}>
          <div style={{
            fontSize: "var(--fs-hero)",
            fontWeight: 900,
            color: status === "GOOD" ? "var(--sg)"
                   : status === "MONITOR" ? "var(--gd)"
                   : status === "NO_DATA" ? "var(--mt)"
                   : "var(--rd)",
            lineHeight: 1,
            marginBottom: "var(--sp-2)"
          }}>
            {session ? sessionKicks : totalKicksToday}
          </div>
          <p style={{ fontSize: "var(--fs-sm)", color: "var(--md)", fontWeight: 600, marginBottom: "var(--sp-2)" }}>
            {session ? "kicks in this session" : "kicks logged today"}
          </p>
          <Tag
            label={statusDisplay.label}
            bg={statusDisplay.bg}
            tc={statusDisplay.tc}
          />
          {session && (
            <p style={{ fontSize: "var(--fs-2xl)", fontWeight: 800, color: "var(--dp)", marginTop: "var(--sp-3)" }}>
              {formatTime(elapsed) || '00:00'}
            </p>
          )}
        </div>

        {!session ? (
          <button
            onClick={startSession}
            className="btn-primary"
            style={{ background: "var(--dp)", color: "#fff", padding: "20px", fontSize: "var(--fs-md)", fontWeight: 700, borderRadius: "var(--r)", cursor: "pointer", minHeight: "var(--touch)" }}
          >
            ▶ Start Session
          </button>
        ) : (
          <div style={{ display: "flex", gap: "var(--gap-md)" }}>
            <button
              onClick={logKick}
              style={{
                flex: 2,
                padding: "var(--sp-4)",
                background: "var(--sg)",
                color: "#fff",
                border: "none",
                borderRadius: "var(--r)",
                fontSize: "var(--fs-md)",
                fontWeight: 800,
                cursor: "pointer",
                minHeight: "var(--touch)"
              }}
            >
              👶 Kick! ({sessionKicks})
            </button>
            <button
              onClick={stopSession}
              style={{
                flex: 1,
                padding: "var(--sp-4)",
                background: "var(--warm)",
                color: "var(--md)",
                border: "1px solid var(--border)",
                borderRadius: "var(--r)",
                fontSize: "var(--fs-sm)",
                fontWeight: 700,
                cursor: "pointer",
                minHeight: "var(--touch)"
              }}
            >
              ⏹ Stop
            </button>
          </div>
        )}
      </WCard>

      <WCard style={{ background: "var(--lvl)", display: "flex", flexDirection: "column", alignItems: "normal", border: "1px solid var(--lvm)44" }}>
        <p style={{ fontSize: "var(--fs-md)", fontWeight: 800, color: "var(--lv)", marginBottom: "var(--sp-3)" }}>
          AI Movement Intelligence
        </p>
        {[
          { l: "Today's pattern", v: PATTERN_MESSAGES[status], dot: status === "GOOD" ? "var(--sg)" : status === "MONITOR" ? "var(--lv)" : status === "NO_DATA" ? "var(--mt)" : "var(--rd)" },
          { l: "Best movement time", v: bestMovementTime, dot: "var(--lv)" },
          { l: "Your baseline (7d avg)", v: avgKicks === '—' ? "Track first session" : `${avgKicks} kicks/day`, dot: "var(--bl)" },
          { l: "Alert threshold", v: `Below ${KICK_THRESHOLDS.MONITOR} kicks → investigate`, dot: "var(--rd)" }
        ].map((s, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: "var(--gap-md)", padding: "clamp(6px,1.5vw,9px) 0", borderBottom: i < 3 ? "1px solid var(--border)" : "none" }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: s.dot, flexShrink: 0 }} />
            <span style={{ fontSize: "var(--fs-xs)", color: "var(--mt)", flex: 1 }}>{s.l}</span>
            <span style={{ fontSize: "var(--fs-sm)", fontWeight: 700, color: "var(--dp)", textAlign: "right" }}>{s.v}</span>
          </div>
        ))}
      </WCard>

      <SectionTitle title="7-Day History" />
      <WCard style={{ display: "flex", flexDirection: "column", alignItems: "normal", border: "1px solid var(--lvm)44" }}>
        {!hasDataInLast7Days ? (
          <div style={{
            textAlign: "center",
            padding: "var(--sp-5)",
            color: "var(--mt)",
            fontFamily: "Poppins, sans-serif"
          }}>
            <p style={{ fontSize: "var(--fs-md)", marginBottom: "var(--sp-2)" }}>{TIPS.emptyStateTitle}</p>
            <p style={{ fontSize: "var(--fs-xs)", color: "var(--mt)" }}>
              {TIPS.emptyStateBody}
            </p>
          </div>
        ) : (
          <>
            <div className="chart-wrap" style={{ display: "flex", gap: "var(--gap-sm)", alignItems: "flex-end", height: 120, marginBottom: "var(--sp-2)" }}>
              {last7Days.map((day, i) => (
                <div key={i} className="chart-col" style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", height: "100%" }}>
                  <span className="chart-val" style={{ fontSize: "var(--fs-xs)", fontWeight: 700, marginBottom: "var(--sp-1)" }}>
                    {day.kicks}
                  </span>
                  <div
                    className="chart-bar"
                    style={{
                      width: "100%",
                      height: `${(day.kicks / (maxKick + 2)) * 100}%`,
                      background: !day.hasData ? "var(--lvm)"
                               : day.status === "high" ? "var(--sg)"
                               : day.status === "normal" ? "var(--gd)"
                               : day.status === "low" ? "var(--rd)"
                               : "var(--lvm)",
                      borderRadius: "var(--r)",
                      transition: "height 0.3s ease",
                      minHeight: day.kicks === 0 ? "4px" : "auto"
                    }}
                  />
                </div>
              ))}
            </div>

            <div style={{ display: "flex", gap: "var(--gap-sm)", marginTop: "var(--sp-2)" }}>
              {last7Days.map((day, i) => (
                <div key={i} className="chart-lbl" style={{ flex: 1, textAlign: "center", fontSize: "var(--fs-2xs)" }}>
                  {day.date === todayKey ? "Today"
                   : day.date.split(' ')[0]}
                </div>
              ))}
            </div>

            <div style={{ marginTop: "var(--sp-2)", display: "flex", justifyContent: "center", gap: "var(--gap-sm)", flexWrap: "wrap" }}>
              {last7Days.filter(d => !d.hasData).length > 0 && (
                <Tag
                  label={`${last7Days.filter(d => !d.hasData).length} day(s) with no data`}
                  bg="var(--lvl)"
                  tc="var(--mt)"
                />
              )}
              {last7Days.filter(d => d.hasData).length > 0 && (
                <Tag
                  label={`${last7Days.filter(d => d.hasData).length}/7 days tracked`}
                  bg="var(--sgl)"
                  tc="var(--sg)"
                />
              )}
            </div>

            {lowDays.length > 0 && (
              <div style={{
                marginTop: "var(--sp-3)",
                padding: "var(--sp-3)",
                background: "var(--rdl)",
                borderRadius: "var(--r)",
                display: "flex",
                gap: "var(--gap-sm)",
                alignItems: "flex-start"
              }}>
                <span style={{ fontSize: "var(--fs-md)" }}>⚠️</span>
                <div>
                  <p style={{ fontSize: "var(--fs-xs)", color: "var(--rd)", fontWeight: 600, marginBottom: "var(--sp-1)" }}>
                    {TIPS.lowDaysAlert.title}
                  </p>
                  <p style={{ fontSize: "var(--fs-xs)", color: "var(--md)" }}>
                    {TIPS.lowDaysAlert.body(lowDays.map(d => `${d.date} (${d.kicks} kicks)`).join(', '))}
                  </p>
                </div>
              </div>
            )}

            {hasDataInLast7Days && lowDays.length === 0 && totalKicksToday === 0 && (
              <div style={{
                marginTop: "var(--sp-3)",
                padding: "var(--sp-3)",
                background: "var(--bll)",
                borderRadius: "var(--r)",
                textAlign: "center"
              }}>
                <p style={{ fontSize: "var(--fs-xs)", color: "var(--bl)" }}>
                  {TIPS.consistencyEncouragement}
                </p>
              </div>
            )}
          </>
        )}
      </WCard>

      {hasDataInLast7Days && avgKicks !== '—' && parseFloat(avgKicks) < KICK_THRESHOLDS.MONITOR && (
        <WCard style={{ background: "var(--gdl)", marginTop: "var(--gap-md)" }}>
          <p style={{ fontWeight: 800, marginBottom: "var(--sp-2)" }}>{TIPS.lowMovementTip.title}</p>
          <p style={{ fontSize: "var(--fs-xs)", color: "var(--md)" }}>
            {TIPS.lowMovementTip.body(avgKicks)}
          </p>
        </WCard>
      )}
    </div>
  );
}