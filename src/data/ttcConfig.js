// src/data/ttcConfig.js
import { CalendarDays, Settings, Stethoscope, Thermometer, Lightbulb, Heart, Zap } from 'lucide-react';

export const SYMPTOMS = [
  "Cramping", "Spotting", "Heavy flow", "Discharge (white)", "Egg white CM",
  "Watery CM", "Nausea", "Fatigue", "Hot flashes", "Cravings",
  "Mood swings", "Breast tenderness", "Increased libido",
];

export const TAB_ICONS = {
  calendar: CalendarDays,
  setup: Settings,
  symptoms: Stethoscope,
  bbt: Thermometer,
  insights: Lightbulb,
  intercourse: Heart,
  lh: Zap,
};

export const TAB_LABELS = {
  calendar: "Calendar",
  setup: "Cycle Setup",
  symptoms: "Symptoms",
  bbt: "BBT",
  insights: "Insights",
  intercourse: "Intimacy",
  lh: "LH Test",
};

export const TAB_ORDER = ["calendar", "setup", "symptoms", "bbt", "lh", "intercourse", "insights"];

export const DAY_COLS = {
  period:    ["#FDEEEC", "#D0524A", "🩸"],
  fertile:   ["#E3F5EA", "#5A9E6E", "💞"],
  ovulation: ["#EDE9F8", "#8B7EC8", "🥚"],
  free:      ["#E4F0F9", "#3A78C4", "✨"],
  other:     ["transparent", "var(--border)", ""],
};

export const CALENDAR_LEGEND = [
  ["#FDEEEC", "#D0524A", "Period days"],
  ["#E3F5EA", "#5A9E6E", "Fertile window"],
  ["#EDE9F8", "#8B7EC8", "Ovulation day"],
  ["#E4EFF9", "#3A78C4", "Free days"],
];

export const MEDICAL_DISCLAIMER = "This app provides general wellness information only. Always consult a qualified healthcare provider before making medical decisions.";

export const CERVICAL_MUCUS_GUIDE = [
  ["Dry / None", "Low fertility", "var(--rdl)", "var(--rd)"],
  ["Sticky / Cloudy", "Early cycle", "var(--gdl)", "var(--gd)"],
  ["Creamy / White", "Building fertility", "var(--bll)", "var(--bl)"],
  ["Egg white / Stretchy", "PEAK — Ovulation near!", "var(--lvl)", "var(--lv)"],
  ["Watery", "Fertile — ovulation occurring", "var(--sgl)", "var(--sg)"],
];

export const BBT_TIPS = [
  "Take temperature at the same time every day",
  "Measure before getting out of bed or drinking anything",
  "Illness, alcohol, or poor sleep can affect readings — note these",
  "A rise of 0.2–0.5°C after ovulation stays elevated for 12–14 days",
];

export const LH_RESULTS_INFO = [
  { label: "Negative", body: "Not in fertile window yet" },
  { label: "Positive", body: "LH is rising, ovulation approaching" },
  { label: "PEAK", body: "Ovulation in 24–36 hours! Best time to conceive" },
];

export const LH_TEST_LEVELS = [
  { id: "negative", label: "Negative", color: "var(--mt)", bg: "var(--warm)" },
  { id: "positive", label: "Positive", color: "var(--gd)", bg: "var(--gdl)" },
  { id: "peak",     label: "⚡ PEAK",  color: "var(--lv)", bg: "var(--lvl)" },
];

export const INTIMACY_TIP = "Having sex every other day during your fertile window (5 days before ovulation through ovulation day) gives you the best chance of conception. Daily sex is not more effective and can add stress.";

// Non-food fertility insight tips. The food-related tips ("Boost fertility with
// food" / "Avoid in your cycle") are generated dynamically from culturalFoods.js
// based on the user's culture — see buildFertilityInsights() in TTC.jsx.
export const FERTILITY_INSIGHT_TIPS = [
  { icon: "🥚", title: "Best time for sex", body: "Have sex every other day during your fertile window (5 days before + 1 day after ovulation). Daily sex is not more effective." },
  { icon: "🌡️", title: "After sex", body: "Lie down for 15–20 minutes after sex. Sperm reach the fallopian tube within 90 seconds, so extended lying is not necessary." },
  { icon: "💊", title: "Supplements", body: "Folic acid 400mcg daily (recommended by NHS before and during early pregnancy). Vitamin D3 is also commonly recommended. Speak to your GP before starting any supplement." },
  { icon: "😴", title: "Stress and TTC", body: "Chronic stress raises cortisol, suppressing LH (the hormone that triggers ovulation). Prioritise 7–9 hours sleep. 4-7-8 breathing can help manage acute stress." },
  { icon: "🩺", title: "When to see a doctor", body: "If no pregnancy after 12 months of trying (6 months if over 35). Your GP can arrange hormonal blood panel, HSG scan, and semen analysis." },
];

// NOTE: these myths were sourced/verified for a Nigerian cultural context only.
// Extending this to other cultures needs real fact-checked content per region —
// flag which cultures you want covered and I'll research/verify rather than guess.
export const LOCAL_MYTHS = {
  title: "🇳🇬 Local Fertility Myths — Debunked",
  items: [
    ["Eating unripe pawpaw boosts fertility", "FALSE", "Contains papain — disrupts implantation. Avoid during conception attempts."],
    ["Drinking Agbo increases chances", "UNKNOWN", "Most Agbo mixtures have unknown compositions and interactions. Avoid."],
    ["You can't get pregnant while breastfeeding", "FALSE", "You can — ovulation can return before your first postpartum period."],
    ["Legs up after sex for 30 minutes is necessary", "EXAGGERATED", "15 minutes resting is sufficient. Sperm reach the fallopian tube within 90 seconds."],
  ],
};

/** Ovulation confidence thresholds, extracted for tuning without touching component logic */
export const OVULATION_CONFIDENCE_THRESHOLDS = {
  bbtRiseTemp: 36.7,
  bbtLookbackDays: 2,
  lhPeakLookbackDays: 3,
};

export const GP_NUDGE_CYCLE_THRESHOLD = 12;
export const CYCLE_IRREGULAR_DAY_SPREAD = 7;
export const CYCLE_LENGTH_MIN_NORMAL = 21;
export const CYCLE_LENGTH_MAX_NORMAL = 35;
