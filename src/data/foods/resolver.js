// src/data/foods/resolver.js
import { FOODS } from './foods';
import { HEALTH_GUIDANCE } from './guidance';
import { COUNTRIES } from './countries';
import { REGIONS } from './regions';
import { SAFETY_STATUSES } from './types';

/**
 * Get foods for a specific culture/region with optional filtering
 */
export function getCulturalFoods({
  region = null,
  country = null,
  culture = null,
  mealType = null,
  journey = null,
  safeOnly = false,
  reviewedOnly = false
} = {}) {
  let results = [];

  // Find foods by culture
  if (culture) {
    results = Object.values(FOODS).filter(food => 
      food.cultures.includes(culture) || food.cultures.includes('default')
    );
  } 
  // Find foods by country
  else if (country) {
    const countryData = COUNTRIES[country];
    if (countryData) {
      results = Object.values(FOODS).filter(food => 
        food.cultures.some(c => countryData.cultures.includes(c))
      );
    }
  }
  // Find foods by region
  else if (region) {
    const countries = Object.values(COUNTRIES).filter(c => c.region === region);
    const cultureSet = new Set();
    countries.forEach(c => c.cultures.forEach(cult => cultureSet.add(cult)));
    results = Object.values(FOODS).filter(food => 
      food.cultures.some(c => cultureSet.has(c))
    );
  }
  // Fallback - return all foods
  else {
    results = Object.values(FOODS);
  }

  // Apply additional filters
  if (mealType) {
    results = results.filter(food => food.mealTypes.includes(mealType));
  }

  if (journey) {
    results = results.filter(food => {
      const guidance = getGuidanceForFood(food.id, journey);
      if (safeOnly) {
        return guidance && guidance.status === SAFETY_STATUSES.SAFE;
      }
      return guidance !== null;
    });
  }

  if (reviewedOnly) {
    results = results.filter(food => 
      food.review && food.review.status === 'approved'
    );
  }

  return results;
}

/**
 * Get guidance for a specific food and journey
 */
export function getGuidanceForFood(foodId, journey, country = null) {
  const guidanceKey = `${foodId}-${journey}`;
  let guidance = HEALTH_GUIDANCE[guidanceKey] || null;

  // Try generic guidance if specific not found
  if (!guidance) {
    guidance = HEALTH_GUIDANCE[`${foodId}-default`] || null;
  }

  // Try journey-specific without food prefix
  if (!guidance) {
    const genericKey = Object.keys(HEALTH_GUIDANCE).find(key => 
      HEALTH_GUIDANCE[key].foodId === foodId && 
      HEALTH_GUIDANCE[key].journey === journey
    );
    guidance = genericKey ? HEALTH_GUIDANCE[genericKey] : null;
  }

  return guidance;
}

/**
 * Get complete food data with guidance
 */
export function getCompleteFoodData(foodId, journey = null, country = null) {
  const food = FOODS[foodId];
  if (!food) return null;

  const result = {
    ...food,
    guidance: {}
  };

  if (journey) {
    result.guidance = getGuidanceForFood(foodId, journey, country);
    
    // Also get journey-specific meal recommendations
    if (result.guidance) {
      result.guidance.tips = result.guidance.recommendations || [];
    }
  }

  return result;
}

/**
 * Backward compatibility function - mimics old getCulturalMeal()
 */
export function getCulturalMeal(culture, mealType, journeyType) {
  const foods = getCulturalFoods({ 
    culture, 
    mealType,
    journey: journeyType
  });

  if (foods.length === 0) {
    const fallback = getCulturalFoods({ 
      mealType,
      journey: journeyType
    });
    // If still no foods, return empty structure
    if (fallback.length === 0) {
      return {
        breakfast: [],
        lunch: [],
        dinner: [],
        snacks: [],
        [journeyType || 'pregnancy']: {
          recommended: [],
          avoid: []
        }
      };
    }
    return formatMealResponse(fallback, journeyType);
  }

  return formatMealResponse(foods, journeyType);
}

/**
 * Format foods into the legacy meal response structure
 */
function formatMealResponse(foods, journeyType) {
  const mealItems = foods.map(food => {
    const guidance = getGuidanceForFood(food.id, journeyType);
    return {
      name: food.name,
      description: food.dietaryNotes?.join(' ') || '',
      nutrients: food.nutrients || [],
      mealTypes: food.mealTypes || [],
      guidance: guidance ? {
        status: guidance.status,
        riskLevel: guidance.riskLevel,
        guidance: guidance.guidance
      } : null
    };
  });

  const result = {
    breakfast: mealItems.filter(f => f.mealTypes?.includes('breakfast')),
    lunch: mealItems.filter(f => f.mealTypes?.includes('lunch')),
    dinner: mealItems.filter(f => f.mealTypes?.includes('dinner')),
    snacks: mealItems.filter(f => f.mealTypes?.includes('snacks')),
  };

  // Add journey-specific data
  const journeyKey = journeyType || 'pregnancy';
  result[journeyKey] = {
    recommended: mealItems
      .filter(f => f.guidance && f.guidance.status !== 'avoid')
      .map(f => f.name),
    avoid: mealItems
      .filter(f => f.guidance && f.guidance.status === 'avoid')
      .map(f => f.name),
    tips: mealItems
      .filter(f => f.guidance && f.guidance.guidance)
      .map(f => f.guidance.guidance)
      .slice(0, 3)
  };

  return result;
}

// ─── NEW HELPER FUNCTIONS FOR Nutrition.jsx ─────────────────────────────────

