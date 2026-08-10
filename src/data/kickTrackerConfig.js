
export const KICK_THRESHOLDS = {
  GOOD: 10,
  MONITOR: 6,
};

export const MAX_HISTORY_SIZE = 30;

// Time-of-day buckets used for "best movement time" analysis.
// hourStart/hourEnd are inclusive-start, exclusive-end, 24h clock.
export const TIME_SLOTS = [
  { id: 'morning',   label: 'Morning (5-11am)',  hourStart: 5,  hourEnd: 12 },
  { id: 'afternoon', label: 'Afternoon (12-4pm)', hourStart: 12, hourEnd: 17 },
  { id: 'evening',   label: 'Evening (5-8pm)',    hourStart: 17, hourEnd: 21 },
  { id: 'night',     label: 'Night (9pm-4am)',    hourStart: 21, hourEnd: 5 }, // wraps past midnight
];

export const STATUS_DISPLAY = {
  GOOD:    { label: '✅ Normal',        bg: 'var(--sgl)', tc: 'var(--sg)' },
  MONITOR: { label: '⚠️ Keep watching', bg: 'var(--gdl)', tc: 'var(--gd)' },
  NO_DATA: { label: '📝 No data yet',   bg: 'var(--lvl)', tc: 'var(--mt)' },
  LOW:     { label: '🚨 Seek help',     bg: 'var(--rdl)', tc: 'var(--rd)' },
};

export const STATUS_CARD_STYLE = {
  GOOD:    { bg: 'linear-gradient(135deg,var(--sgl),#D4F0DD)', border: 'var(--sgm)' },
  MONITOR: { bg: 'linear-gradient(135deg,var(--gdl),#FEE8C8)', border: 'var(--gdm)' },
  NO_DATA: { bg: 'linear-gradient(135deg,var(--lvl),#F0F0F0)', border: 'var(--lvm)' },
  LOW:     { bg: 'linear-gradient(135deg,var(--rdl),#FCE0DE)', border: 'var(--rdm)' },
};

export const PATTERN_MESSAGES = {
  GOOD:    'Good — active movement',
  MONITOR: 'Normal — moderate activity',
  NO_DATA: 'No data yet — start a session',
  LOW:     'Low — reduced activity — monitor closely',
};

export const TIPS = {
  lowMovementTip: {
    title: '💡 Tip for increasing movement tracking',
    body: (avgKicks) => `Your ${avgKicks}-kick average is below the recommended threshold. Try tracking after meals or when lying down in the evening — babies are often most active then.`,
  },
  lowDaysAlert: {
    title: 'Low movement detected:',
    body: (daysList) => `${daysList}. Consider contacting your midwife if this pattern continues.`,
  },
  consistencyEncouragement: "✨ You've been consistent! Time to log today's session.",
  emptyStateTitle: '📊 No kick data yet',
  emptyStateBody: 'Start your first session above to see your 7-day history here.',
  trackMoreDays: 'Track 3+ days to see pattern',
  logMoreSessions: 'Log more sessions',
};

/** Classify a kick count into a status key using KICK_THRESHOLDS */
export function classifyKicks(totalKicksToday) {
  if (totalKicksToday === 0) return 'NO_DATA';
  if (totalKicksToday >= KICK_THRESHOLDS.GOOD) return 'GOOD';
  if (totalKicksToday >= KICK_THRESHOLDS.MONITOR) return 'MONITOR';
  return 'LOW';
}

/** Find which configured time slot an hour (0-23) falls into, handles overnight wrap */
export function getTimeSlotForHour(hour) {
  return TIME_SLOTS.find(slot => {
    if (slot.hourStart < slot.hourEnd) {
      return hour >= slot.hourStart && hour < slot.hourEnd;
    }
    // wraps past midnight (e.g. night: 21 -> 5)
    return hour >= slot.hourStart || hour < slot.hourEnd;
  });
}