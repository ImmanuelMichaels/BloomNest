// src/components/CravingChecker/CravingChecker.jsx

import { useMemo, useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/useApp';
import {
  searchMealSuggestions,
  resolveMealQueries,
} from '../../data/foods/mealMatcher';
import {
  evaluateMealCombination,
  JOURNEYS,
  JOURNEY_LABELS,
  RESULT_TIERS,
} from '../../data/foods/compatibilityEngine';
import './CravingChecker.css';

// Maps the app's journeyType directly to compatibility-engine journey
// No dropdown needed - fully automatic
const JOURNEY_FROM_APP = {
  pregnant:  JOURNEYS.PREGNANCY,
  conceive:  JOURNEYS.PRECONCEPTION,
  ivf:       JOURNEYS.PRECONCEPTION,
  mom:       JOURNEYS.BREASTFEEDING,
  menstrual: JOURNEYS.MENSTRUAL,
  menopause: JOURNEYS.MENOPAUSE,
};
const DEFAULT_JOURNEY = JOURNEYS.GENERAL;

const TIER_STYLE = {
  [RESULT_TIERS.GENERALLY_COMPATIBLE]: { icon: '✓', className: 'tier-compatible' },
  [RESULT_TIERS.USE_CAUTION]: { icon: '⚠', className: 'tier-caution' },
  [RESULT_TIERS.AVOID_SPECIFIC_PREPARATION]: { icon: '⚠', className: 'tier-avoid-prep' },
  [RESULT_TIERS.NOT_ENOUGH_EVIDENCE]: { icon: 'ℹ', className: 'tier-unknown' },
  [RESULT_TIERS.SEEK_PROFESSIONAL_GUIDANCE]: { icon: '⚑', className: 'tier-seek-guidance' },
};

export default function CravingChecker() {
  const { journeyType } = useApp();
  // Automatically derive the journey - no user selection needed
  const journey = JOURNEY_FROM_APP[journeyType] || DEFAULT_JOURNEY;
  const journeyLabel = JOURNEY_LABELS[journey] || 'General';

  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState([]);
  const [result, setResult] = useState(null);
  const [unresolvedQueries, setUnresolvedQueries] = useState([]);
  const [isChecking, setIsChecking] = useState(false);
  
  const resultRef = useRef(null);
  const containerRef = useRef(null);

  const suggestions = useMemo(
    () => (query.trim().length >= 2 ? searchMealSuggestions(query, 6) : []),
    [query]
  );

  // Scroll to results when they appear
  useEffect(() => {
    if (result && resultRef.current) {
      // Small delay to ensure DOM is rendered
      setTimeout(() => {
        resultRef.current.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start',
          inline: 'nearest'
        });
      }, 100);
    }
  }, [result]);

  function addSelection(text) {
    const trimmed = text.trim();
    if (!trimmed) return;
    if (selected.some((s) => s.toLowerCase() === trimmed.toLowerCase())) return;
    setSelected((prev) => [...prev, trimmed]);
    setQuery('');
    // Clear previous results when adding new selection
    setResult(null);
    setUnresolvedQueries([]);
  }

  function removeSelection(text) {
    setSelected((prev) => prev.filter((s) => s !== text));
    setResult(null);
    setUnresolvedQueries([]);
  }

  function handleInputKeyDown(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      addSelection(query);
    }
  }

  function handleCheck() {
    const queries = selected.length > 0 ? selected : (query.trim() ? [query.trim()] : []);
    if (queries.length === 0) {
      return;
    }
    
    setIsChecking(true);
    
    // Use setTimeout to allow UI to update before processing
    setTimeout(() => {
      const { matched, unmatched } = resolveMealQueries(queries);
      setUnresolvedQueries(unmatched);
      if (matched.length === 0) {
        setResult(null);
        setIsChecking(false);
        return;
      }
      const evaluation = evaluateMealCombination(matched, journey);
      setResult(evaluation);
      setIsChecking(false);
    }, 300);
  }

  const canCheck = (selected.length > 0 || query.trim().length > 0) && !isChecking;

  return (
    <div className="craving-checker-wrapper" ref={containerRef}>
      <div className="craving-checker reveal">
        <div className="craving-checker-card">
          <h2 className="craving-checker-title">What are you craving?</h2>
          <p className="craving-checker-subtitle">
            Search for foods and meals to check their compatibility
          </p>

          {/* Journey badge - shows current journey automatically */}
          <div className="craving-checker-journey-badge">
            <span className="craving-checker-journey-label">Checking for</span>
            <span className="craving-checker-journey-name">{journeyLabel}</span>
          </div>

          <div className="craving-checker-search">
            <input
              type="text"
              className="craving-checker-input"
              placeholder="Search for a food or meal…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleInputKeyDown}
              aria-label="Search for a food or meal"
              disabled={isChecking}
            />
            {suggestions.length > 0 && (
              <ul className="craving-checker-suggestions">
                {suggestions.map((s) => (
                  <li key={s.id}>
                    <button 
                      type="button" 
                      onClick={() => addSelection(s.canonicalName)}
                      disabled={isChecking}
                    >
                      {s.canonicalName}
                      <span className="craving-checker-suggestion-country">{s.country}</span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {selected.length > 0 && (
            <div className="craving-checker-selected">
              <span className="craving-checker-selected-label">Selected:</span>
              {selected.map((s) => (
                <span key={s} className="choice-chip choice-chip--active">
                  {s}
                  <button
                    type="button"
                    aria-label={`Remove ${s}`}
                    onClick={() => removeSelection(s)}
                    className="choice-chip-remove"
                    disabled={isChecking}
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          )}

          <button
            type="button"
            className="craving-checker-submit"
            disabled={!canCheck}
            onClick={handleCheck}
          >
            {isChecking ? 'Checking...' : 'Check my meal'}
          </button>
        </div>

        {unresolvedQueries.length > 0 && (
          <div className="craving-checker-unmatched reveal">
            {unresolvedQueries.map((q) => (
              <p key={q}>
                We couldn't confidently identify "{q}" in the Femin9 Cultural Health
                Library.
              </p>
            ))}
          </div>
        )}

        {result && (
          <div ref={resultRef}>
            <CompatibilityResult result={result} />
          </div>
        )}
      </div>
    </div>
  );
}

function CompatibilityResult({ result }) {
  const title = result.meals.map((m) => m.name).join(' + ');
  const overallStyle = TIER_STYLE[result.overallTier];

  return (
    <div className="craving-checker-result reveal">
      <h3 className="craving-checker-result-title">{title}</h3>
      <p className="craving-checker-result-journey">{result.journeyLabel}</p>

      <div className={`craving-checker-tier ${overallStyle.className}`}>
        <span className="craving-checker-tier-icon" aria-hidden="true">
          {overallStyle.icon}
        </span>
        {result.overallTierLabel}
      </div>

      {result.combinedNote && (
        <p className="craving-checker-combined-note">{result.combinedNote}</p>
      )}

      {result.meals.map((meal) => (
        <MealResultCard key={meal.id} meal={meal} />
      ))}

      <p className="craving-checker-disclaimer">{result.disclaimer}</p>
    </div>
  );
}

function MealResultCard({ meal }) {
  const [expanded, setExpanded] = useState(false);
  const style = TIER_STYLE[meal.tier];

  return (
    <div className="craving-checker-meal-card">
      <div className="craving-checker-meal-header">
        <h4>{meal.name}</h4>
        <span className={`craving-checker-tier-pill ${style.className}`}>
          {style.icon} {meal.tierLabel}
        </span>
      </div>

      {meal.culturalContext && (
        <p className="craving-checker-context">{meal.culturalContext}</p>
      )}

      {meal.reproductiveHealthNote && (
        <p className="craving-checker-repro-note">{meal.reproductiveHealthNote}</p>
      )}

      {meal.considerations && meal.considerations.length > 0 && (
        <div className="craving-checker-considerations">
          <h5>Preparation matters</h5>
          {meal.considerations.map((group) => (
            <div key={group.kind} className={`craving-checker-consideration-group ${group.kind}`}>
              <strong>{group.label}</strong>
              <ul>
                {group.items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      {meal.alternatives && meal.alternatives.length > 0 && (
        <div className="craving-checker-alternatives">
          <h5>{meal.tier === 'generally_compatible' ? 'Related options' : "If you'd rather substitute"}</h5>
          <ul>
            {meal.alternatives.map((alt, i) => (
              <li key={i}>{alt}</li>
            ))}
          </ul>
        </div>
      )}

      <button
        type="button"
        className="craving-checker-details-toggle"
        onClick={() => setExpanded((v) => !v)}
      >
        {expanded ? 'Hide details' : 'View evidence & ingredients'}
      </button>

      {expanded && (
        <div className="craving-checker-details">
          {meal.typicalIngredients && meal.typicalIngredients.length > 0 && (
            <p>
              <strong>Typical ingredients:</strong> {meal.typicalIngredients.join(', ')}
            </p>
          )}
          {meal.evidence && (
            <p>
              <strong>Evidence level:</strong>{' '}
              {meal.evidence === 'established'
                ? 'Established general nutrition/food-safety guidance'
                : meal.evidence === 'limited'
                ? 'Limited or traditional-practice evidence, not a clinical claim'
                : 'Insufficient evidence for a specific health claim'}
            </p>
          )}
        </div>
      )}
    </div>
  );
}