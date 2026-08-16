// src/services/userService.js
import { db, auth } from '../context/firebase';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';

export async function getUserProfile() {
  const user = auth.currentUser;
  if (!user) return null;

  const userRef = doc(db, 'users', user.uid);
  const userSnap = await getDoc(userRef);
  
  if (userSnap.exists()) {
    return userSnap.data();
  } else {
    // Create profile from local storage data
    const newProfile = {
      name: localStorage.getItem('userName') || user.displayName || user.email.split('@')[0],
      email: user.email,
      createdAt: new Date(),
      journeyType: localStorage.getItem('userJourney') || null,
      culture: localStorage.getItem('userCulture') || null,
      edd: localStorage.getItem('pregnancyEdd') || null,
      babyAgeDays: (() => { const v = localStorage.getItem('babyAgeDays'); return v !== null ? parseInt(v, 10) : null; })(),
      cycleLength: (() => { const v = localStorage.getItem('cycleLength'); return v !== null ? parseInt(v, 10) : null; })(),
      periodLength: (() => { const v = localStorage.getItem('periodLength'); return v !== null ? parseInt(v, 10) : null; })(),
      lastPeriodStart: localStorage.getItem('lastPeriodStart') || null,
      // plan / subscriptionPlan intentionally NOT set here — firestore.rules
      // blocks the client from writing these fields (billing/privilege),
      // and would reject this entire setDoc if included. Missing plan
      // already falls back to free/trial in AppContext.jsx / Profile.jsx.
      // A backend Function stamps the real value once Stripe is wired.
      messageCount: 0,
      lastActive: new Date()
    };
    await setDoc(userRef, newProfile);
    return newProfile;
  }
}

// Fields only a trusted backend (Cloud Function via Admin SDK) may set.
// Stripped here so a caller passing one of these gets a clear console
// warning instead of an opaque Firestore permission-denied at the rules
// layer. Keep this list in sync with the locked-field list in firestore.rules.
const LOCKED_FIELDS = ['plan', 'subscriptionPlan', 'role', 'isAdmin'];

export async function updateUserProfile(data) {
  const user = auth.currentUser;
  if (!user) return;

  const attempted = LOCKED_FIELDS.filter((key) => key in data);
  if (attempted.length > 0) {
    console.warn(
      `[Femin9] updateUserProfile: dropping client write to locked field(s) [${attempted.join(', ')}] — these are backend-only (see firestore.rules).`
    );
  }
  const safeData = { ...data };
  LOCKED_FIELDS.forEach((key) => delete safeData[key]);

  const userRef = doc(db, 'users', user.uid);
  await updateDoc(userRef, { ...safeData, updatedAt: new Date() });
}

export async function updateJourneyType(journey) {
  await updateUserProfile({ journeyType: journey });
  localStorage.setItem('userJourney', journey);
}