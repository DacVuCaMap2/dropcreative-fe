// src/types/google-analytics.d.ts
declare global {
    interface Window {
      gtag: (
        command: 'config' | 'event',
        targetId: string,
        config?: Record<string, any>
      ) => void;
      dataLayer: any[];
    }
  }
  
  // src/components/GoogleAnalytics.tsx
  'use client';
  
  import Script from 'next/script';
  import { usePathname, useSearchParams } from 'next/navigation';
  import { useEffect } from 'react';
  
  interface Props {
    GA_MEASUREMENT_ID: string;
  }
  
  export default function GoogleAnalytics({ GA_MEASUREMENT_ID }: Props) {
    const pathname = usePathname();
    const searchParams = useSearchParams();
  
    useEffect(() => {
      const url = pathname + searchParams.toString();
      
      if (typeof window.gtag !== 'undefined') {
        window.gtag('config', GA_MEASUREMENT_ID, {
          page_path: url,
        });
      }
    }, [pathname, searchParams, GA_MEASUREMENT_ID]);
  
    return (
      <>
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_MEASUREMENT_ID}', {
                page_path: '${pathname}',
              });
            `,
          }}
        />
      </>
    );
  }
  
  // Utility function để track events
  export const trackEvent = (
    eventName: string,
    eventParams: Record<string, any>
  ) => {
    if (typeof window.gtag !== 'undefined') {
      window.gtag('event', eventName, eventParams);
    }
  };