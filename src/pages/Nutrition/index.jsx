// src/pages/Nutrition.jsx
import { useState, useEffect, useMemo, useCallback } from 'react';
import { WCard, SectionTitle, Tag, Pill, IconBox } from '../../components/ui';
import { useApp } from '../../context/useApp';
import { isFoodAllowed, parseFoodString, filterAllowedFoods } from '../../utils/dietaryFilters';
import {
  getCulturalMeal,
  getFoodsForJourney,
  getMealSuggestions  // ✅ Fixed import name
} from '../../data/foods/resolver';
import {
  analyzeCraving,
  getNigerianFoods,
  getJourneyNutrition,
  getMeals,
  SUPPS
} from '../../data/supplements';
import '../../styles/motion.css';

export default function Nutrition() {
  const { 
    journeyType, 
    culture, 
    getCurrentWeek, 
    getTrimester, 
    babyAgeDays, 
    setShowSOS,
    dietaryPractices,
    foodDbReady,
    foodDbReport,
    getJourneyDisplay
  } = useApp();
  
  // Safe display values
  const currentWeek = getCurrentWeek();
  const trimester = getTrimester();
  const weekLabel = currentWeek ? `Week ${currentWeek}` : 'This Week';
  
  // State for user data
  const [mealLogs, setMealLogs] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('mealHistory') || '[]');
    } catch {
      return [];
    }
  });
  
  const [nutritionLogs, setNutritionLogs] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('nutritionLogs') || '[]');
    } catch {
      return [];
    }
  });
  
  const [mealSwaps, setMealSwaps] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('mealSwaps') || '{}');
    } catch {
      return {};
    }
  });
  
  const [selectedDate, setSelectedDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });
  
  const [meal, setMeal] = useState("morning");
  const [supplements, setSupplements] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('dailySupplements') || '{}');
      const today = new Date().toISOString().split('T')[0];
      if (saved.date === today) {
        return saved.taken || [];
      }
      return [];
    } catch {
      return [];
    }
  });
  const [craving, setCraving] = useState("");
  const [cravingResult, setCravingResult] = useState(null);
  const [showSwapModal, setShowSwapModal] = useState(false);
  const [selectedMealItem, setSelectedMealItem] = useState(null);
  const [swapOption, setSwapOption] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showMealModal, setShowMealModal] = useState(false);
  const [newMeal, setNewMeal] = useState({ name: '', description: '', nutrients: {} });
  const [mealSuggestions, setMealSuggestions] = useState([]);
  
  // Check if selected date is today
  const isToday = useMemo(() => {
    const today = new Date().toISOString().split('T')[0];
    return selectedDate === today;
  }, [selectedDate]);
  
  // Format date for display
  const formatDisplayDate = useCallback((dateStr) => {
    const date = new Date(dateStr);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (dateStr === today.toISOString().split('T')[0]) {
      return "Today";
    } else if (dateStr === yesterday.toISOString().split('T')[0]) {
      return "Yesterday";
    } else {
      return date.toLocaleDateString('en-US', { 
        weekday: 'short', 
        month: 'short', 
        day: 'numeric' 
      });
    }
  }, []);
  
  // Navigate dates
  const goToPreviousDay = useCallback(() => {
    const date = new Date(selectedDate);
    date.setDate(date.getDate() - 1);
    setSelectedDate(date.toISOString().split('T')[0]);
  }, [selectedDate]);
  
  const goToNextDay = useCallback(() => {
    const date = new Date(selectedDate);
    date.setDate(date.getDate() + 1);
    const nextDate = date.toISOString().split('T')[0];
    const today = new Date().toISOString().split('T')[0];
    
    if (nextDate <= today) {
      setSelectedDate(nextDate);
    }
  }, [selectedDate]);
  
  const goToToday = useCallback(() => {
    setSelectedDate(new Date().toISOString().split('T')[0]);
  }, []);
  
  // Load user data from localStorage
  useEffect(() => {
    try {
      const savedMeals = localStorage.getItem('mealHistory');
      if (savedMeals) {
        setMealLogs(JSON.parse(savedMeals));
      }
      
      const savedNutrition = localStorage.getItem('nutritionLogs');
      if (savedNutrition) {
        setNutritionLogs(JSON.parse(savedNutrition));
      }
      
      const savedSwaps = localStorage.getItem('mealSwaps');
      if (savedSwaps) {
        setMealSwaps(JSON.parse(savedSwaps));
      }
      
      const savedSupps = localStorage.getItem('dailySupplements');
      if (savedSupps) {
        const suppData = JSON.parse(savedSupps);
        const today = new Date().toISOString().split('T')[0];
        if (suppData.date === today) {
          setSupplements(suppData.taken || []);
        } else {
          setSupplements([]);
        }
      } else {
        setSupplements([]);
      }
    } catch (error) {
      console.error('Failed to load nutrition data:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);
  
  // ─── Load meal suggestions from new food database ──────────────────────────
  useEffect(() => {
    if (foodDbReady) {
      try {
        const foodCount = {};
        mealLogs.forEach(log => {
          if (log.items) {
            log.items.forEach(item => {
              const name = typeof item === 'string' ? item : item.name;
              if (name) foodCount[name] = (foodCount[name] || 0) + 1;
            });
          }
        });
        
        const favoriteFoods = Object.entries(foodCount)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 5)
          .map(([name]) => name);
        
        // ✅ Use the correct function name
        const suggestions = getMealSuggestions({
          favoriteFoods,
          dietaryPractices,
          journeyType,
          culture: culture || 'west_central_african'
        });
        
        setMealSuggestions(suggestions);
      } catch (error) {
        console.warn('Failed to load meal suggestions:', error);
        setMealSuggestions([]);
      }
    }
  }, [foodDbReady, mealLogs, dietaryPractices, journeyType, culture]);
  
  // Save supplement state
  const saveSupplements = useCallback((updatedSupps) => {
    try {
      const data = {
        date: new Date().toISOString().split('T')[0],
        taken: updatedSupps
      };
      localStorage.setItem('dailySupplements', JSON.stringify(data));
      setSupplements(updatedSupps);
    } catch (error) {
      console.error('Failed to save supplements:', error);
    }
  }, []);
  
  // Get meals for selected date from logs
  const todaysMeals = useMemo(() => {
    return mealLogs.filter(log => log.date === selectedDate);
  }, [mealLogs, selectedDate]);
  
  // Get meals for current meal period
  const currentMeals = useMemo(() => {
    return todaysMeals.filter(m => m.mealType === meal);
  }, [todaysMeals, meal]);
  
  // ─── Get recommended meals from new food database ─────────────────────────
  const recommendedMeals = useMemo(() => {
    if (!foodDbReady) return [];
    
    try {
      const mealData = getCulturalMeal(
        culture || 'west_central_african',
        meal,
        journeyType
      );
      
      return mealData[meal] || [];
    } catch (error) {
      console.warn('Failed to get recommended meals:', error);
      return [];
    }
  }, [foodDbReady, culture, meal, journeyType]);
  
  // ─── Get journey nutrition info ────────────────────────────────────────────
  const journeyNutrition = useMemo(() => {
    try {
      return getJourneyNutrition(journeyType, trimester);
    } catch (error) {
      console.warn('Failed to get journey nutrition:', error);
      return null;
    }
  }, [journeyType, trimester]);
  
  // Calculate nutritional insights from real data
  const nutritionalInsights = useMemo(() => {
    if (nutritionLogs.length === 0) return null;
    
    const today = new Date().toISOString().split('T')[0];
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const sevenDaysAgoStr = sevenDaysAgo.toISOString().split('T')[0];
    
    const recentLogs = nutritionLogs.filter(log => 
      log.date >= sevenDaysAgoStr && log.date <= today
    );
    
    if (recentLogs.length === 0) return null;
    
    const avgCalories = recentLogs.reduce((sum, log) => sum + (log.calories || 0), 0) / recentLogs.length;
    const avgProtein = recentLogs.reduce((sum, log) => sum + (log.protein || 0), 0) / recentLogs.length;
    const avgIron = recentLogs.reduce((sum, log) => sum + (log.iron || 0), 0) / recentLogs.length;
    const avgCalcium = recentLogs.reduce((sum, log) => sum + (log.calcium || 0), 0) / recentLogs.length;
    
    return {
      avgCalories: Math.round(avgCalories),
      avgProtein: Math.round(avgProtein),
      avgIron: Math.round(avgIron * 10) / 10,
      avgCalcium: Math.round(avgCalcium),
      daysTracked: recentLogs.length
    };
  }, [nutritionLogs]);
  
  // Get user's most common foods
  const favoriteFoods = useMemo(() => {
    const foodCount = {};
    mealLogs.forEach(log => {
      if (log.items) {
        log.items.forEach(item => {
          const name = typeof item === 'string' ? item : item.name;
          if (name) foodCount[name] = (foodCount[name] || 0) + 1;
        });
      }
    });
    
    return Object.entries(foodCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([name]) => name);
  }, [mealLogs]);
  
  // Check for nutritional gaps
  const nutritionalGaps = useMemo(() => {
    if (!nutritionalInsights) return [];
    
    const gaps = [];
    
    if (journeyType === 'pregnant') {
      if (nutritionalInsights.avgIron < 27) {
        gaps.push({
          nutrient: "Iron",
          current: nutritionalInsights.avgIron,
          target: 27,
          message: "Iron is crucial for baby's development",
          foods: "lean red meat, spinach, lentils, ugu leaf",
          unit: "mg"
        });
      }
      if (nutritionalInsights.avgCalcium < 1000) {
        gaps.push({
          nutrient: "Calcium",
          current: nutritionalInsights.avgCalcium,
          target: 1000,
          message: "Baby's bones are developing",
          foods: "milk, yogurt, cheese, tiger nuts, fortified alternatives",
          unit: "mg"
        });
      }
    }
    
    if (nutritionalInsights.avgProtein < 70) {
      gaps.push({
        nutrient: "Protein",
        current: nutritionalInsights.avgProtein,
        target: 70,
        message: "Essential for tissue growth",
        foods: "eggs, chicken, fish, beans, moi moi",
        unit: "g"
      });
    }
    
    return gaps;
  }, [nutritionalInsights, journeyType]);
  
  // ─── Filtered nutritional gaps with dietary practices ─────────────────────
  const filteredNutritionalGaps = useMemo(() => {
    const gaps = nutritionalGaps;
    if (!gaps.length) return [];
    
    return gaps.map(gap => {
      const foods = parseFoodString(gap.foods);
      const allowedFoods = filterAllowedFoods(foods, dietaryPractices);
      
      if (allowedFoods.length === 0) {
        return {
          ...gap,
          foods: "Ask your healthcare provider for alternatives that fit your diet",
          hasRestrictions: true,
          noAllowedFoods: true
        };
      }
      
      return {
        ...gap,
        foods: allowedFoods.join(', '),
        hasRestrictions: foods.length !== allowedFoods.length,
        noAllowedFoods: false
      };
    });
  }, [nutritionalGaps, dietaryPractices]);
  
  // ─── Craving analysis ──────────────────────────────────────────────────────
  const analyseCraving = useCallback(() => {
    if (!craving.trim()) return;
    
    try {
      const result = analyzeCraving(craving);
      
      const matchingGap = filteredNutritionalGaps.find(gap => 
        craving.toLowerCase().includes(gap.nutrient.toLowerCase())
      );
      
      if (matchingGap) {
        result.relatedNutrient = matchingGap.nutrient;
        result.relatedGap = matchingGap;
      }
      
      setCravingResult(result);
      
      if (result.urgent && setShowSOS) {
        setShowSOS(true);
      }
    } catch (error) {
      console.warn('Craving analysis failed:', error);
      setCravingResult({
        deficiency: "Unable to analyze craving",
        food: "Please try again or consult a healthcare provider",
        icon: "🤔",
        urgent: false
      });
    }
  }, [craving, filteredNutritionalGaps, setShowSOS]);
  
  // ─── Filtered meal suggestions ─────────────────────────────────────────────
  const filteredMealSuggestions = useMemo(() => {
    if (!mealSuggestions.length) return [];
    
    return mealSuggestions.filter(suggestion => {
      const foodMatch = suggestion.name.match(/Try (.+?)(?: with|$)/);
      if (foodMatch) {
        const suggestedFood = foodMatch[1].toLowerCase();
        const foodParts = suggestedFood.split(' ');
        const isAllowed = isFoodAllowed(suggestedFood, dietaryPractices) &&
                         foodParts.every(part => isFoodAllowed(part, dietaryPractices));
        return isAllowed;
      }
      return true;
    });
  }, [mealSuggestions, dietaryPractices]);
  
  // Handle meal swap
  const handleSwapMeal = useCallback((mealItem) => {
    setSelectedMealItem(mealItem);
    const foodName = typeof mealItem === 'string' ? mealItem : mealItem.name;
    
    const isAllowed = isFoodAllowed(foodName, dietaryPractices);
    
    if (!isAllowed) {
      try {
        const suggestions = getMealSuggestions({
          favoriteFoods: [foodName],
          dietaryPractices,
          journeyType,
          culture: culture || 'west_central_african'
        });
        
        if (suggestions.length > 0) {
          setSwapOption({
            name: `Alternative to ${foodName}`,
            prep: suggestions[0].description || 'Try one of these alternatives',
            alternatives: suggestions.map(s => s.name).join(', ')
          });
        } else {
          setSwapOption({
            name: `Alternative to ${foodName}`,
            prep: `Based on your dietary preferences (${dietaryPractices.join(', ')}), try: beans, lentils, tofu, nuts, seeds, or vegetables`,
            alternatives: 'beans, lentils, tofu, nuts, seeds, vegetables'
          });
        }
      } catch (error) {
        setSwapOption({
          name: `Alternative to ${foodName}`,
          prep: `Try: beans, lentils, tofu, nuts, seeds, or vegetables`,
          alternatives: 'beans, lentils, tofu, nuts, seeds, vegetables'
        });
      }
    } else {
      setSwapOption({
        name: `Try a different preparation of ${foodName}`,
        prep: 'Same food, different cooking method can change the flavour and texture',
        alternatives: 'grilled, steamed, roasted, or raw'
      });
    }
    
    setShowSwapModal(true);
  }, [dietaryPractices, journeyType, culture]);
  
  // Apply swap
  const handleApplySwap = useCallback(() => {
    if (selectedMealItem && swapOption) {
      try {
        const key = typeof selectedMealItem === 'string' ? selectedMealItem : selectedMealItem.name;
        const updatedSwaps = {
          ...mealSwaps,
          [key]: {
            ...swapOption,
            date: new Date().toISOString(),
            originalMeal: key
          }
        };
        localStorage.setItem('mealSwaps', JSON.stringify(updatedSwaps));
        setMealSwaps(updatedSwaps);
      } catch (error) {
        console.error('Failed to save meal swap:', error);
      }
    }
    setShowSwapModal(false);
  }, [selectedMealItem, swapOption, mealSwaps]);
  
  // Log a new meal
  const logMeal = useCallback(() => {
    if (!newMeal.name.trim()) return;
    
    try {
      const mealToLog = {
        id: Date.now(),
        date: selectedDate,
        mealType: meal,
        name: newMeal.name,
        description: newMeal.description || `${newMeal.name} meal`,
        nutrients: newMeal.nutrients || {},
        items: [newMeal.name],
        timestamp: new Date().toISOString()
      };
      
      const updatedLogs = [...mealLogs, mealToLog];
      setMealLogs(updatedLogs);
      localStorage.setItem('mealHistory', JSON.stringify(updatedLogs));
      
      if (newMeal.nutrients?.calories) {
        const updatedNutrition = [...nutritionLogs, {
          date: selectedDate,
          calories: newMeal.nutrients.calories || 0,
          protein: newMeal.nutrients.protein || 0,
          iron: newMeal.nutrients.iron || 0,
          calcium: newMeal.nutrients.calcium || 0,
          timestamp: new Date().toISOString()
        }];
        setNutritionLogs(updatedNutrition);
        localStorage.setItem('nutritionLogs', JSON.stringify(updatedNutrition));
      }
      
      setNewMeal({ name: '', description: '', nutrients: {} });
      setShowMealModal(false);
    } catch (error) {
      console.error('Failed to log meal:', error);
    }
  }, [newMeal, mealLogs, nutritionLogs, selectedDate, meal]);
  
  // Toggle supplement
  const toggleSupplement = useCallback((index) => {
    const updated = [...supplements];
    updated[index] = !updated[index];
    saveSupplements(updated);
  }, [supplements, saveSupplements]);
  
  // Render loading state
  if (isLoading) {
    return (
      <div className="page-pad">
        <div style={{ textAlign: "center", padding: "var(--sp-8)" }}>
          <div style={{ 
            width: 40, 
            height: 40, 
            border: '3px solid var(--border)', 
            borderTopColor: 'var(--t)', 
            borderRadius: '50%', 
            animation: 'spin 1s linear infinite', 
            margin: '0 auto var(--sp-4)' 
          }} />
          <p style={{ color: 'var(--mt)' }}>Loading your nutrition data...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="page-pad">
      {/* Food Database Status */}
      {foodDbReady && foodDbReport && foodDbReport.migratedFoods > 0 && (
        <WCard style={{ 
          marginBottom: "var(--gap-md)", 
          background: "var(--sgl)", 
          border: "1px solid var(--sgm)44" 
        }}>
          <p style={{ fontSize: "var(--fs-xs)", color: "var(--sg)" }}>
            🍽️ {foodDbReport.migratedFoods} foods loaded from database
            {foodDbReport.unmappedNutrients?.length > 0 && 
              ` • ${foodDbReport.unmappedNutrients.length} nutrient tags to review`
            }
          </p>
        </WCard>
      )}

      <div className="card-in card-in-1">
        <SectionTitle 
          title="Nutrition" 
          subtitle={journeyNutrition ? `${journeyNutrition.title}` : weekLabel} 
        />
      </div>

      {/* Journey Nutrition Card */}
      {journeyNutrition && (
        <WCard className="card-in card-in-2" style={{ 
          marginBottom: "var(--gap-md)", 
          background: "var(--lvl)",
          border: "1px solid var(--border)44"
        }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--sp-2)" }}>
            <p style={{ fontWeight: 700, fontSize: "var(--fs-md)" }}>{journeyNutrition.title}</p>
            <p style={{ fontSize: "var(--fs-sm)", color: "var(--mt)" }}>
              <strong>Focus:</strong> {journeyNutrition.focus}
            </p>
            <p style={{ fontSize: "var(--fs-xs)", color: "var(--md)" }}>
              <strong>Recommended:</strong> {journeyNutrition.foods}
            </p>
            <Tag label={journeyNutrition.tips} bg="var(--bll)" tc="var(--bl)" />
          </div>
        </WCard>
      )}

      {/* Show dietary practices summary */}
      {dietaryPractices && dietaryPractices.length > 0 && (
        <WCard className="card-in card-in-3" style={{ 
          marginBottom: "var(--gap-md)", 
          background: "var(--lvl)" 
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "var(--gap-sm)", flexWrap: "wrap" }}>
            <span style={{ fontWeight: 600, fontSize: "var(--fs-sm)" }}>Your dietary preferences:</span>
            {dietaryPractices.map(practice => (
              <Tag key={practice} label={practice} bg="var(--warm)" tc="var(--dp)" />
            ))}
          </div>
        </WCard>
      )}

      {/* Real Data Summary */}
      {nutritionalInsights && nutritionalInsights.daysTracked > 0 ? (
        <WCard className="card-in card-in-4" style={{ 
          marginBottom: "var(--gap-md)", 
          background: "var(--lvl)" 
        }}>
          <p style={{ fontWeight: 800, marginBottom: "var(--sp-2)" }}>📊 Your 7-Day Nutrition</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))", gap: "var(--gap-sm)" }}>
            <div>
              <p style={{ fontSize: "var(--fs-2xs)", color: "var(--mt)" }}>Avg Calories</p>
              <p style={{ fontSize: "var(--fs-lg)", fontWeight: 800 }}>{nutritionalInsights.avgCalories}</p>
            </div>
            <div>
              <p style={{ fontSize: "var(--fs-2xs)", color: "var(--mt)" }}>Protein (g)</p>
              <p style={{ fontSize: "var(--fs-lg)", fontWeight: 800 }}>{nutritionalInsights.avgProtein}</p>
            </div>
            <div>
              <p style={{ fontSize: "var(--fs-2xs)", color: "var(--mt)" }}>Iron (mg)</p>
              <p style={{ fontSize: "var(--fs-lg)", fontWeight: 800 }}>{nutritionalInsights.avgIron}</p>
            </div>
            <div>
              <p style={{ fontSize: "var(--fs-2xs)", color: "var(--mt)" }}>Days Tracked</p>
              <p style={{ fontSize: "var(--fs-lg)", fontWeight: 800 }}>{nutritionalInsights.daysTracked}/7</p>
            </div>
          </div>
        </WCard>
      ) : (
        <WCard className="card-in card-in-4" style={{ 
          marginBottom: "var(--gap-md)", 
          textAlign: "center" 
        }}>
          <p>📝 No nutrition data yet</p>
          <p style={{ fontSize: "var(--fs-xs)", color: "var(--mt)" }}>
            Start logging your meals to see personalized insights
          </p>
        </WCard>
      )}

      {/* Nutritional Gaps */}
      {filteredNutritionalGaps.length > 0 && (
        <WCard className="card-in card-in-5" style={{ 
          marginBottom: "var(--gap-md)", 
          background: "var(--warm)", 
          border: "1px solid var(--border2)" 
        }}>
          <p style={{ fontWeight: 800, marginBottom: "var(--sp-2)" }}>⚠️ Nutritional Gaps Detected</p>
          {filteredNutritionalGaps.map((gap, i) => (
            <div key={i} className="reveal-in" style={{ 
              marginBottom: "var(--sp-3)", 
              animationDelay: `${i * 0.08}s` 
            }}>
              <p style={{ fontWeight: 700, fontSize: "var(--fs-sm)" }}>
                Low {gap.nutrient}: {gap.current}/{gap.target} {gap.unit}
              </p>
              <p style={{ fontSize: "var(--fs-xs)", color: "var(--mt)" }}>{gap.message}</p>
              <Tag label={`Eat: ${gap.foods}`} bg="var(--sgl)" tc="var(--sg)" />
              {gap.noAllowedFoods && (
                <p style={{ fontSize: "var(--fs-2xs)", color: "var(--rd)", marginTop: "var(--sp-1)" }}>
                  ⚠️ Your dietary preferences limit standard recommendations. Please consult a healthcare provider.
                </p>
              )}
              {gap.hasRestrictions && !gap.noAllowedFoods && (
                <p style={{ fontSize: "var(--fs-2xs)", color: "var(--mt)", marginTop: "var(--sp-1)" }}>
                  ✨ Some foods filtered to match your dietary preferences
                </p>
              )}
            </div>
          ))}
        </WCard>
      )}

      {/* Date selector */}
      <div className="card-in card-in-6">
        <SectionTitle title={`📅 ${formatDisplayDate(selectedDate)}`} />
      </div>
      
      {/* Date navigation controls */}
      <div className="card-in card-in-7" style={{ 
        display: "flex", 
        alignItems: "center", 
        justifyContent: "space-between",
        gap: "var(--gap-sm)",
        marginBottom: "var(--sp-4)"
      }}>
        <button 
          onClick={goToPreviousDay}
          className="btn-tap"
          style={{
            padding: "var(--sp-2) var(--sp-3)",
            background: "var(--lvl)",
            border: "1px solid var(--border)",
            borderRadius: "var(--r)",
            cursor: "pointer"
          }}
        >
          {'<'} Previous
        </button>
        
        <button 
          onClick={goToToday}
          className="btn-tap"
          style={{
            padding: "var(--sp-2) var(--sp-3)",
            background: isToday ? "var(--sg)" : "var(--lvl)",
            color: isToday ? "#fff" : "var(--text)",
            border: "1px solid var(--border)",
            borderRadius: "var(--r)",
            cursor: "pointer",
            fontWeight: 600
          }}
        >
          Today
        </button>
        
        <button 
          onClick={goToNextDay}
          disabled={isToday}
          className="btn-tap"
          style={{
            padding: "var(--sp-2) var(--sp-3)",
            border: "1px solid var(--border)",
            color: isToday ? "var(--mt)" : "var(--text)",
            borderRadius: "var(--r)",
            cursor: isToday ? "not-allowed" : "pointer",
            opacity: isToday ? 0.5 : 1
          }}
        >
          Next {'>'}
        </button>
      </div>
      
      {/* Meal type selector */}
      <div className="card-in card-in-8" style={{ 
        display: "flex", 
        gap: "var(--gap-sm)", 
        marginBottom: "var(--sp-4)", 
        overflowX: "auto" 
      }}>
        {[
          { id: "morning", label: "🌅 Breakfast", icon: "🌅" },
          { id: "afternoon", label: "☀️ Lunch", icon: "☀️" },
          { id: "evening", label: "🌙 Dinner", icon: "🌙" },
          { id: "snacks", label: "🍎 Snacks", icon: "🍎" }
        ].map(m => (
          <Pill 
            key={m.id} 
            label={m.label} 
            active={meal === m.id} 
            onClick={() => setMeal(m.id)} 
            className="btn-tap choice-chip"
          />
        ))}
      </div>
      
      {/* Display meals for selected date */}
      <div className="card-in card-in-9">
        <SectionTitle 
          title={currentMeals.length > 0 ? "Your Logged Meals" : "Recommended Meals"} 
          subtitle={currentMeals.length > 0 ? `For ${formatDisplayDate(selectedDate)}` : `From your ${culture || 'West African'} food culture`}
        />
        
        {currentMeals.length > 0 ? (
          currentMeals.map((mealItem, i) => (
            <WCard key={i} className="reveal-in" style={{ 
              padding: "var(--card-p)", 
              marginBottom: "var(--gap-sm)", 
              animationDelay: `${i * 0.06}s` 
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div style={{ flex: 1 }}>
                  <p style={{ fontWeight: 800, fontSize: "var(--fs-md)" }}>{mealItem.name}</p>
                  <p style={{ fontSize: "var(--fs-xs)", color: "var(--mt)", marginTop: "var(--sp-1)" }}>
                    {mealItem.description}
                  </p>
                  {mealItem.nutrients && Object.keys(mealItem.nutrients).length > 0 && (
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--gap-sm)", marginTop: "var(--sp-2)" }}>
                      {Object.entries(mealItem.nutrients).map(([key, value]) => (
                        <Tag key={key} label={`${key}: ${value}`} bg="var(--sgl)" tc="var(--sg)" />
                      ))}
                    </div>
                  )}
                </div>
                <button 
                  onClick={() => handleSwapMeal(mealItem)}
                  className="btn-tap"
                  style={{ 
                    background: "var(--warm)", 
                    border: "none", 
                    borderRadius: 20, 
                    padding: "4px 12px", 
                    cursor: "pointer",
                    marginLeft: "var(--sp-2)",
                    flexShrink: 0
                  }}
                >
                  🔄 Swap
                </button>
              </div>
            </WCard>
          ))
        ) : (
          <>
            {/* Show recommended meals from food database */}
            {recommendedMeals.length > 0 && (
              <div style={{ marginBottom: "var(--sp-3)" }}>
                <p style={{ fontSize: "var(--fs-sm)", color: "var(--mt)", marginBottom: "var(--sp-2)" }}>
                  💡 Based on your journey ({getJourneyDisplay()}) and culture
                </p>
                {recommendedMeals.slice(0, 5).map((mealItem, i) => {
                  const mealName = typeof mealItem === 'string' ? mealItem : mealItem.name;
                  const mealDesc = typeof mealItem !== 'string' ? mealItem.dietaryNotes?.join(' ') || '' : '';
                  const mealNutrients = typeof mealItem !== 'string' ? mealItem.nutrients || [] : [];
                  
                  const isAllowed = isFoodAllowed(mealName, dietaryPractices);
                  
                  return (
                    <WCard key={i} className="reveal-in" style={{ 
                      padding: "var(--card-p)", 
                      marginBottom: "var(--gap-sm)", 
                      background: isAllowed ? "var(--lvl)" : "var(--rdl)",
                      border: `1px solid ${isAllowed ? 'var(--border)44' : 'var(--rdm)44'}`,
                      animationDelay: `${i * 0.06}s`
                    }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                        <div style={{ flex: 1 }}>
                          <p style={{ fontWeight: 700, fontSize: "var(--fs-md)" }}>
                            {mealName}
                            {!isAllowed && (
                              <Tag label="⚠️ May not fit your diet" bg="var(--rdl)" tc="var(--rd)" />
                            )}
                          </p>
                          {mealDesc && (
                            <p style={{ fontSize: "var(--fs-xs)", color: "var(--mt)", marginTop: "var(--sp-1)" }}>
                              {mealDesc}
                            </p>
                          )}
                          {mealNutrients.length > 0 && (
                            <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--gap-sm)", marginTop: "var(--sp-2)" }}>
                              {mealNutrients.map(nutrient => (
                                <Tag key={nutrient} label={nutrient} bg="var(--sgl)" tc="var(--sg)" />
                              ))}
                            </div>
                          )}
                        </div>
                        <button 
                          onClick={() => {
                            if (isAllowed) {
                              setNewMeal({
                                name: mealName,
                                description: mealDesc,
                                nutrients: {}
                              });
                              logMeal();
                            } else {
                              handleSwapMeal(mealItem);
                            }
                          }}
                          className="btn-tap"
                          style={{ 
                            padding: "4px 12px", 
                            background: isAllowed ? "var(--sg)" : "var(--warm)",
                            color: isAllowed ? "#fff" : "var(--text)",
                            border: "none", 
                            borderRadius: 20, 
                            cursor: "pointer",
                            marginLeft: "var(--sp-2)",
                            flexShrink: 0
                          }}
                        >
                          {isAllowed ? '+ Log' : '🔄 Swap'}
                        </button>
                      </div>
                    </WCard>
                  );
                })}
              </div>
            )}
            
            {isToday && (
              <button 
                onClick={() => setShowMealModal(true)}
                className="btn-tap"
                style={{ 
                  padding: "var(--sp-2) var(--sp-4)", 
                  background: "var(--sg)", 
                  color: "#fff", 
                  border: "none", 
                  borderRadius: "var(--r)", 
                  cursor: "pointer",
                  width: "100%",
                  textAlign: "center"
                }}
              >
                + Log a Meal
              </button>
            )}
            {!isToday && (
              <p style={{ fontSize: "var(--fs-xs)", color: "var(--mt)", textAlign: "center" }}>
                You can only log meals for today
              </p>
            )}
          </>
        )}
      </div>

      {/* AI Suggestions Based on REAL Data */}
      {filteredMealSuggestions.length > 0 && (
        <>
          <div className="card-in card-in-10">
            <SectionTitle title="💡 Based on Your Eating Patterns" />
          </div>
          <div className="card-in card-in-11" style={{ 
            display: "flex", 
            gap: "var(--gap-md)", 
            overflowX: "auto", 
            paddingBottom: "var(--sp-2)" 
          }}>
            {filteredMealSuggestions.map((suggestion, i) => (
              <WCard key={i} className="reveal-in" style={{ 
                minWidth: 200, 
                flexShrink: 0, 
                animationDelay: `${i * 0.06}s` 
              }}>
                <p style={{ fontWeight: 800, fontSize: "var(--fs-sm)" }}>{suggestion.name}</p>
                <p style={{ fontSize: "var(--fs-xs)", color: "var(--mt)", marginTop: "var(--sp-1)" }}>
                  {suggestion.description}
                </p>
                {suggestion.basedOn && (
                  <Tag label={`Based on: ${suggestion.basedOn}`} bg="var(--lvl)" tc="var(--mt)" />
                )}
                {suggestion.nutrients && suggestion.nutrients.length > 0 && (
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--gap-sm)", marginTop: "var(--sp-2)" }}>
                    {suggestion.nutrients.map(n => (
                      <Tag key={n} label={n} bg="var(--sgl)" tc="var(--sg)" />
                    ))}
                  </div>
                )}
                <button 
                  onClick={() => {
                    setNewMeal({
                      name: suggestion.name.replace('Try ', ''),
                      description: suggestion.description,
                      nutrients: {}
                    });
                    setShowMealModal(true);
                  }}
                  className="btn-tap"
                  style={{ 
                    marginTop: "var(--sp-2)",
                    padding: "4px 12px", 
                    background: "var(--bll)", 
                    color: "var(--bl)",
                    border: "none", 
                    borderRadius: 20, 
                    cursor: "pointer"
                  }}
                >
                  + Log This
                </button>
              </WCard>
            ))}
          </div>
        </>
      )}

      {/* Craving Intelligence */}
      <div className="card-in card-in-12">
        <SectionTitle title="🍫 Craving Check" />
        <WCard style={{ marginBottom: "var(--gap-md)" }}>
          <p style={{ fontSize: "var(--fs-xs)", color: "var(--mt)", marginBottom: "var(--sp-3)" }}>
            {nutritionalInsights?.daysTracked > 0 
              ? `Based on ${nutritionalInsights.daysTracked} days of tracked nutrition` 
              : "Log meals for 7 days to see personalized insights"}
          </p>
          <div style={{ display: "flex", gap: "var(--gap-sm)" }}>
            <input 
              value={craving} 
              onChange={e => setCraving(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && analyseCraving()}
              placeholder="What are you craving? (e.g., chocolate, red meat, ice)" 
              className="form-input" 
              style={{ flex: 1, padding: "var(--sp-2)" }}
            />
            <button 
              onClick={analyseCraving}
              className="btn-tap"
              style={{ 
                padding: "0 var(--sp-4)", 
                background: "var(--dp)", 
                color: "#fff", 
                border: "none", 
                borderRadius: "var(--r)", 
                cursor: "pointer" 
              }}
            >
              Check
            </button>
          </div>
          {cravingResult && (
            <div className="reveal-in" style={{ 
              marginTop: "var(--sp-3)", 
              padding: "var(--sp-3)", 
              background: cravingResult.urgent ? "var(--rdl)" : "var(--lvl)", 
              borderRadius: "var(--r)" 
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "var(--gap-sm)" }}>
                <span style={{ fontSize: "var(--fs-xl)" }}>{cravingResult.icon || '🔍'}</span>
                <p style={{ fontWeight: 700 }}>{cravingResult.deficiency}</p>
              </div>
              <p style={{ fontSize: "var(--fs-sm)" }}>💡 {cravingResult.food}</p>
              {cravingResult.source && (
                <Tag label={`Source: ${cravingResult.source}`} bg="var(--bll)" tc="var(--bl)" />
              )}
              {cravingResult.relatedNutrient && (
                <Tag label={`Related gap: ${cravingResult.relatedNutrient}`} bg="var(--gdl)" tc="var(--gd)" />
              )}
              {cravingResult.urgent && (
                <Tag label="⚠️ Please consult a healthcare provider" bg="var(--rdl)" tc="var(--rd)" />
              )}
            </div>
          )}
        </WCard>
      </div>

      {/* Supplements Tracker */}
      <div className="card-in card-in-13">
        <SectionTitle title="💊 Daily Supplements" />
        <WCard>
          <div style={{ display: "grid", gap: "var(--gap-sm)" }}>
            {SUPPS.map((supp, i) => (
              <div key={i} style={{ 
                display: "flex", 
                alignItems: "center", 
                gap: "var(--gap-md)",
                padding: "var(--sp-2)",
                background: supplements[i] ? "var(--sgl)" : "var(--warm)",
                borderRadius: "var(--r)",
                border: `1px solid ${supplements[i] ? 'var(--sgm)' : 'var(--border)'}`
              }}>
                <input
                  type="checkbox"
                  checked={supplements[i] || false}
                  onChange={() => toggleSupplement(i)}
                  style={{ width: 20, height: 20, cursor: "pointer" }}
                />
                <div style={{ flex: 1 }}>
                  <p style={{ fontWeight: 700, fontSize: "var(--fs-sm)" }}>{supp.name}</p>
                  <p style={{ fontSize: "var(--fs-xs)", color: "var(--mt)" }}>{supp.dose} • {supp.time}</p>
                  <p style={{ fontSize: "var(--fs-2xs)", color: "var(--md)" }}>{supp.benefits}</p>
                </div>
                <Tag 
                  label={supplements[i] ? "✓ Taken" : "Pending"} 
                  bg={supplements[i] ? "var(--sgl)" : "var(--gdl)"} 
                  tc={supplements[i] ? "var(--sg)" : "var(--gd)"} 
                />
              </div>
            ))}
          </div>
        </WCard>
      </div>

      {/* Meal Logging Modal */}
      {showMealModal && (
        <div
          className="reveal-in"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0,0,0,0.5)",
            backdropFilter: "blur(4px)",
            zIndex: 2000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "var(--pad-x)"
          }}
          onClick={e => e.target === e.currentTarget && setShowMealModal(false)}
        >
          <div style={{ background: "var(--card)", borderRadius: "var(--r2)", maxWidth: 500, width: "100%", padding: "var(--sp-5)" }}>
            <h3 style={{ marginBottom: "var(--sp-3)" }}>Log a Meal</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "var(--sp-3)" }}>
              <input
                placeholder="Meal name (e.g., Oatmeal with berries)"
                value={newMeal.name}
                onChange={e => setNewMeal({ ...newMeal, name: e.target.value })}
                style={{ padding: "var(--sp-2)", borderRadius: "var(--r)", border: "1px solid var(--border)" }}
              />
              <input
                placeholder="Description (optional)"
                value={newMeal.description}
                onChange={e => setNewMeal({ ...newMeal, description: e.target.value })}
                style={{ padding: "var(--sp-2)", borderRadius: "var(--r)", border: "1px solid var(--border)" }}
              />
              <input
                placeholder="Calories (optional)"
                type="number"
                value={newMeal.nutrients?.calories || ''}
                onChange={e => setNewMeal({ 
                  ...newMeal, 
                  nutrients: { ...newMeal.nutrients, calories: parseInt(e.target.value) || 0 }
                })}
                style={{ padding: "var(--sp-2)", borderRadius: "var(--r)", border: "1px solid var(--border)" }}
              />
              <input
                placeholder="Protein (g) - optional"
                type="number"
                value={newMeal.nutrients?.protein || ''}
                onChange={e => setNewMeal({ 
                  ...newMeal, 
                  nutrients: { ...newMeal.nutrients, protein: parseInt(e.target.value) || 0 }
                })}
                style={{ padding: "var(--sp-2)", borderRadius: "var(--r)", border: "1px solid var(--border)" }}
              />
              <div style={{ display: "flex", gap: "var(--gap-md)", marginTop: "var(--sp-3)" }}>
                <button onClick={() => setShowMealModal(false)} className="btn-tap" style={{ flex: 1, padding: "var(--sp-3)" }}>
                  Cancel
                </button>
                <button onClick={logMeal} className="btn-tap" style={{ flex: 1, padding: "var(--sp-3)", background: "var(--sg)", color: "#fff", border: "none", borderRadius: "var(--r)" }}>
                  Save Meal
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Swap Modal */}
      {showSwapModal && swapOption && (
        <div
          className="reveal-in"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0,0,0,0.5)",
            backdropFilter: "blur(4px)",
            zIndex: 2000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "var(--pad-x)"
          }}
          onClick={e => e.target === e.currentTarget && setShowSwapModal(false)}
        >
          <div style={{ background: "var(--card)", borderRadius: "var(--r2)", maxWidth: 400, width: "100%", padding: "var(--sp-5)" }}>
            <h3 style={{ marginBottom: "var(--sp-3)" }}>Swap {typeof selectedMealItem === 'string' ? selectedMealItem : selectedMealItem?.name}</h3>
            <div style={{ marginBottom: "var(--sp-4)" }}>
              <p style={{ fontWeight: 700 }}>{swapOption.name}</p>
              <p style={{ fontSize: "var(--fs-xs)", color: "var(--mt)" }}>{swapOption.prep}</p>
              {swapOption.alternatives && (
                <Tag label={`Options: ${swapOption.alternatives}`} bg="var(--bll)" tc="var(--bl)" />
              )}
            </div>
            <div style={{ display: "flex", gap: "var(--gap-md)" }}>
              <button onClick={() => setShowSwapModal(false)} className="btn-tap" style={{ flex: 1, padding: "var(--sp-3)" }}>
                Cancel
              </button>
              <button onClick={handleApplySwap} className="btn-tap" style={{ flex: 1, padding: "var(--sp-3)", background: "var(--sg)", color: "#fff", border: "none", borderRadius: "var(--r)" }}>
                Save Swap
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}