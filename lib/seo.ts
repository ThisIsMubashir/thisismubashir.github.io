import type { Metadata } from 'next';
import { siteConfig } from './utils';

interface SeoOptions {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
}

/**
 * Builds Next.js Metadata for a page with sensible defaults pulled from siteConfig.
 * Use in `generateMetadata` or top-level `metadata` exports.
 */
export function buildMetadata({
  title,
  description = siteConfig.description,
  path = '/',
  image = '/og-default.png',
}: SeoOptions = {}): Metadata {
  const pageTitle = title ? `${title} — ${siteConfig.shortName}` : siteConfig.title;
  const url = new URL(path, siteConfig.url).toString();

  return {
    title: pageTitle,
    description,
    metadataBase: new URL(siteConfig.url),
    alternates: { canonical: url },
    openGraph: {
      type: 'website',
      url,
      title: pageTitle,
      description,
      siteName: siteConfig.shortName,
      images: [{ url: image, width: 1200, height: 630, alt: pageTitle }],
    },
    twitter: {
      card: 'summary_large_image',
      title: pageTitle,
      description,
      images: [image],
    },
    robots: { index: true, follow: true },
  };
}

/**
 * Serializes a JSON-LD object for inline `<script>` injection.
 *
 * `JSON.stringify` does not escape `</script>`, so a value containing that
 * literal text would close the script tag early and let the rest be parsed
 * as HTML. Low-risk today since JSON-LD fields are hardcoded or come from
 * `data/*.json`, but becomes a real stored-XSS vector once fields are
 * editable through Sanity.
 */
export function jsonLdScript(data: unknown): string {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}

/**
 * JSON-LD `Person` schema for the homepage / about page.
 * Drop into a `<script type="application/ld+json">` block.
 */
export const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Mubashir Hussain',
  givenName: 'Mubashir',
  familyName: 'Hussain',
  honorificPrefix: 'Dr.',
  jobTitle: 'Teaching Fellow',
  affiliation: {
    '@type': 'CollegeOrUniversity',
    name: 'University of Strathclyde (Bahrain campus)',
  },
  url: siteConfig.url,
  email: siteConfig.authorEmail,
  sameAs: [
    siteConfig.social.linkedin,
    siteConfig.social.github,
    siteConfig.social.scholar,
  ].filter(Boolean),
};
