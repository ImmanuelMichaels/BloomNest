// src/data/foods/mealMatcher.js
//
// Deterministic search/matching for the "What can I eat?" feature.
// No fuzzy/AI matching — canonical names, aliases and simple
// normalization only, per the feature spec (accent/case/punctuation
// normalization, no aggressive fuzzy matching that could cross-match
// unrelated foods).

import { CULTURAL_MEAL_LIST } from './culturalMealLibrary';
import { FOODS } from './foods';

function normalize(str) {
  return String(str || '')
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '') // strip accents: é -> e, ü -> u, etc.
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/['’]/g, '')
    .replace(/[^a-z0-9 ]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

// Build a normalized-term -> library id index once, from canonical
// names + aliases in CULTURAL_MEAL_LIBRARY, plus (as a secondary,
// lower-priority source) the existing FOODS keyed dataset so a search
// also surfaces the app's pre-existing curated meal-plan items.
function buildIndex() {
  const index = new Map(); // normalized term -> { source: 'library'|'foods', id }

  CULTURAL_MEAL_LIST.forEach((meal) => {
    const terms = [meal.canonicalName, ...(meal.aliases || [])];
    terms.forEach((t) => {
      const n = normalize(t);
      if (n && !index.has(n)) {
        index.set(n, { source: 'library', id: meal.id });
      }
    });
  });

  Object.values(FOODS || {}).forEach((food) => {
    // Index both the full display name ("Fufu (Cassava Dough)") and
    // the food's own id/slug ("fufu") — a lot of existing FOODS names
    // carry a parenthetical gloss that means the bare dish name alone
    // wouldn't otherwise exact-match.
    const nameTerm = normalize(food.name);
    const idTerm = normalize(food.id.replace(/-/g, ' '));
    if (nameTerm && !index.has(nameTerm)) {
      index.set(nameTerm, { source: 'foods', id: food.id });
    }
    if (idTerm && !index.has(idTerm)) {
      index.set(idTerm, { source: 'foods', id: food.id });
    }
  });

  return index;
}

let _index = null;
function getIndex() {
  if (!_index) _index = buildIndex();
  return _index;
}

/**
 * Resolve a single free-text query to a matched meal, or null if no
 * confident match was found. Matching order:
 *   1. Exact normalized match against a canonical name or alias.
 *   2. Exact normalized match against an existing FOODS entry name.
 *   3. Containment match (query is a normalized substring of a known
 *      term, or vice versa) — restricted to terms of 3+ characters to
 *      avoid short strings matching everything.
 * No fuzzy/edit-distance matching is used, by design.
 */
export function resolveMealQuery(query) {
  const n = normalize(query);
  if (!n) return null;

  const index = getIndex();

  // 1 & 2: exact match
  const exact = index.get(n);
  if (exact) return describeMatch(exact, 'exact');

  // 3: containment match against library terms only (aliases/canonical
  // names), since that's the richer, safety-annotated dataset.
  if (n.length >= 3) {
    let best = null;
    for (const meal of CULTURAL_MEAL_LIST) {
      const terms = [meal.canonicalName, ...(meal.aliases || [])];
      for (const t of terms) {
        const tn = normalize(t);
        if (tn.length < 3) continue;
        if (tn.includes(n) || n.includes(tn)) {
          // Prefer the closest length match to avoid e.g. "rice"
          // matching "fried rice noodles" ahead of "rice grain" dishes.
          if (!best || Math.abs(tn.length - n.length) < Math.abs(best.termLen - n.length)) {
            best = { source: 'library', id: meal.id, termLen: tn.length };
          }
        }
      }
    }
    if (best) return describeMatch(best, 'partial');
  }

  return null;
}

function describeMatch(match, matchType) {
  if (match.source === 'library') {
    const meal = CULTURAL_MEAL_LIST.find((m) => m.id === match.id);
    return meal ? { matchType, source: 'library', meal } : null;
  }
  const food = FOODS[match.id];
  return food ? { matchType, source: 'foods', food } : null;
}

/**
 * Resolve a list of free-text queries (e.g. ["Afang", "Fufu"]).
 * Returns { matched: [...], unmatched: [...] } — unmatched entries
 * keep the original query text so the UI can show the
 * "couldn't confidently identify" message per item.
 */
export function resolveMealQueries(queries) {
  const matched = [];
  const unmatched = [];
  (queries || []).forEach((q) => {
    const result = resolveMealQuery(q);
    if (result) {
      matched.push({ query: q, ...result });
    } else {
      unmatched.push(q);
    }
  });
  return { matched, unmatched };
}

/**
 * Lightweight search-as-you-type suggestion list (canonical names only,
 * library dataset). Not used for final resolution — resolveMealQuery
 * remains the source of truth when the user submits a selection.
 */
export function searchMealSuggestions(query, limit = 8) {
  const n = normalize(query);
  if (!n || n.length < 2) return [];
  const results = [];
  for (const meal of CULTURAL_MEAL_LIST) {
    const terms = [meal.canonicalName, ...(meal.aliases || [])];
    const isMatch = terms.some((t) => normalize(t).includes(n));
    if (isMatch) {
      results.push(meal);
      if (results.length >= limit) break;
    }
  }
  return results;
}
