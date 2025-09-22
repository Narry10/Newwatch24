// hooks/useAnalytics.js
'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

// Track page views
export const usePageView = () => {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('config', process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || process.env.NEXT_PUBLIC_GA_ID, {
        page_path: pathname,
      });
    }
  }, [pathname]);
};

// Track custom events
export const trackEvent = (eventName, parameters) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, parameters);
  }
};

// Common event trackers
export const trackClick = (element, url) => {
  trackEvent('click', {
    event_category: 'engagement',
    event_label: element,
    page_location: url || window.location.href,
  });
};

export const trackShare = (method, content_type, item_id) => {
  trackEvent('share', {
    method,
    content_type,
    item_id,
  });
};

export const trackSearch = (search_term) => {
  trackEvent('search', {
    search_term,
  });
};