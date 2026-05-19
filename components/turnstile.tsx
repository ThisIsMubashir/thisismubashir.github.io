'use client';

import Script from 'next/script';
import { useEffect, useRef, useState } from 'react';

/**
 * Cloudflare Turnstile widget for the contact form.
 *
 * Renders only when `NEXT_PUBLIC_TURNSTILE_SITE_KEY` is set, otherwise returns
 * null and the form falls back to honeypot-only spam protection. Formspree
 * automatically validates the `cf-turnstile-response` field on the server side
 * when Turnstile is enabled in your Formspree project settings.
 *
 * Get a free site key (10k requests/mo) at https://dash.cloudflare.com → Turnstile.
 */

declare global {
  interface Window {
    turnstile?: {
      render: (el: HTMLElement, opts: Record<string, unknown>) => string;
      remove: (widgetId: string) => void;
      reset: (widgetId: string) => void;
    };
    __onTurnstileLoad?: () => void;
  }
}

export function Turnstile({ theme = 'auto' }: { theme?: 'auto' | 'light' | 'dark' }) {
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetId = useRef<string | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!siteKey || !ready || !containerRef.current || !window.turnstile) return;
    widgetId.current = window.turnstile.render(containerRef.current, {
      sitekey: siteKey,
      theme,
      'response-field-name': 'cf-turnstile-response',
    });
    const id = widgetId.current;
    return () => {
      if (id && window.turnstile) window.turnstile.remove(id);
    };
  }, [siteKey, theme, ready]);

  if (!siteKey) return null;

  return (
    <>
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js?onload=__onTurnstileLoad&render=explicit"
        strategy="afterInteractive"
        onLoad={() => {
          window.__onTurnstileLoad = () => setReady(true);
          // If onload callback already fired before we set the handler
          if (window.turnstile) setReady(true);
        }}
      />
      <div ref={containerRef} aria-label="Spam protection challenge" />
    </>
  );
}