/**
 * Get journey-specific foods with organized structure
 * Used by Nutrition.jsx getFoodsForJourney import
 */
export function getFoodsForJourney(journeyType, culture = 'default') {
  const mealData = getCulturalMeal(culture, null, journeyType);
  
  return {
    recommended: mealData[journeyType]?.recommended || [],
    avoid: mealData[journeyType]?.avoid || [],
    tips: mealData[journeyType]?.tips || [],
    meals: {
      breakfast: mealData.breakfast || [],
      lunch: mealData.lunch || [],
      dinner: mealData.dinner || [],
      snacks: mealData.snacks || []
    }
  };
}

/**
 * Get personalized meal suggestions based on user's eating patterns
 * Used by Nutrition.jsx getMealSuggestions import
 */
export function getMealSuggestions({
  favoriteFoods = [],
  dietaryPractices = [],
  journeyType = 'pregnancy',
  culture = 'west_central_african',
  limit = 5
} = {}) {
  const suggestions = [];
  
  // 1. If user has favorite foods, find similar foods
  if (favoriteFoods.length > 0) {
    const allFoods = getCulturalFoods({ culture, journey: journeyType });
    
    favoriteFoods.forEach(fav => {
      const lowerFav = fav.toLowerCase();
      const matched = allFoods.find(food => 
        food.name.toLowerCase().includes(lowerFav) ||
        lowerFav.includes(food.name.toLowerCase())
      );
      
      if (matched) {
        const guidance = getGuidanceForFood(matched.id, journeyType);
        suggestions.push({
          name: `Try ${matched.name}`,
          description: matched.dietaryNotes?.join(' ') || 'A nutritious meal option',
          basedOn: fav,
          nutrients: matched.nutrients || [],
          safety: guidance ? {
            status: guidance.status,
            riskLevel: guidance.riskLevel
          } : null
        });
      }
    });
  }
  
  // 2. If no favorites or not enough suggestions, get journey recommendations
  if (suggestions.length < limit) {
    const mealData = getCulturalMeal(culture, null, journeyType);
    const recommended = mealData[journeyType]?.recommended || [];
    
    const remaining = limit - suggestions.length;
    recommended.slice(0, remaining).forEach(item => {
      // Check if already suggested
      if (!suggestions.some(s => s.basedOn === item)) {
        suggestions.push({
          name: `Try ${item}`,
          description: `Recommended for ${journeyType}`,
          basedOn: 'journey_recommendation',
          nutrients: []
        });
      }
    });
  }
  
  // 3. Filter based on dietary practices
  const filtered = suggestions.filter(suggestion => {
    const foodName = suggestion.name.replace('Try ', '');
    return isFoodAllowed(foodName, dietaryPractices);
  });
  
  // If all suggestions were filtered out, return generic alternatives
  if (filtered.length === 0 && dietaryPractices.length > 0) {
    return [{
      name: 'Try a balanced meal with vegetables and protein',
      description: `Based on your dietary preferences (${dietaryPractices.join(', ')}), consider: beans, lentils, tofu, nuts, seeds, or vegetables`,
      basedOn: 'dietary_alternative',
      nutrients: ['protein', 'fiber', 'iron']
    }];
  }
  
  return filtered.slice(0, limit);
}

/**
 * Simple food allowance check - used by getMealSuggestions
 * This is a simplified version - the real one is in dietaryFilters.js
 */
function isFoodAllowed(foodName, dietaryPractices) {
  if (!dietaryPractices || dietaryPractices.length === 0) return true;
  
  const lowerFood = foodName.toLowerCase();
  
  // Check for dietary restrictions
  for (const practice of dietaryPractices) {
    const lowerPractice = practice.toLowerCase();
    
    // Vegetarian - no meat
    if (lowerPractice === 'vegetarian' || lowerPractice === 'vegan') {
      const meatTerms = ['beef', 'pork', 'chicken', 'lamb', 'goat', 'meat', 'sausage', 'bacon', 'ham'];
      if (meatTerms.some(term => lowerFood.includes(term))) {
        return false;
      }
    }
    
    // Vegan - no animal products
    if (lowerPractice === 'vegan') {
      const animalTerms = ['milk', 'cheese', 'yogurt', 'egg', 'butter', 'cream', 'honey', 'fish', 'seafood'];
      if (animalTerms.some(term => lowerFood.includes(term))) {
        return false;
      }
    }
    
    // Gluten-free
    if (lowerPractice === 'gluten-free' || lowerPractice === 'gluten free') {
      const glutenTerms = ['wheat', 'bread', 'pasta', 'noodle', 'semolina', 'spelt', 'barley', 'rye'];
      if (glutenTerms.some(term => lowerFood.includes(term))) {
        return false;
      }
    }
    
    // Dairy-free
    if (lowerPractice === 'dairy-free' || lowerPractice === 'dairy free') {
      const dairyTerms = ['milk', 'cheese', 'yogurt', 'butter', 'cream', 'paneer'];
      if (dairyTerms.some(term => lowerFood.includes(term))) {
        return false;
      }
    }
    
    // Halal
    if (lowerPractice === 'halal') {
      const haramTerms = ['pork', 'bacon', 'ham', 'lard', 'gelatin', 'alcohol'];
      if (haramTerms.some(term => lowerFood.includes(term))) {
        return false;
      }
    }
  }
  
  return true;
}

// ─── Re-export everything ────────────────────────────────────────────────────
export * from './types';
export * from './regions';
export * from './countries';
export * from './foods';
export * from './guidance';
export * from './sources';
export * from './validation';