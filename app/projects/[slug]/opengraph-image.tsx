import { ImageResponse } from 'next/og';
import { getProject, getProjectSlugs } from '@/lib/content';

// Node runtime (default) + force-static so generateStaticParams pre-renders
// these PNGs at build time for `output: 'export'`. Don't add runtime = 'edge'.
export const dynamic = 'force-static';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export async function generateStaticParams() {
  const slugs = await getProjectSlugs();
  return slugs.map((slug) => ({ slug }));
}

export default async function ProjectOgImage({ params }: { params: { slug: string } }) {
  const project = await getProject(params.slug);
  const title = project?.title ?? 'Project';
  const summary = project?.summary ?? '';
  const tags = project?.tags?.slice(0, 4).join(' · ') ?? '';

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
          background: '#161a44',
          color: '#ffffff',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 12,
              background: '#677dff',
              color: '#161a44',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 26,
              fontWeight: 500,
            }}
          >
            MH
          </div>
          <div style={{ fontSize: 18, color: '#94a4ff', textTransform: 'uppercase', letterSpacing: 4 }}>
            Project
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div style={{ fontSize: 60, fontWeight: 500, lineHeight: 1.1, letterSpacing: -1.5 }}>
            {title}
          </div>
          {summary && (
            <div style={{ fontSize: 24, color: '#bdc8ff', maxWidth: 1000, lineHeight: 1.4 }}>
              {summary.length > 180 ? summary.slice(0, 177) + '…' : summary}
            </div>
          )}
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {tags && <div style={{ fontSize: 18, color: '#94a4ff' }}>{tags}</div>}
          <div style={{ fontSize: 18, color: '#94a4ff' }}>mubashirhussain.com / projects</div>
        </div>
      </div>
    ),
    { ...size },
  );
}
