// src/data/menopauseConfig.jsx
import {
  Thermometer, Moon, Wind, Heart, Droplets, Flame, Sparkles, Cloud, Bone,
  HeartPulse, Battery, BookOpen, Footprints, Bed, Smile, Zap, CloudRain,
} from 'lucide-react';

export const STORAGE_KEYS = {
  stage:          'menopauseStage',
  symptoms:       'menopauseSymptoms',
  mood:           'menopauseMood',
  moodDate:       'menopauseMoodDate',
  checklist:      'menopauseChecklist',
  checklistDate:  'mn_checklist_date',
  showAllTips:    'menopauseShowAllTips',
  tempLog:        'menopauseTempLog',
  hormones:       'menopauseHormones',
  sleepHydration: 'menopauseSleepHydration',
  periods:        'menopausePeriods',
  cycleWeek:      'menopauseCycleWeek',
  migration:      'mn_migration_version',
};

export const MIGRATION_VERSION = '3';

export const STAGES = {
  perimenopause: {
    label: 'Perimenopause', emoji: '🌙',
    accent: '#7C5CBF', accentSoft: '#F3EEFF', accentMid: '#A885E0',
    desc: 'Your body is transitioning. Cycles may be irregular.',
  },
  menopause: {
    label: 'Menopause', emoji: '🌸',
    accent: '#C0516A', accentSoft: '#FFF0F3', accentMid: '#D9849A',
    desc: '12+ months without a period. A new chapter begins.',
  },
  postmenopause: {
    label: 'Post-Menopause', emoji: '✨',
    accent: '#3A8A6E', accentSoft: '#EDFAF5', accentMid: '#61B899',
    desc: 'Hormones have stabilised. Focus on long-term wellness.',
  },
};

export const SYMPTOMS = [
  { id: 'hotFlash',   icon: <Flame size={20} />,     label: 'Hot Flashes',  key: 'hotFlash'   },
  { id: 'nightSweat', icon: <Droplets size={20} />,   label: 'Night Sweats', key: 'nightSweat' },
  { id: 'mood',       icon: <CloudRain size={20} />,  label: 'Mood Swings',  key: 'mood'       },
  { id: 'sleep',      icon: <Moon size={20} />,       label: 'Sleep Issues', key: 'sleep'      },
  { id: 'brainFog',   icon: <Cloud size={20} />,      label: 'Brain Fog',    key: 'brainFog'   },
  { id: 'jointPain',  icon: <Bone size={20} />,       label: 'Joint Aches',  key: 'jointPain'  },
  { id: 'anxiety',    icon: <HeartPulse size={20} />, label: 'Anxiety',      key: 'anxiety'    },
  { id: 'fatigue',    icon: <Battery size={20} />,    label: 'Fatigue',      key: 'fatigue'    },
];

export const DEFAULT_SYMPTOM_STATE = {
  hotFlash: 0, nightSweat: 0, mood: 0, sleep: 0, brainFog: 0, jointPain: 0, anxiety: 0, fatigue: 0,
};

export const HORMONE_FIELDS = [
  { key: 'e2',           label: 'Oestradiol (E2)', max: 200, min: 0, color: '#7C5CBF', unit: 'pmol/L' },
  { key: 'fsh',          label: 'FSH',             max: 100, min: 0, color: '#E07B39', unit: 'IU/L'   },
  { key: 'lh',           label: 'LH',              max: 80,  min: 0, color: '#5B6ABF', unit: 'IU/L'   },
  { key: 'progesterone', label: 'Progesterone',    max: 10,  min: 0, color: '#3A8A6E', unit: 'nmol/L' },
];

export const MOODS = [
  { icon: <Smile size={24} />,     label: 'Grounded'  },
  { icon: <CloudRain size={24} />, label: 'Unsettled' },
  { icon: <Flame size={24} />,     label: 'Flushed'   },
  { icon: <Moon size={24} />,      label: 'Tired'     },
  { icon: <Zap size={24} />,       label: 'Wired'     },
  { icon: <Heart size={24} />,     label: 'Content'   },
];

export const MOOD_FEEDBACK = {
  Flushed:   'Try removing a layer, sip cold water, and try the 4-7-8 breath.',
  Unsettled: "That's valid. A 5-minute grounding exercise can help settle your nervous system.",
  Tired:     'Rest is not laziness. If you can, take a 20-minute nap this afternoon.',
  Wired:     'Avoid caffeine after 2pm. Magnesium glycinate before bed may help tonight.',
  Grounded:  'Wonderful — carry that with you. A short walk will make it last longer.',
  Content:   "Hold onto this feeling. It's worth celebrating where you are right now.",
};

