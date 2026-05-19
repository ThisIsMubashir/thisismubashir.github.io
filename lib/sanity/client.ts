import { createClient, type SanityClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? '';
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production';
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? '2024-12-01';

/**
 * True when no Sanity project ID is configured. Page components branch on this
 * to render a polite "no content yet" placeholder instead of failing the build.
 * This lets the site scaffold compile cleanly *before* you've run `pnpm sanity init`.
 */
export const sanityNotConfigured = !projectId;

/**
 * Real Sanity client (only constructed when projectId is set) — read-only,
 * used at build time for the static export.
 *
 * When `sanityNotConfigured` is true, the exported client is a Proxy stub that
 * returns empty arrays / null for `fetch()` calls, so consumers don't need to
 * branch beyond the optional `sanityNotConfigured` early-exit they already do.
 */
export const sanityClient: SanityClient = projectId
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: true,
      token: process.env.SANITY_READ_TOKEN,
    })
  : (new Proxy(
      {},
      {
        get(_target, prop) {
          if (prop === 'fetch') return async () => [];
          return () => undefined;
        },
      },
    ) as unknown as SanityClient);

/**
 * Image URL builder. Returns a passthrough stub when Sanity isn't configured
 * so calling `urlFor(...)` doesn't blow up.
 */
const builder = projectId ? imageUrlBuilder(sanityClient) : null;

export function urlFor(source: unknown) {
  if (!builder) {
    return {
      url: () => '',
      width: () => ({ url: () => '' }),
      height: () => ({ url: () => '' }),
    };
  }
  return builder.image(source as never);
}
