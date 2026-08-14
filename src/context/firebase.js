// /src/context/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { initializeAppCheck, ReCaptchaEnterpriseProvider } from 'firebase/app-check';

const firebaseConfig = {
  apiKey: "AIzaSyCSWfGltSa8GCn3rJl-YIkL9rH6G_6z-Cw",
  authDomain: "femin9-womens-health.firebaseapp.com",
  projectId: "femin9-womens-health",
  storageBucket: "femin9-womens-health.firebasestorage.app",
  messagingSenderId: "520840377156",
  appId: "1:520840377156:web:4f73b71b4217ed986bdd11"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

if (import.meta.env.DEV) {
  self.FIREBASE_APPCHECK_DEBUG_TOKEN =
    import.meta.env.VITE_FIREBASE_APPCHECK_DEBUG_TOKEN || true;
}

initializeAppCheck(app, {
  provider: new ReCaptchaEnterpriseProvider('6LcnMoQtAAAAACRRrOaEG6YqEeCJas5-Q86rHuJ5'),
  isTokenAutoRefreshEnabled: true,
});

const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// Export everything including app
export { auth, db, storage, app }; 