export const DEFAULT_CHECKLIST = [
  { id: 'water',   label: '💧 Drink 8 glasses of water',  done: false },
  { id: 'walk',    label: '🚶‍♀️ 20-min gentle walk',         done: false },
  { id: 'calcium', label: '🥛 Take calcium supplement',    done: false },
  { id: 'screen',  label: '📵 No screens 1hr before bed',  done: false },
  { id: 'journal', label: '📓 3-minute gratitude journal', done: false },
  { id: 'breath',  label: '🌬️ 4-7-8 breathing (5 rounds)', done: false },
];

// Generic fallback icon/color for nutrition cards built dynamically from
// culturalFoods.js — see buildNutritionCards() in Menopause.jsx.
export const NUTRITION_CARD_DEFAULT_STYLE = { color: '#3A8A6E', bg: '#EDFAF5' };

export const MENTAL_TIPS = [
  { id: 'breathing',  icon: <Wind size={20} />,      title: '4-7-8 Breathing',      body: 'Inhale for 4 counts, hold for 7, exhale for 8. Activates your parasympathetic nervous system and reduces cortisol within minutes.',   tag: 'Anxiety & Stress',     color: '#7C5CBF', bg: '#F3EEFF' },
  { id: 'journaling', icon: <BookOpen size={20} />,  title: 'Gratitude Journaling', body: "Writing 3 specific things you're grateful for daily rewires the brain's negativity bias — clinically shown to reduce perimenopausal low mood.", tag: 'Low Mood',            color: '#C0516A', bg: '#FFF0F3' },
  { id: 'movement',   icon: <Footprints size={20} />,title: 'Gentle Movement',      body: 'Even a 20-minute walk raises serotonin and norepinephrine. Yoga and tai chi specifically reduce hot flash frequency by up to 30%.',      tag: 'Mood & Hot Flashes',  color: '#3A8A6E', bg: '#EDFAF5' },
  { id: 'sleep',      icon: <Bed size={20} />,       title: 'Sleep Rituals',        body: "Keep your bedroom at 16–18°C. A cool shower before bed drops core temperature and signals your brain it's time to rest.",                  tag: 'Sleep & Night Sweats', color: '#2B6CB0', bg: '#EBF8FF' },
  { id: 'connection', icon: <Heart size={20} />,     title: 'Stay Connected',       body: 'Social connection is protective. Isolation worsens perimenopausal symptoms. A regular call or walk with a friend matters more than you think.', tag: 'Loneliness',         color: '#B7580A', bg: '#FFFAF0' },
];

export const HRT_INFO = [
  { title: 'Hormone Replacement Therapy (HRT)',  body: 'The most effective treatment for menopause symptoms. Modern HRT is safe for most women and significantly reduces hot flashes, sleep issues, and mood symptoms.', badge: 'Most Effective',     colorKey: 'accent' },
  { title: 'Cognitive Behavioural Therapy (CBT)', body: 'NICE-recommended for menopause-related mood changes and hot flashes. As effective as medication for some women.', badge: 'NICE Recommended', color: '#3A8A6E' },
  { title: 'Lifestyle Modifications',             body: 'Weight management, regular exercise, and reduced alcohol can reduce symptom severity by 30–40% without medication.', badge: 'No Prescription', color: '#5B6ABF' },
];

export const PHASE_COLOR = { none: '#E8E0F0', light: '#D4B8F0', period: '#C0516A' };
export const PHASE_CYCLE = { none: 'light', light: 'period', period: 'none' };
export const PHASE_LABEL = { none: 'None', light: 'Light', period: 'Period' };

