// src/context/AppContext.jsx
import { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { initializeFoodDatabase } from '../data/foods';
import { lsGet, lsSet } from '../utils/storage';
import { getUserProfile, updateUserProfile, updateJourneyType } from '../services/userService';

// ─── Constants ──────────────────────────────────────────────────────────────
const JOURNEY_TYPES = ['pregnant', 'conceive', 'ivf', 'mom', 'menstrual', 'menopause'];
const DEFAULT_JOURNEY = 'pregnant';
const PLAN_TYPES = { FREE: 'free', PLUS: 'plus' };

// ─── Context ─────────────────────────────────────────────────────────────────
const AppContext = createContext(null);

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}

// ─── Provider ─────────────────────────────────────────────────────────────────
export function AppProvider({ children }) {
  // ── Auth state ──────────────────────────────────────────────────────────
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authReady, setAuthReady] = useState(false);
  const [error, setError] = useState(null);

  // ── User data ────────────────────────────────────────────────────────────
  const [userName, setUserName] = useState(() => lsGet('userName', ''));
  const [journeyType, setJourneyType] = useState(() => lsGet('userJourney', DEFAULT_JOURNEY));
  const [culture, setCulture] = useState(() => lsGet('userCulture', 'west_central_african'));
  const [dietaryPractices, setDietaryPractices] = useState(() => lsGet('dietaryPractices', []));
  const [hasDietaryPractices, setHasDietaryPractices] = useState(() => lsGet('hasDietaryPractices', null));
  const [religion, setReligion] = useState(() => lsGet('religion', null));
  const [subscriptionPlan, setSubscriptionPlan] = useState(() => lsGet('subscriptionPlan', PLAN_TYPES.FREE));

  // ── Pregnancy data ──────────────────────────────────────────────────────
  const [edd, setEdd] = useState(() => lsGet('pregnancyEdd', null));
  const [babyNumber, setBabyNumber] = useState(() => lsGet('babyNumber', null));
  const [babyAgeDays, setBabyAgeDays] = useState(() => {
    const stored = lsGet('babyAgeDays', null);
    return stored !== null ? parseInt(stored, 10) : null;
  });
  const [babyBirthDate, setBabyBirthDate] = useState(() => lsGet('babyBirthDate', null));
  const [feedingMethod, setFeedingMethod] = useState(() => lsGet('feedingMethod', null));

  // ── TTC data ─────────────────────────────────────────────────────────────
  const [cycleLength, setCycleLength] = useState(() => {
    const stored = lsGet('cycleLength', null);
    return stored !== null ? parseInt(stored, 10) : 28;
  });
  const [periodLength, setPeriodLength] = useState(() => {
    const stored = lsGet('periodLength', null);
    return stored !== null ? parseInt(stored, 10) : 5;
  });
  const [lastPeriodStart, setLastPeriodStart] = useState(() => lsGet('lastPeriodStart', null));
  const [cycleDay, setCycleDay] = useState(() => {
    const stored = lsGet('cycleDay', null);
    return stored !== null ? parseInt(stored, 10) : 1;
  });

  // ── IVF data ─────────────────────────────────────────────────────────────
  const [treatmentType, setTreatmentType] = useState(() => lsGet('treatmentType', null));
  const [ivfCycleNumber, setIvfCycleNumber] = useState(() => lsGet('ivfCycleNumber', null));

  // ── Menopause data ───────────────────────────────────────────────────────
  const [menopauseStage, setMenopauseStage] = useState(() => lsGet('menopauseStage', null));
  const [menopauseSymptoms, setMenopauseSymptoms] = useState(() => lsGet('menopauseSymptoms', []));

  // ── UI state ─────────────────────────────────────────────────────────────
  const [activeTab, setActiveTab] = useState(() => lsGet('activeTab', 'home')); // ADD THIS
  const [showSOS, setShowSOS] = useState(false);
  const [theme, setTheme] = useState(() => lsGet('theme', 'light'));
  const [notificationsEnabled, setNotificationsEnabled] = useState(() => lsGet('notificationsEnabled', true));

  // ── Food database state ──────────────────────────────────────────────────
  const [foodDbReady, setFoodDbReady] = useState(false);
  const [foodDbReport, setFoodDbReport] = useState(null);
  const [foodDbError, setFoodDbError] = useState(null);

  // ─── Initialize Food Database ────────────────────────────────────────────
  useEffect(() => {
    if (!foodDbReady) {
      try {
        console.log('🍽️ Initializing food database...');
        const result = initializeFoodDatabase();
        setFoodDbReady(true);

        if (result.migrated) {
          console.log('✅ Food database migrated:', result.report);
          setFoodDbReport(result.report);

          // Log warnings if there are issues
          if (result.report.unmatchedGuidanceEntries?.length > 0) {
            console.warn('⚠️ Unmatched guidance entries:', result.report.unmatchedGuidanceEntries);
          }
          if (result.report.unmappedNutrients?.length > 0) {
            console.warn('⚠️ Unmapped nutrients:', result.report.unmappedNutrients);
          }
        } else if (result.error) {
          console.warn('⚠️ Food database migration had issues:', result.error);
          setFoodDbError(result.error);
        } else {
          console.log('✅ Food database already up to date.');
        }
      } catch (err) {
        console.error('❌ Food database initialization failed:', err);
        setFoodDbError(err.message);
        setFoodDbReady(true); // Still mark as ready to prevent infinite loop
      }
    }
  }, [foodDbReady]);

  // Save activeTab to localStorage
  useEffect(() => {
    lsSet('activeTab', activeTab);
  }, [activeTab]);

  // ─── Auth listener ────────────────────────────────────────────────────────
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
      setLoading(true);
      try {
        if (authUser) {
          setUser(authUser);

          // Load user profile from Firestore
          const profile = await getUserProfile();
          if (profile) {
            setUserName(profile.name || authUser.displayName || authUser.email?.split('@')[0] || '');
            setJourneyType(profile.journeyType || lsGet('userJourney', DEFAULT_JOURNEY));
            setCulture(profile.culture || lsGet('userCulture', 'west_central_african'));
            setSubscriptionPlan(profile.plan || lsGet('subscriptionPlan', PLAN_TYPES.FREE));

            if (profile.edd) setEdd(profile.edd);
            if (profile.babyAgeDays !== undefined) setBabyAgeDays(profile.babyAgeDays);
            if (profile.babyBirthDate) setBabyBirthDate(profile.babyBirthDate);
            if (profile.cycleLength) setCycleLength(profile.cycleLength);
            if (profile.periodLength) setPeriodLength(profile.periodLength);
            if (profile.lastPeriodStart) setLastPeriodStart(profile.lastPeriodStart);
            if (profile.cycleDay) setCycleDay(profile.cycleDay);
            if (profile.dietaryPractices) setDietaryPractices(profile.dietaryPractices);
            if (profile.hasDietaryPractices) setHasDietaryPractices(profile.hasDietaryPractices);
            if (profile.religion) setReligion(profile.religion);
            if (profile.babyNumber) setBabyNumber(profile.babyNumber);
            if (profile.feedingMethod) setFeedingMethod(profile.feedingMethod);
            if (profile.treatmentType) setTreatmentType(profile.treatmentType);
            if (profile.ivfCycleNumber) setIvfCycleNumber(profile.ivfCycleNumber);
            if (profile.menopauseStage) setMenopauseStage(profile.menopauseStage);
            if (profile.menopauseSymptoms) setMenopauseSymptoms(profile.menopauseSymptoms);
          }
        } else {
          setUser(null);
          // Load from localStorage as fallback
          setUserName(lsGet('userName', ''));
          setJourneyType(lsGet('userJourney', DEFAULT_JOURNEY));
          setCulture(lsGet('userCulture', 'west_central_african'));
          setSubscriptionPlan(lsGet('subscriptionPlan', PLAN_TYPES.FREE));
        }
      } catch (err) {
        console.error('Auth error:', err);
        setError(err.message);
      } finally {
        setLoading(false);
        setAuthReady(true);
      }
    });

    return () => unsubscribe();
  }, []);

  // ─── Save user data to localStorage ──────────────────────────────────────
  useEffect(() => {
    if (userName) lsSet('userName', userName);
  }, [userName]);

  useEffect(() => {
    lsSet('userJourney', journeyType);
  }, [journeyType]);

  useEffect(() => {
    lsSet('userCulture', culture);
  }, [culture]);

  useEffect(() => {
    lsSet('dietaryPractices', dietaryPractices);
  }, [dietaryPractices]);

  useEffect(() => {
    if (hasDietaryPractices) lsSet('hasDietaryPractices', hasDietaryPractices);
  }, [hasDietaryPractices]);

  useEffect(() => {
    if (religion) lsSet('religion', religion);
  }, [religion]);

  useEffect(() => {
    lsSet('subscriptionPlan', subscriptionPlan);
  }, [subscriptionPlan]);

  useEffect(() => {
    if (edd) lsSet('pregnancyEdd', edd);
  }, [edd]);

  useEffect(() => {
    if (babyNumber) lsSet('babyNumber', babyNumber);
  }, [babyNumber]);

  useEffect(() => {
    if (feedingMethod) lsSet('feedingMethod', feedingMethod);
  }, [feedingMethod]);

  useEffect(() => {
    if (treatmentType) lsSet('treatmentType', treatmentType);
  }, [treatmentType]);

  useEffect(() => {
    if (ivfCycleNumber) lsSet('ivfCycleNumber', ivfCycleNumber);
  }, [ivfCycleNumber]);

  useEffect(() => {
    if (menopauseStage) lsSet('menopauseStage', menopauseStage);
  }, [menopauseStage]);

  useEffect(() => {
    lsSet('menopauseSymptoms', menopauseSymptoms);
  }, [menopauseSymptoms]);

  useEffect(() => {
    if (babyAgeDays !== null) lsSet('babyAgeDays', babyAgeDays.toString());
  }, [babyAgeDays]);

  useEffect(() => {
    if (babyBirthDate) lsSet('babyBirthDate', babyBirthDate);
  }, [babyBirthDate]);

  useEffect(() => {
    if (cycleLength) lsSet('cycleLength', cycleLength.toString());
  }, [cycleLength]);

  useEffect(() => {
    if (periodLength) lsSet('periodLength', periodLength.toString());
  }, [periodLength]);

  useEffect(() => {
    if (lastPeriodStart) lsSet('lastPeriodStart', lastPeriodStart);
  }, [lastPeriodStart]);

  useEffect(() => {
    if (cycleDay !== null) lsSet('cycleDay', cycleDay.toString());
  }, [cycleDay]);

  // ─── Computed values ──────────────────────────────────────────────────────

  const getCurrentWeek = useCallback(() => {
    if (journeyType !== 'pregnant') return null;

    if (edd) {
      const dueDate = new Date(edd);
      const today = new Date();
      const diffTime = dueDate - today;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      const weeks = 40 - Math.floor(diffDays / 7);
      return Math.max(0, Math.min(40, weeks));
    }

    if (babyAgeDays !== null && babyAgeDays > 0) {
      // Postpartum - use baby age
      return Math.floor(babyAgeDays / 7);
    }

    return null;
  }, [journeyType, edd, babyAgeDays]);

  const getTrimester = useCallback(() => {
    const week = getCurrentWeek();
    if (!week) return null;
    if (week <= 13) return 1;
    if (week <= 27) return 2;
    return 3;
  }, [getCurrentWeek]);

  const getJourneyDisplay = useCallback(() => {
    const labels = {
      pregnant: 'Pregnancy',
      conceive: 'Trying to Conceive',
      ivf: 'IVF & Fertility',
      mom: 'Motherhood',
      menstrual: 'Menstrual Health',
      menopause: 'Menopause'
    };
    return labels[journeyType] || 'Pregnancy';
  }, [journeyType]);

  const getJourneyIcon = useCallback(() => {
    const icons = {
      pregnant: '🤰',
      conceive: '💞',
      ivf: '🔬',
      mom: '🤱',
      menstrual: '🌙',
      menopause: '🌿'
    };
    return icons[journeyType] || '🌸';
  }, [journeyType]);

  // ─── AI Message Limit ──────────────────────────────────────────────────────

  const getAiMessageLimit = useCallback(() => {
    if (subscriptionPlan === PLAN_TYPES.PLUS) return Infinity;
    return 20; // Free tier: 20 messages per day
  }, [subscriptionPlan]);

  // ─── Update Functions ─────────────────────────────────────────────────────

  const updateProfile = useCallback(async (data) => {
    try {
      if (user) {
        await updateUserProfile(data);
      }

      // Update local state
      if (data.name !== undefined) setUserName(data.name);
      if (data.journeyType !== undefined) {
        setJourneyType(data.journeyType);
        lsSet('userJourney', data.journeyType);
      }
      if (data.culture !== undefined) {
        setCulture(data.culture);
        lsSet('userCulture', data.culture);
      }
      if (data.edd !== undefined) setEdd(data.edd);
      if (data.babyAgeDays !== undefined) setBabyAgeDays(data.babyAgeDays);
      if (data.babyBirthDate !== undefined) setBabyBirthDate(data.babyBirthDate);
      if (data.cycleLength !== undefined) setCycleLength(data.cycleLength);
      if (data.periodLength !== undefined) setPeriodLength(data.periodLength);
      if (data.lastPeriodStart !== undefined) setLastPeriodStart(data.lastPeriodStart);
      if (data.cycleDay !== undefined) setCycleDay(data.cycleDay);
      if (data.dietaryPractices !== undefined) setDietaryPractices(data.dietaryPractices);
      if (data.hasDietaryPractices !== undefined) setHasDietaryPractices(data.hasDietaryPractices);
      if (data.religion !== undefined) setReligion(data.religion);
      if (data.babyNumber !== undefined) setBabyNumber(data.babyNumber);
      if (data.feedingMethod !== undefined) setFeedingMethod(data.feedingMethod);
      if (data.treatmentType !== undefined) setTreatmentType(data.treatmentType);
      if (data.ivfCycleNumber !== undefined) setIvfCycleNumber(data.ivfCycleNumber);
      if (data.menopauseStage !== undefined) setMenopauseStage(data.menopauseStage);
      if (data.menopauseSymptoms !== undefined) setMenopauseSymptoms(data.menopauseSymptoms);
      if (data.plan !== undefined) setSubscriptionPlan(data.plan);

      return true;
    } catch (err) {
      console.error('Failed to update profile:', err);
      setError(err.message);
      return false;
    }
  }, [user]);

  const switchJourney = useCallback(async (newJourney) => {
    if (!JOURNEY_TYPES.includes(newJourney)) {
      console.warn(`Invalid journey type: ${newJourney}`);
      return false;
    }

    try {
      if (user) {
        await updateJourneyType(newJourney);
      }
      setJourneyType(newJourney);
      lsSet('userJourney', newJourney);
      return true;
    } catch (err) {
      console.error('Failed to switch journey:', err);
      setError(err.message);
      return false;
    }
  }, [user]);

  const toggleTheme = useCallback(() => {
    setTheme(prev => {
      const next = prev === 'light' ? 'dark' : 'light';
      lsSet('theme', next);
      document.documentElement.setAttribute('data-theme', next);
      return next;
    });
  }, []);

  // ─── SOS ──────────────────────────────────────────────────────────────────

  const triggerSOS = useCallback(() => {
    setShowSOS(true);
  }, []);

  const dismissSOS = useCallback(() => {
    setShowSOS(false);
  }, []);

  // ─── Context value ────────────────────────────────────────────────────────

  const value = useMemo(() => ({
    // Auth
    user,
    loading,
    authReady,
    error,
    setError,

    // User data
    userName,
    setUserName,
    journeyType,
    setJourneyType: switchJourney,
    culture,
    setCulture,
    dietaryPractices,
    setDietaryPractices,
    hasDietaryPractices,
    setHasDietaryPractices,
    religion,
    setReligion,
    subscriptionPlan,
    setSubscriptionPlan,

    // Pregnancy data
    edd,
    setEdd,
    babyNumber,
    setBabyNumber,
    babyAgeDays,
    setBabyAgeDays,
    babyBirthDate,
    setBabyBirthDate,
    feedingMethod,
    setFeedingMethod,

    // TTC data
    cycleLength,
    setCycleLength,
    periodLength,
    setPeriodLength,
    lastPeriodStart,
    setLastPeriodStart,
    cycleDay,
    setCycleDay,

    // IVF data
    treatmentType,
    setTreatmentType,
    ivfCycleNumber,
    setIvfCycleNumber,

    // Menopause data
    menopauseStage,
    setMenopauseStage,
    menopauseSymptoms,
    setMenopauseSymptoms,

    // Computed
    getCurrentWeek,
    getTrimester,
    getJourneyDisplay,
    getJourneyIcon,
    getAiMessageLimit,

    // Food database
    foodDbReady,
    foodDbReport,
    foodDbError,

    // UI
    activeTab,           // ADD THIS
    setActiveTab,        // ADD THIS
    theme,
    toggleTheme,
    showSOS,
    triggerSOS,
    dismissSOS,
    notificationsEnabled,
    setNotificationsEnabled,

    // Profile
    updateProfile,
    switchJourney,

    // Constants
    JOURNEY_TYPES,
    PLAN_TYPES,

  }), [
    user,
    loading,
    authReady,
    error,
    userName,
    journeyType,
    culture,
    dietaryPractices,
    hasDietaryPractices,
    religion,
    subscriptionPlan,
    edd,
    babyNumber,
    babyAgeDays,
    babyBirthDate,
    feedingMethod,
    cycleLength,
    periodLength,
    lastPeriodStart,
    cycleDay,
    treatmentType,
    ivfCycleNumber,
    menopauseStage,
    menopauseSymptoms,
    getCurrentWeek,
    getTrimester,
    getJourneyDisplay,
    getJourneyIcon,
    getAiMessageLimit,
    foodDbReady,
    foodDbReport,
    foodDbError,
    activeTab,           // ADD THIS
    theme,
    toggleTheme,
    showSOS,
    triggerSOS,
    dismissSOS,
    notificationsEnabled,
    updateProfile,
    switchJourney,
  ]);

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

export default AppContext;