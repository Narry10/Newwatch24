// components/AnalyticsTracker.tsx
'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { getFirebaseAnalytics } from '@/configs/firebase';
import { logEvent, setUserProperties } from 'firebase/analytics';

export default function AnalyticsTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    let mounted = true;

    // Khởi tạo Firebase Analytics
    (async () => {
      const analytics = await getFirebaseAnalytics();
      if (!analytics || !mounted) return;

      // Gửi user_properties cơ bản (Firebase sẽ tự đoán country theo IP)
      try {
        const lang = navigator.language || '';
        const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
        const sr = `${window.screen?.width ?? ''}x${window.screen?.height ?? ''}`;

        setUserProperties(analytics, {
          app_lang: lang,
          app_tz: tz,
          screen_res: sr,
        });
      } catch {
        // ignore
      }

      // Gửi page_view đầu tiên
      logEvent(analytics, 'page_view', {
        page_path: window.location.pathname + window.location.search,
        page_title: document.title,
        page_location: window.location.href,
      });
    })();

    return () => {
      mounted = false;
    };
  }, []);

  // Gửi page_view mỗi khi pathname hoặc query thay đổi
  useEffect(() => {
    (async () => {
      const analytics = await getFirebaseAnalytics();
      if (!analytics) return;

      logEvent(analytics, 'page_view', {
        page_path: `${pathname}${searchParams?.toString() ? `?${searchParams}` : ''}`,
        page_title: document.title,
        page_location: window.location.href,
      });
    })();
  }, [pathname, searchParams]);

  return null;
}

