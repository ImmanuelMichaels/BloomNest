// src/data/foods/compatibilityEngine.js
//
// Deterministic "what can I eat?" compatibility engine. This is a
// structured rules lookup over CULTURAL_MEAL_LIBRARY — NOT an AI/LLM
// chatbot and does not call any generative model. Every result is
// produced from the meal's own safeWhen/cautionWhen/avoidWhen and
// reproductiveHealth fields plus the journey-rule table below.

export const JOURNEYS = {
  PRECONCEPTION: 'preconception',
  PREGNANCY: 'pregnancy',
  POSTPARTUM: 'postpartum',
  BREASTFEEDING: 'breastfeeding',
  MENSTRUAL: 'menstrual',
  MENOPAUSE: 'menopause',
  GENERAL: 'general',
};

export const JOURNEY_LABELS = {
  [JOURNEYS.PRECONCEPTION]: 'Trying to conceive',
  [JOURNEYS.PREGNANCY]: 'Pregnancy',
  [JOURNEYS.POSTPARTUM]: 'Postpartum',
  [JOURNEYS.BREASTFEEDING]: 'Breastfeeding',
  [JOURNEYS.MENSTRUAL]: 'Menstrual health',
  [JOURNEYS.MENOPAUSE]: 'Menopause',
  [JOURNEYS.GENERAL]: 'General reproductive wellness',
};

// Result tiers — deliberately NOT a binary safe/unsafe label. See
// compatibilityResult().
export const RESULT_TIERS = {
  GENERALLY_COMPATIBLE: 'generally_compatible',
  USE_CAUTION: 'use_caution',
  AVOID_SPECIFIC_PREPARATION: 'avoid_specific_preparation',
  NOT_ENOUGH_EVIDENCE: 'not_enough_evidence',
  SEEK_PROFESSIONAL_GUIDANCE: 'seek_professional_guidance',
};

export const RESULT_TIER_LABELS = {
  [RESULT_TIERS.GENERALLY_COMPATIBLE]: 'Generally compatible',
  [RESULT_TIERS.USE_CAUTION]: 'Use caution',
  [RESULT_TIERS.AVOID_SPECIFIC_PREPARATION]: 'Avoid specific preparation',
  [RESULT_TIERS.NOT_ENOUGH_EVIDENCE]: 'Not enough evidence',
  [RESULT_TIERS.SEEK_PROFESSIONAL_GUIDANCE]: 'Seek professional guidance',
};

export const DISCLAIMER =
  'Femin9 provides educational information and does not replace personalised ' +
  'medical or nutritional advice. Food safety and dietary needs can vary ' +
  'according to individual circumstances. If you have a medical condition, ' +
  'food allergy, pregnancy complication or specific dietary requirement, ' +
  'speak with an appropriately qualified healthcare professional.';

// Journeys where immune-status / foetal-exposure considerations make a
// preparation-dependent hazard (raw meat/fish, alcohol, unpasteurized
// dairy) specifically worth flagging. Outside these journeys, the same
// hazard is downgraded to "use caution" rather than "avoid" — the food
// itself is fine, thorough cooking / moderation is the consideration.
const RISK_SENSITIVE_JOURNEYS = new Set([
  JOURNEYS.PREGNANCY,
  JOURNEYS.BREASTFEEDING,
  JOURNEYS.PRECONCEPTION,
]);

// A hazard that applies to literally everyone regardless of journey
// (not a pregnancy-specific rule) — e.g. unripe ackee is toxic for
// anyone, not just people who are pregnant.
const UNIVERSAL_AVOID_FLAGS = new Set(['unripe_toxic']);

// Preparation-dependent hazards where the RISK is elevated for the
// risk-sensitive journeys above, but the food is otherwise fine in
// moderation for everyone else.
const HIGH_STAKES_AVOID_FLAGS = new Set([
  'alcohol_ferment',
  'raw_fish',
  'raw_or_undercooked_traditional',
  'unpasteurized_dairy_risk',
]);

