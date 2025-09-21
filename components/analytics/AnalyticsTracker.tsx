'use client';

import { useEffect } from 'react';

// Extend Window interface for Google Analytics
declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

export default function AnalyticsTracker() {
  useEffect(() => {
    // Only load analytics in production and on client side
    if (typeof window !== 'undefined' && process.env.NODE_ENV === 'production') {
      const gaId = process.env.NEXT_PUBLIC_GA_ID;
      const firebaseMeasurementId = process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID;
      
      // Check if we have a valid GA ID or Firebase Measurement ID
      if (!gaId && !firebaseMeasurementId) {
        console.warn('No analytics ID found. Please set NEXT_PUBLIC_GA_ID or NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID');
        return;
      }

      try {
        // Use Firebase Measurement ID if available, otherwise fallback to GA ID
        const analyticsId = firebaseMeasurementId || gaId;
        
        // Google Analytics 4 / Firebase Analytics
        const script = document.createElement('script');
        script.src = `https://www.googletagmanager.com/gtag/js?id=${analyticsId}`;
        script.async = true;
        document.head.appendChild(script);

        window.dataLayer = window.dataLayer || [];
        const gtag = (...args: any[]) => {
          window.dataLayer.push(args);
        };
        window.gtag = gtag;
        
        gtag('js', new Date());
        gtag('config', analyticsId, {
          // Enhanced ecommerce and user engagement
          send_page_view: true,
          // Firebase Analytics specific configs
          allow_ad_personalization_signals: true,
          allow_google_signals: true,
        });

        // Initialize Firebase Analytics if we're using Firebase
        if (firebaseMeasurementId) {
          // Import Firebase Analytics dynamically to avoid SSR issues
          import('@/configs/firebase').then(({ analytics }) => {
            if (analytics) {
              console.log('Firebase Analytics initialized');
            }
          }).catch(err => {
            console.warn('Firebase Analytics initialization failed:', err);
          });
        }

        console.log(`Analytics initialized with ID: ${analyticsId}`);
      } catch (error) {
        console.warn('Analytics initialization failed:', error);
      }
    }
  }, []);

  return null;
}