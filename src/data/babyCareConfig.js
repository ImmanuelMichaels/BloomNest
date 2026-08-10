// src/data/babyCareConfig.js
// NHS-aligned baby care reference data. Review dates/thresholds with your
// clinical partner (NHS nurse) before relying on these in production —
// vaccination schedules and screening windows change and must stay current.

export const NHS_SCHEDULE_VERSION = 'June 2026';

// ─── Age-based feeding/sleep targets ───────────────────────────────────────
// Ordered by ascending maxWeeks; the first matching band applies.
export const AGE_BANDS = [
  {
    id: 'newborn',
    maxWeeks: 4,
    feedDurationMin: 18,
    recommendedFeedsMin: 8,
    recommendedFeedsMax: 12,
    targetWetDiapers: 6,
    expectedSleepMin: 14,
    expectedSleepMax: 17,
  },
  {
    id: 'young_infant',
    maxWeeks: 12,
    feedDurationMin: 15,
    recommendedFeedsMin: 6,
    recommendedFeedsMax: 10,
    targetWetDiapers: 5,
    expectedSleepMin: 13,
    expectedSleepMax: 15,
  },
  {
    id: 'older_infant',
    maxWeeks: Infinity,
    feedDurationMin: 12,
    recommendedFeedsMin: 6,
    recommendedFeedsMax: 10,
    targetWetDiapers: 5,
    expectedSleepMin: 12,
    expectedSleepMax: 14,
  },
];

// Weekly tip copy, ordered by ascending maxWeeks; first match applies.
// weeks === 0 is handled as a special case before this list.
export const WEEKLY_TIPS = [
  { maxWeeks: 0,        tip: "Skin-to-skin contact helps regulate baby's temperature and heartbeat." },
  { maxWeeks: 4,        tip: 'Feed on demand. 8–12 feeds per day is completely normal.' },
  { maxWeeks: 8,        tip: 'Tummy time for short periods several times a day builds neck strength.' },
  { maxWeeks: 16,       tip: 'Support safe rolling practice. Never leave baby unattended on high surfaces.' },
  { maxWeeks: 24,       tip: 'Watch for solids readiness signs around 6 months (sits with support, good head control).' },
  { maxWeeks: Infinity, tip: 'Read and talk to your baby daily — it builds language and bonding.' },
];

export function getAgeConfig(weeks) {
  const band = AGE_BANDS.find(b => weeks < b.maxWeeks) || AGE_BANDS[AGE_BANDS.length - 1];
  const tipEntry = weeks === 0
    ? WEEKLY_TIPS[0]
    : WEEKLY_TIPS.find(t => weeks < t.maxWeeks) || WEEKLY_TIPS[WEEKLY_TIPS.length - 1];
  return { ...band, tip: tipEntry.tip };
}

// ─── NHS Vaccination Schedule ───────────────────────────────────────────────
export const VACCINATIONS = [
  { id: 'vax_6in1_1',        name: '6-in-1 (DTaP/IPV/Hib/HepB) 1st', dueWeeks: 8,   description: 'Protects against diphtheria, tetanus, pertussis, polio, Hib, hepatitis B' },
  { id: 'vax_rotavirus_1',   name: 'Rotavirus 1st',                  dueWeeks: 8,   description: 'Oral vaccine for rotavirus infection' },
  { id: 'vax_menb_1',        name: 'MenB 1st',                       dueWeeks: 8,   description: 'Meningitis B protection' },
  { id: 'vax_6in1_2',        name: '6-in-1 2nd',                     dueWeeks: 12,  description: 'Second dose of combined vaccine' },
  { id: 'vax_menb_2',        name: 'MenB 2nd',                       dueWeeks: 12,  description: 'Second meningitis B dose' },
  { id: 'vax_rotavirus_2',   name: 'Rotavirus 2nd',                  dueWeeks: 12,  description: 'Second oral rotavirus dose' },
  { id: 'vax_6in1_3',        name: '6-in-1 3rd',                     dueWeeks: 16,  description: 'Third dose of combined vaccine' },
  { id: 'vax_pcv_1',         name: 'PCV (Pneumococcal) 1st',         dueWeeks: 16,  description: 'Protects against pneumococcal infections' },
  { id: 'vax_mmr_1',         name: 'MMR 1st',                        dueWeeks: 52,  description: 'Measles, mumps, rubella first dose' },
  { id: 'vax_pcv_2',         name: 'PCV 2nd',                        dueWeeks: 52,  description: 'Second pneumococcal dose' },
  { id: 'vax_menb_3',        name: 'MenB 3rd',                       dueWeeks: 52,  description: 'Third meningitis B dose' },
  { id: 'vax_6in1_4',        name: '6-in-1 4th (18-month)',          dueWeeks: 78,  description: 'Final combined vaccine booster' },
  { id: 'vax_mmr_2',         name: 'MMR 2nd',                        dueWeeks: 208, description: 'Second MMR dose' },
  { id: 'vax_preschool',     name: '4-in-1 preschool booster',       dueWeeks: 208, description: 'DTaP/IPV booster before school' },
];

