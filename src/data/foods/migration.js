// src/data/foods/migration.js
import { NUTRIENTS, SAFETY_STATUSES, RISK_LEVELS, REVIEW_STATUSES, MEAL_TYPES } from './types';
import { FOODS as CURATED_FOODS } from './foods';
import { HEALTH_GUIDANCE as CURATED_GUIDANCE } from './guidance';

const MEAL_TYPE_KEYS = ['breakfast', 'lunch', 'dinner', 'snacks'];
const JOURNEY_KEYS = ['pregnancy', 'menstrual', 'menopause', 'conceive'];

// Maps the free-text nutrient tags used in culturalFoods.js (e.g.
// "Healthy Fats", "Vitamin B6") to the NUTRIENTS enum in types.js.
// Anything NOT in this table is intentionally left unmapped rather than
// guessed — it's preserved in the food's dietaryNotes/description text
// instead, and surfaced via report.unmappedNutrients so a human can
// decide whether it deserves a new NUTRIENTS enum value.
const NUTRIENT_TAG_MAP = {
  'protein': NUTRIENTS.PROTEIN,
  'plant protein': NUTRIENTS.PROTEIN,
  'iron': NUTRIENTS.IRON,
  'folate': NUTRIENTS.FOLATE,
  'calcium': NUTRIENTS.CALCIUM,
  'fiber': NUTRIENTS.FIBER,
  'high fiber': NUTRIENTS.FIBER,
  'omega-3': NUTRIENTS.OMEGA3,
  'vitamin a': NUTRIENTS.VITAMIN_A,
  'vitamin c': NUTRIENTS.VITAMIN_C,
  'vitamin d': NUTRIENTS.VITAMIN_D,
  'vitamin e': NUTRIENTS.VITAMIN_E,
  'vitamin k': NUTRIENTS.VITAMIN_K,
  'zinc': NUTRIENTS.ZINC,
  'magnesium': NUTRIENTS.MAGNESIUM,
  'potassium': NUTRIENTS.POTASSIUM,
  'choline': NUTRIENTS.CHOLINE,
  'probiotics': NUTRIENTS.PROBIOTICS,
  'antioxidants': NUTRIENTS.ANTIOXIDANTS,
  'healthy fats': NUTRIENTS.HEALTHY_FATS,
};

function slugify(text) {
  return String(text)
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '') // strip diacritics, e.g. "Türkiye"
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function mapNutrientTag(tag) {
  return NUTRIENT_TAG_MAP[String(tag).trim().toLowerCase()] || null;
}

// Legacy recommended/avoid strings come in two shapes:
//   "Egusi soup (iron-rich)"                       — Format A
//   "Unripe or forced-open ackee — contains ..."    — Format B
function splitLegacyGuidanceLine(text) {
  let match = text.match(/^(.*?)\s*\(([^)]*)\)\s*$/);
  if (match) {
    return { foodName: match[1].trim(), note: match[2].trim() };
  }
  match = text.match(/^(.*?)\s+[—-]\s+(.*)$/);
  if (match) {
    return { foodName: match[1].trim(), note: match[2].trim() };
  }
  return { foodName: text.trim(), note: null };
}

// Try to link a recommended/avoid line back to a specific dish we
// already migrated from this culture's meal lists. Legacy data was
// written loosely (e.g. "Callaloo (iron and vitamin A)" vs. the actual
// meal item "Callaloo with Boiled Green Banana"), so this often WON'T
// find a match — that's expected and reported rather than guessed at.
function matchFoodId(foodName, nameIndex, foods) {
  const lower = foodName.toLowerCase();
  if (nameIndex && nameIndex[lower]) return nameIndex[lower];
  const slug = slugify(foodName);
  if (foods[slug]) return slug;
  return null;
}

