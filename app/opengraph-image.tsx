import { ImageResponse } from 'next/og';
import { siteConfig } from '@/lib/utils';

// Node runtime (default) + force-static so the PNG is baked at build time
// and written into out/ for the static export. Don't add runtime = 'edge'.
export const dynamic = 'force-static';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = 'Dr. Mubashir Hussain — Academic & Technology Portfolio';

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px',
          background: '#161a44',
          color: '#ffffff',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 14,
              background: '#2e3fe1',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 36,
              fontWeight: 500,
              letterSpacing: -1,
            }}
          >
            MH
          </div>
          <div style={{ fontSize: 26, color: '#94a4ff' }}>{siteConfig.url.replace('https://', '')}</div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div style={{ fontSize: 22, color: '#94a4ff', textTransform: 'uppercase', letterSpacing: 4 }}>
            Teaching Fellow · University of Strathclyde (Bahrain)
          </div>
          <div style={{ fontSize: 70, fontWeight: 500, lineHeight: 1.05, letterSpacing: -1.5 }}>
            Dr. Mubashir Hussain
          </div>
          <div style={{ fontSize: 28, color: '#bdc8ff', maxWidth: 900, lineHeight: 1.35 }}>
            Academic and technology portfolio — hardware security, NoC design, AI in higher education.
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