// ─── NHS-aligned Developmental Milestones ──────────────────────────────────
export const MILESTONES = [
  { id: 'responds_light_sound', name: 'Responds to light and sound',         dueWeeks: 0,  typicalRange: '0-2 weeks',   category: 'Senses' },
  { id: 'lifts_head',           name: 'Lifts head briefly on tummy',         dueWeeks: 4,  typicalRange: '3-6 weeks',   category: 'Motor' },
  { id: 'social_smile',         name: 'Social smile',                        dueWeeks: 6,  typicalRange: '6-12 weeks',  category: 'Social' },
  { id: 'holds_head_steady',    name: 'Holds head steady',                   dueWeeks: 8,  typicalRange: '6-12 weeks',  category: 'Motor' },
  { id: 'reaches_for_objects',  name: 'Reaches for objects',                 dueWeeks: 12, typicalRange: '12-16 weeks', category: 'Motor' },
  { id: 'rolls_both_ways',      name: 'Rolls both ways',                     dueWeeks: 16, typicalRange: '16-24 weeks', category: 'Motor' },
  { id: 'sits_with_support',    name: 'Sits with support',                   dueWeeks: 24, typicalRange: '24-28 weeks', category: 'Motor' },
  { id: 'babbles_laughs',       name: 'Babbles and laughs',                  dueWeeks: 24, typicalRange: '24-32 weeks', category: 'Communication' },
  { id: 'sits_unsupported',     name: 'Sits without support',                dueWeeks: 32, typicalRange: '32-40 weeks', category: 'Motor' },
  { id: 'crawls',               name: 'Crawls',                              dueWeeks: 40, typicalRange: '36-52 weeks', category: 'Motor' },
  { id: 'pulls_to_stand',       name: 'Pulls to stand',                      dueWeeks: 48, typicalRange: '44-56 weeks', category: 'Motor' },
  { id: 'first_words',          name: 'First words and waves bye-bye',       dueWeeks: 52, typicalRange: '48-60 weeks', category: 'Communication' },
  { id: 'walks_with_support',   name: 'Walks with support',                  dueWeeks: 60, typicalRange: '56-68 weeks', category: 'Motor' },
  { id: 'walks_independently',  name: 'Walks independently',                 dueWeeks: 72, typicalRange: '64-80 weeks', category: 'Motor' },
];

export function getMilestoneStatus(milestone, achievedMilestones, babyWeeks) {
  const isAchieved = achievedMilestones[milestone.id];
  const isOverdue = babyWeeks > milestone.dueWeeks + 8;
  const isDue = babyWeeks >= milestone.dueWeeks;

  if (isAchieved) return { type: 'achieved', label: '✓ Achieved', icon: '✅', color: 'var(--sg)' };
  if (isOverdue)  return { type: 'overdue',  label: '⚠️ Consider discussing with health visitor', icon: '⚠️', color: 'var(--lv)' };
  if (isDue)      return { type: 'due',      label: '👀 Watch for this now', icon: '👀', color: 'var(--bl)' };
  return { type: 'upcoming', label: `Expected around week ${milestone.dueWeeks}`, icon: '📅', color: 'var(--mt)' };
}

// ─── EPDS (Edinburgh Postnatal Depression Scale) screening ─────────────────
export const EPDS_SCREENING_WEEKS = [2, 6, 12];

export const EPDS_MESSAGES = {
  highScore: {
    threshold: 13,
    message: 'Your score suggests you may benefit from speaking with your GP or health visitor. They can provide support and discuss next steps with you.',
  },
  moderateScore: {
    threshold: 10,
    message: 'Your score indicates some signs of distress. Consider speaking with your health visitor for support.',
  },
};

export function getEpdsAlert(score) {
  if (score >= EPDS_MESSAGES.highScore.threshold) return EPDS_MESSAGES.highScore.message;
  if (score >= EPDS_MESSAGES.moderateScore.threshold) return EPDS_MESSAGES.moderateScore.message;
  return null;
}

// ─── Baby age-stage labels ──────────────────────────────────────────────────
export const AGE_STAGE_LABELS = [
  { maxWeeks: 12,       label: 'Newborn' },
  { maxWeeks: 52,       label: 'Infant' },
  { maxWeeks: Infinity, label: 'Toddler' },
];

export function getAgeStageLabel(weeks) {
  return (AGE_STAGE_LABELS.find(s => weeks < s.maxWeeks) || AGE_STAGE_LABELS[AGE_STAGE_LABELS.length - 1]).label;
}