// Flags where the right answer genuinely depends on an individual's
// circumstances (e.g. a herbal ingredient interacting with a personal
// health situation) rather than a categorical yes/no.
const SEEK_GUIDANCE_FLAGS = new Set(['herbal_caution']);

// Flags worth a caution note for the risk-sensitive journeys, without
// rising to "avoid" — total daily caffeine, mercury-accumulating fish
// species eaten occasionally, etc.
const CAUTION_FLAGS = new Set(['caffeine', 'high_mercury_fish']);

/**
 * Evaluate a single resolved meal (from mealMatcher) against a journey.
 * Returns a structured result — never a bare "safe"/"unsafe" string.
 */
export function evaluateMeal(matchedMeal, journey) {
  const j = journey || JOURNEYS.GENERAL;

  if (matchedMeal.source === 'foods') {
    // Older FOODS-schema entry with no safeWhen/avoidWhen/evidence
    // fields — we can still surface its dietaryNotes, but we're
    // honest that we don't have the richer safety schema for it.
    const food = matchedMeal.food;
    return {
      id: food.id,
      name: food.name,
      culturalContext: (food.dietaryNotes || []).join(' ') || null,
      tier: RESULT_TIERS.NOT_ENOUGH_EVIDENCE,
      tierLabel: RESULT_TIER_LABELS[RESULT_TIERS.NOT_ENOUGH_EVIDENCE],
      considerations: [
        'This item is in the Femin9 meal database but does not yet have the ' +
          'detailed preparation-safety data (safe/caution/avoid conditions) ' +
          'used by the craving-checker for other dishes.',
      ],
      evidence: 'insufficient',
      reproductiveHealthNote: null,
      typicalIngredients: [],
      alternatives: [],
      aliasesResolved: [],
      journey: j,
    };
  }

  const meal = matchedMeal.meal;
  const considerations = [];

  // safeWhen — always shown as positive prep guidance when present.
  if (meal.safeWhen && meal.safeWhen.length) {
    considerations.push({
      kind: 'safe_when',
      label: 'Generally fine when',
      items: meal.safeWhen,
    });
  }
  if (meal.cautionWhen && meal.cautionWhen.length) {
    considerations.push({
      kind: 'caution_when',
      label: 'Use caution if',
      items: meal.cautionWhen,
    });
  }
  if (meal.avoidWhen && meal.avoidWhen.length) {
    considerations.push({
      kind: 'avoid_when',
      label: 'Avoid when',
      items: meal.avoidWhen,
    });
  }

  const tier = deriveTier(meal, j);

  return {
    id: meal.id,
    name: meal.canonicalName,
    country: meal.country,
    region: meal.region,
    category: meal.category,
    culturalContext: meal.culturalContext,
    tier,
    tierLabel: RESULT_TIER_LABELS[tier],
    considerations,
    evidence: meal.evidence,
    reproductiveHealthNote: meal.reproductiveHealth ? meal.reproductiveHealth[j] || meal.reproductiveHealth.general : null,
    typicalIngredients: meal.typicalIngredients || [],
    alternatives: meal.alternatives || [],
    flags: meal.flags || [],
    journey: j,
  };
}

