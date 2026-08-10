export const HORMONE_SYMPTOMS = [
  { id: 'mood_swings',   icon: '😤', label: 'Mood Swings' },
  { id: 'bloating',      icon: '🎈', label: 'Bloating' },
  { id: 'acne',          icon: '🔴', label: 'Skin/Acne' },
  { id: 'fatigue',       icon: '🥱', label: 'Fatigue' },
  { id: 'libido',        icon: '💗', label: 'Libido Change' },
  { id: 'breast_tender', icon: '⚡', label: 'Breast Tenderness' },
  { id: 'headache',      icon: '🤕', label: 'Headache' },
  { id: 'cravings',      icon: '🍫', label: 'Cravings' },
];

// Maps each journey to which cycle-phase logic applies
export const HORMONE_PHASE_MAP = {
  menstrual: ['follicular', 'ovulation', 'luteal', 'menstrual'],
  conceive:  ['follicular', 'ovulation', 'luteal', 'menstrual'],
  menopause: ['perimenopause', 'postmenopause'],
  mom:       ['postpartum_hormonal_shift'],
};