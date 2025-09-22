"use client";

// Extend Window interface for Google Analytics
declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

type EventParams = Record<string, string | number | boolean | null | undefined>;

// Fallback to gtag if Firebase analytics is not available
const trackWithGtag = (eventName: string, params?: EventParams) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, params);
  }
};

export async function logAnalyticsEvent(eventName: string, params?: EventParams) {
  if (typeof window === "undefined") return;
  
  try {
    // Try Firebase Analytics first
    const { getFirebaseAnalytics } = await import("@/configs/firebase");
    const analytics = await getFirebaseAnalytics();
    if (analytics) {
      const { logEvent } = await import("firebase/analytics");
      logEvent(analytics, eventName, params);
      return;
    }
  } catch (error) {
    console.warn('Firebase Analytics not available, falling back to gtag:', error);
  }
  
  // Fallback to gtag
  trackWithGtag(eventName, params);
}

export async function setAnalyticsUserId(userId: string) {
  if (typeof window === "undefined") return;
  
  try {
    const { getFirebaseAnalytics } = await import("@/configs/firebase");
    const analytics = await getFirebaseAnalytics();
    if (analytics) {
      const { setUserId } = await import("firebase/analytics");
      setUserId(analytics, userId);
      return;
    }
  } catch (error) {
    console.warn('Firebase Analytics not available for setUserId:', error);
  }
  
  // Fallback to gtag
  if (window.gtag) {
    window.gtag('config', process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || process.env.NEXT_PUBLIC_GA_ID, {
      user_id: userId
    });
  }
}

export async function setAnalyticsUserProperties(properties: Record<string, string>) {
  if (typeof window === "undefined") return;
  
  try {
    const { getFirebaseAnalytics } = await import("@/configs/firebase");
    const analytics = await getFirebaseAnalytics();
    if (analytics) {
      const { setUserProperties } = await import("firebase/analytics");
      setUserProperties(analytics, properties);
      return;
    }
  } catch (error) {
    console.warn('Firebase Analytics not available for setUserProperties:', error);
  }
  
  // Fallback to gtag
  if (window.gtag) {
    window.gtag('config', process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || process.env.NEXT_PUBLIC_GA_ID, {
      custom_map: properties
    });
  }
}

// Common blog events
export const blogEvents = {
  viewPost: (postId: string, postTitle: string, category?: string) => {
    logAnalyticsEvent('view_item', {
      item_id: postId,
      item_name: postTitle,
      item_category: category,
      content_type: 'blog_post',
    });
  },
  
  sharePost: (postId: string, method: string) => {
    logAnalyticsEvent('share', {
      method: method,
      content_type: 'blog_post',
      item_id: postId,
    });
  },
  
  searchPosts: (searchTerm: string) => {
    logAnalyticsEvent('search', {
      search_term: searchTerm,
    });
  },
  
  viewCategory: (categoryName: string) => {
    logAnalyticsEvent('view_item_list', {
      item_list_id: 'categories',
      item_list_name: categoryName,
    });
  },
};