export function migrateCulturalFoods(legacyCulturalFoods) {
  const foods = CURATED_FOODS;       // mutated in place — see note above
  const guidance = CURATED_GUIDANCE; // mutated in place — see note above

  const report = {
    migratedFoods: 0,
    mergedIntoExisting: 0,
    guidanceEntries: 0,
    unmatchedGuidanceEntries: [],
    unmappedNutrients: new Set(),
    skippedCultures: [],
  };

  const nameIndexByCulture = {};

  Object.entries(legacyCulturalFoods || {}).forEach(([cultureKey, cultureData]) => {
    if (cultureKey === 'default') {
      // "default" is a fallback bucket in the legacy schema, not a real
      // culture — the new resolver's fallback is "no filters applied",
      // so there's nothing meaningful to migrate it into.
      report.skippedCultures.push(cultureKey);
      return;
    }

    nameIndexByCulture[cultureKey] = nameIndexByCulture[cultureKey] || {};

    MEAL_TYPE_KEYS.forEach((mealTypeKey) => {
      const items = cultureData[mealTypeKey];
      if (!Array.isArray(items)) return;

      const mealType = MEAL_TYPES[mealTypeKey.toUpperCase()];

      items.forEach((item) => {
        const id = slugify(item.name);
        nameIndexByCulture[cultureKey][item.name.toLowerCase()] = id;

        const mappedNutrients = [];
        (item.nutrients || []).forEach((tag) => {
          const mapped = mapNutrientTag(tag);
          if (mapped) {
            if (!mappedNutrients.includes(mapped)) mappedNutrients.push(mapped);
          } else {
            report.unmappedNutrients.add(tag);
          }
        });

        if (foods[id]) {
          // Same dish already exists (hand-authored, or migrated while
          // processing an earlier culture that shares it) — merge
          // rather than duplicate.
          const existing = foods[id];
          if (!existing.cultures.includes(cultureKey)) {
            existing.cultures = [...existing.cultures, cultureKey];
          }
          if (!existing.mealTypes.includes(mealType)) {
            existing.mealTypes = [...existing.mealTypes, mealType];
          }
          report.mergedIntoExisting++;
          return;
        }

        foods[id] = {
          id,
          name: item.name,
          cultures: [cultureKey],
          mealTypes: [mealType],
          nutrients: mappedNutrients,
          dietaryNotes: item.description ? [item.description] : [],
          preparationNotes: [],
          alternatives: [],
          sourceIds: [],
          review: {
            status: REVIEW_STATUSES.DRAFT,
            reviewedBy: null,
            reviewedAt: null,
            version: 1,
            migratedFrom: 'legacy-culturalFoods.js',
          },
        };
        report.migratedFoods++;
      });
    });

    JOURNEY_KEYS.forEach((journeyKey) => {
      const journeyData = cultureData[journeyKey];
      if (!journeyData) return;

      ['recommended', 'avoid'].forEach((listKey) => {
        const entries = journeyData[listKey];
        if (!Array.isArray(entries)) return;

        entries.forEach((entryText) => {
          const { foodName, note } = splitLegacyGuidanceLine(entryText);
          const matchedId = matchFoodId(foodName, nameIndexByCulture[cultureKey], foods);
          const foodId = matchedId || slugify(foodName);

          if (!matchedId && !foods[foodId]) {
            // No confident link to a real dish — create a minimal draft
            // stub so the guidance text isn't lost, but flag it clearly
            // as unmatched rather than silently pretending it's a full
            // meal-item entry.
            foods[foodId] = {
              id: foodId,
              name: foodName,
              cultures: [cultureKey],
              mealTypes: [],
              nutrients: [],
              dietaryNotes: [],
              preparationNotes: [],
              alternatives: [],
              sourceIds: [],
              review: {
                status: REVIEW_STATUSES.DRAFT,
                reviewedBy: null,
                reviewedAt: null,
                version: 1,
                migratedFrom: 'legacy-culturalFoods.js (guidance-only, unmatched to a meal item)',
              },
            };
            report.unmatchedGuidanceEntries.push({ culture: cultureKey, journey: journeyKey, listKey, text: entryText });
          }

          const guidanceId = `${foodId}-${journeyKey}`;
          if (guidance[guidanceId]) {
            // Don't clobber a hand-authored or previously migrated entry.
            return;
          }

          guidance[guidanceId] = {
            id: guidanceId,
            foodId,
            journey: journeyKey,
            // "status" reflects the migrated intent (recommended vs.
            // avoid); "review.status" separately tracks clinical
            // sign-off — same two-axis convention already used by the
            // hand-authored entries in guidance.js.
            status: listKey === 'avoid' ? SAFETY_STATUSES.AVOID : SAFETY_STATUSES.SAFE,
            riskLevel: listKey === 'avoid' ? RISK_LEVELS.LOW : RISK_LEVELS.NONE,
            guidance: note || entryText,
            recommendations: [],
            sourceIds: [],
            review: {
              status: REVIEW_STATUSES.DRAFT,
              reviewedBy: null,
              reviewedAt: null,
              version: 1,
              migratedFrom: 'legacy-culturalFoods.js',
            },
          };
          report.guidanceEntries++;
        });
      });
    });
  });

  report.unmappedNutrients = Array.from(report.unmappedNutrients);

  return { foods, guidance, report };
}