// Tier is driven by the dish's specific FLAGS (unripe ackee, raw fish,
// alcohol, herbal ingredients, caffeine, mercury) evaluated against the
// selected journey — NOT by the mere presence of safeWhen/cautionWhen/
// avoidWhen text. Those text fields are largely generic, category-wide
// food-safety practice (e.g. "cook meat thoroughly", "don't leave rice
// out too long") that applies to nearly every dish in that category
// and every journey; using their presence alone to pick a tier would
// put almost everything in "avoid specific preparation" regardless of
// context, which is exactly the simplistic binary labelling the spec
// says to avoid.
function deriveTier(meal, journey) {
  if (meal.evidence === 'insufficient') {
    return RESULT_TIERS.NOT_ENOUGH_EVIDENCE;
  }

  const flags = meal.flags || [];

  if (flags.some((f) => UNIVERSAL_AVOID_FLAGS.has(f))) {
    return RESULT_TIERS.AVOID_SPECIFIC_PREPARATION;
  }

  const riskSensitive = RISK_SENSITIVE_JOURNEYS.has(journey);

  if (flags.some((f) => SEEK_GUIDANCE_FLAGS.has(f))) {
    return riskSensitive
      ? RESULT_TIERS.SEEK_PROFESSIONAL_GUIDANCE
      : RESULT_TIERS.USE_CAUTION;
  }

  if (flags.some((f) => HIGH_STAKES_AVOID_FLAGS.has(f))) {
    return riskSensitive
      ? RESULT_TIERS.AVOID_SPECIFIC_PREPARATION
      : RESULT_TIERS.USE_CAUTION;
  }

  if (flags.some((f) => CAUTION_FLAGS.has(f))) {
    return RESULT_TIERS.USE_CAUTION;
  }

  // No dish-specific hazard flags: the safeWhen/cautionWhen/avoidWhen
  // text is generic category-level food-safety practice, worth
  // showing as "preparation matters" guidance in the UI but not
  // grounds to mark the dish as anything other than generally
  // compatible. Category-level cautionWhen (portion size, sodium,
  // added sugar) is elevated to "use caution" specifically for the
  // journeys where it's most relevant.
  const portionSensitiveJourneys = new Set([
    JOURNEYS.PREGNANCY,
    JOURNEYS.POSTPARTUM,
    JOURNEYS.BREASTFEEDING,
  ]);
  const portionSensitiveCategories = new Set([
    'rice_grain',
    'dessert_sweet',
    'fried_snack',
    'staple_starch',
  ]);
  if (
    portionSensitiveJourneys.has(journey) &&
    portionSensitiveCategories.has(meal.category) &&
    meal.cautionWhen &&
    meal.cautionWhen.length > 0
  ) {
    return RESULT_TIERS.USE_CAUTION;
  }

  return RESULT_TIERS.GENERALLY_COMPATIBLE;
}

/**
 * Evaluate a combination of resolved meals against a journey.
 * Per the spec: evaluate each meal individually AND surface combined-
 * meal considerations. This does not "average" or hide any individual
 * meal's result — the worst-case tier across the combination is
 * surfaced first, with the per-meal breakdown always shown alongside.
 */
export function evaluateMealCombination(matchedMeals, journey) {
  const perMeal = matchedMeals.map((m) => evaluateMeal(m, journey));

  const tierSeverity = {
    [RESULT_TIERS.SEEK_PROFESSIONAL_GUIDANCE]: 4,
    [RESULT_TIERS.AVOID_SPECIFIC_PREPARATION]: 3,
    [RESULT_TIERS.USE_CAUTION]: 2,
    [RESULT_TIERS.NOT_ENOUGH_EVIDENCE]: 1,
    [RESULT_TIERS.GENERALLY_COMPATIBLE]: 0,
  };

  const overallTier = perMeal.reduce((worst, r) => {
    return tierSeverity[r.tier] > tierSeverity[worst] ? r.tier : worst;
  }, RESULT_TIERS.GENERALLY_COMPATIBLE);

  const combinedNote =
    perMeal.length > 1
      ? 'Each item below has been checked individually. Being generally ' +
        'compatible on its own does not automatically mean every possible ' +
        'preparation of the combined meal is — check the preparation notes ' +
        'for each dish.'
      : null;

  return {
    journey,
    journeyLabel: JOURNEY_LABELS[journey] || journey,
    overallTier,
    overallTierLabel: RESULT_TIER_LABELS[overallTier],
    combinedNote,
    meals: perMeal,
    disclaimer: DISCLAIMER,
  };
}
