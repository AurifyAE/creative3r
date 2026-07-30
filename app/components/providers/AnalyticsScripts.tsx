'use client';

import Script from 'next/script';
import { useEffect, useState } from 'react';

const GA_MEASUREMENT_ID = 'G-LDBT899MEC';
const META_PIXEL_ID = '1329244318974974';

/**
 * How long to wait before loading the tags if the visitor never interacts.
 * Raise it to shed more blocking time, lower it to capture very short visits.
 */
const IDLE_FALLBACK_MS = 5000;

const INTERACTION_EVENTS = ['pointerdown', 'keydown', 'touchstart', 'scroll', 'wheel'] as const;

/**
 * GA4 + Meta Pixel, loaded on the visitor's first interaction (or after a short
 * idle fallback). Together the two tags are ~270 KB and close to a second of
 * script evaluation; running them on the initial load put all of that inside
 * the page's blocking-time window.
 */
export default function AnalyticsScripts() {
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    const load = () => {
      clearTimeout(timer);
      INTERACTION_EVENTS.forEach((event) => window.removeEventListener(event, load));
      setShouldLoad(true);
    };

    INTERACTION_EVENTS.forEach((event) =>
      window.addEventListener(event, load, { once: true, passive: true })
    );
    timer = setTimeout(load, IDLE_FALLBACK_MS);

    return () => {
      clearTimeout(timer);
      INTERACTION_EVENTS.forEach((event) => window.removeEventListener(event, load));
    };
  }, []);

  if (!shouldLoad) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="gtag-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}');
        `}
      </Script>
      {/* Meta Pixel */}
      <Script id="meta-pixel" strategy="afterInteractive">
        {`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '${META_PIXEL_ID}');
          fbq('track', 'PageView');
        `}
      </Script>
    </>
  );
}
