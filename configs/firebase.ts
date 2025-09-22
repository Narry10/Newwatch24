// configs/firebase.ts - Client-side Firebase config
'use client';

import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { getAnalytics, isSupported, Analytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase app
let app: FirebaseApp;

try {
  app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
} catch (error) {
  console.error('Firebase initialization failed:', error);
  throw error;
}

// Initialize Analytics
let analytics: Analytics | null = null;

// Function to initialize analytics safely
export const getFirebaseAnalytics = async (): Promise<Analytics | null> => {
  // Only run on client side
  if (typeof window === 'undefined') {
    return null;
  }

  // Return existing instance if already initialized
  if (analytics) {
    return analytics;
  }

  try {
    // Check if Analytics is supported in this environment
    const supported = await isSupported();
    
    if (supported && firebaseConfig.measurementId) {
      analytics = getAnalytics(app);
      console.log('Firebase Analytics initialized with measurement ID:', firebaseConfig.measurementId);
      return analytics;
    } else {
      console.warn('Firebase Analytics not supported or missing measurement ID');
      return null;
    }
  } catch (error) {
    console.error('Firebase Analytics initialization failed:', error);
    return null;
  }
};

export { app };
export default app;