export const CLOTHING_ADVICE_RULES = {
  hotAndNightSweat: {
    badge: 'Layer Up & Let Go', iconKey: 'Wind',
    tip: 'Wear moisture-wicking base layers you can easily remove. Think loose linen or bamboo-blend tees over a breathable cami. Avoid synthetic fibres.',
    fabrics: ['🌿 Bamboo', '🍃 Linen', '🐑 Light Merino'],
    avoid: ['🚫 Polyester', '🚫 Tight necklines', '🚫 Turtlenecks'],
    color: '#C0516A', bg: '#FFF0F3',
  },
  hotFlash: {
    badge: 'Stay Cool & Breezy', iconKey: 'Thermometer',
    tip: 'Opt for open-neck, loose-fit clothing in natural breathable fabrics. Light pastels and whites reflect heat.',
    fabrics: ['👗 Loose cotton', '🌊 Rayon', '🍃 Linen'],
    avoid: ['🚫 Dark heavy colours', '🚫 Polo necks', '🚫 Tight waistbands'],
    color: '#E07B39', bg: '#FFF5EE',
  },
  fatigueAndJoint: {
    badge: 'Comfort is Queen', iconKey: 'Heart',
    tip: "Soft, stretchy fabrics that don't restrict movement. Wide-leg trousers, knit dresses, and supportive footwear make a real difference.",
    fabrics: ['🧶 Soft knit', '🩲 Stretch jersey', '👟 Cushioned footwear'],
    avoid: ['🚫 Stiff denim', '🚫 High heels', '🚫 Tight elastic waistbands'],
    color: '#7C5CBF', bg: '#F3EEFF',
  },
  default: {
    badge: 'Dress for Your Mood', iconKey: 'Sparkles',
    tip: "Today looks manageable — express yourself freely! Try a pop of colour; wearing your favourite colours genuinely lifts serotonin.",
    fabrics: ['🎨 Whatever makes you smile', '🌈 Bold colours', '💎 That outfit you love'],
    avoid: [],
    color: '#3A8A6E', bg: '#EDFAF5',
  },
};

const CLOTHING_ICONS = { Wind: <Wind size={20} />, Thermometer: <Thermometer size={20} />, Heart: <Heart size={20} />, Sparkles: <Sparkles size={20} /> };

export function getClothingAdvice(symptoms) {
  const hasHotFlash   = symptoms.hotFlash   >= 2;
  const hasNightSweat = symptoms.nightSweat >= 2;
  const hasFatigue    = symptoms.fatigue    >= 2;
  const hasJoint      = symptoms.jointPain  >= 2;

  let rule;
  if (hasHotFlash && hasNightSweat) rule = CLOTHING_ADVICE_RULES.hotAndNightSweat;
  else if (hasHotFlash)             rule = CLOTHING_ADVICE_RULES.hotFlash;
  else if (hasFatigue && hasJoint)  rule = CLOTHING_ADVICE_RULES.fatigueAndJoint;
  else                              rule = CLOTHING_ADVICE_RULES.default;

  return { ...rule, icon: CLOTHING_ICONS[rule.iconKey] };
}

// AI insight rules, evaluated top-to-bottom; first match wins. Kept as ordered
// array (instead of if/else chain) so thresholds/copy can be tuned without
// touching component logic.
const AI_INSIGHT_RULES = [
  { test: s => s.hotFlash >= 3 || (s.hotFlash >= 2 && s.nightSweat >= 2), title: 'Significant heat symptoms today', body: 'Both hot flashes and night sweats are elevated. Stay hydrated, choose layered breathable clothing, and consider discussing HRT or CBT with your GP or menopause specialist.' },
  { test: s => s.anxiety >= 2 && s.mood >= 2, title: 'Emotional turbulence flagged', body: "Mood swings and anxiety are both moderate-to-severe. The 4-7-8 breathing technique and a short outdoor walk can lower cortisol within minutes. You're not alone in this." },
  { test: s => s.sleep >= 2 && s.fatigue >= 2, title: 'Sleep & energy are taking a hit', body: 'Poor sleep is amplifying your fatigue. Keep your bedroom at 16–18°C, avoid screens 1 hour before bed, and try magnesium glycinate after discussing with your GP.' },
  { test: s => s.brainFog >= 2, title: 'Brain fog is notable today', body: 'Cognitive symptoms are common during perimenopause. Short walks, hydration, and reducing screen overload can sharpen mental clarity quickly.' },
  { test: s => s.jointPain >= 2, title: 'Joint discomfort logged', body: 'Declining oestrogen affects joint lubrication. Omega-3 rich foods, gentle movement, and staying warm can reduce severity. Mention to your GP if persistent.' },
  { test: s => s.hotFlash >= 2, title: 'Hot flashes elevated today', body: 'Oestrogen may be fluctuating. Keep a fan nearby, choose layered breathable clothing, and consider discussing HRT options with your menopause specialist.' },
  { test: s => s.sleep >= 2, title: 'Sleep disruption this week', body: 'Poor sleep amplifies all other menopause symptoms. Try keeping your bedroom at 17°C, avoiding alcohol for 3 hours before bed, and using a weighted blanket.' },
];

const AI_INSIGHT_DEFAULT = { title: 'Your wellness score is holding well', body: "Lovely — your symptom profile today is manageable. Focus on hydration, a gentle walk, and your daily checklist to build on this momentum." };

export function getAiInsight(symptoms) {
  const matched = AI_INSIGHT_RULES.find(rule => rule.test(symptoms));
  return matched ? { title: matched.title, body: matched.body } : AI_INSIGHT_DEFAULT;
}
