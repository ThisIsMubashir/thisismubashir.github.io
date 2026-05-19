import { ImageResponse } from 'next/og';
import { getPublication, getPublicationSlugs } from '@/lib/content';

// Node runtime (default) + force-static so generateStaticParams pre-renders
// these PNGs at build time for `output: 'export'`. Don't add runtime = 'edge'.
export const dynamic = 'force-static';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export async function generateStaticParams() {
  const slugs = await getPublicationSlugs();
  return slugs.map((slug) => ({ slug }));
}

export default async function PublicationOgImage({ params }: { params: { slug: string } }) {
  const pub = await getPublication(params.slug);
  const title = pub?.title ?? 'Publication';
  const subtitle = pub ? `${pub.venue ?? ''} · ${pub.year ?? ''}` : '';
  const authors = pub?.authors?.join(', ') ?? '';

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '64px',
          background: '#ffffff',
          color: '#111111',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 12,
              background: '#2e3fe1',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 26,
              fontWeight: 500,
            }}
          >
            MH
          </div>
          <div style={{ fontSize: 18, color: '#5a5a55', textTransform: 'uppercase', letterSpacing: 4 }}>
            Publication
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div style={{ fontSize: 52, fontWeight: 500, lineHeight: 1.15, letterSpacing: -1 }}>
            {title}
          </div>
          {subtitle && <div style={{ fontSize: 24, color: '#5a5a55' }}>{subtitle}</div>}
          {authors && (
            <div style={{ fontSize: 20, color: '#83837c', maxWidth: 1000 }}>
              {authors}
            </div>
          )}
        </div>

        <div style={{ fontSize: 18, color: '#5a5a55' }}>mubashirhussain.com / publications</div>
      </div>
    ),
    { ...size },
  );
}
