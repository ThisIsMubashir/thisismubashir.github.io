import Script from 'next/script';

/**
 * Privacy-friendly analytics via Plausible. Only renders when the
 * `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` env var is set — otherwise this is a no-op,
 * which means no cookie banner is needed, no PII is captured, and the site
 * stays GDPR-clean by default.
 *
 * Swap the `src` for `data.cloudflareinsights.com/beacon.min.js` and the
 * Cloudflare ID if you prefer Cloudflare Web Analytics.
 */
export function Analytics() {
  const domain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
  if (!domain) return null;
  return (
    <Script
      defer
      data-domain={domain}
      src="https://plausible.io/js/script.js"
      strategy="afterInteractive"
    />
  );
}
