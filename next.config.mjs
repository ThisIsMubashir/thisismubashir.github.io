const securityHeaders = [
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  // Deny all access to camera, microphone, geolocation, and payment APIs.
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), payment=()' },
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' challenges.cloudflare.com plausible.io",
      "style-src 'self' 'unsafe-inline' fonts.googleapis.com cdn.jsdelivr.net",
      "font-src 'self' fonts.gstatic.com cdn.jsdelivr.net",
      "img-src 'self' data: cdn.sanity.io",
      "connect-src 'self' plausible.io",
      "frame-src challenges.cloudflare.com",
      "object-src 'none'",
      "base-uri 'self'",
    ].join('; '),
  },
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export so we can serve from GitHub Pages.
  // Trade-offs documented in IMPLEMENTATION_PLAN.md §1.
  output: 'export',

  // GitHub Pages on a custom (apex) domain → no basePath needed.
  // If you ever fall back to `thisismubashir.github.io/portfolio`,
  // uncomment the two lines below.
  // basePath: '/portfolio',
  // assetPrefix: '/portfolio/',

  trailingSlash: true,

  images: {
    // next/image needs this for static export — Sanity already serves
    // images via its own CDN with on-the-fly transforms, so we don't lose much.
    unoptimized: true,
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn.sanity.io' },
    ],
  },

  // Keep the Studio out of the Next build.
  webpack: (config) => {
    config.watchOptions = { ...config.watchOptions, ignored: ['**/studio/**', '**/node_modules/**'] };
    return config;
  },

  // Active during `next dev` and any future server deployment.
  // GitHub Pages (static export) ignores these; public/_headers covers that host.
  async headers() {
    return [{ source: '/(.*)', headers: securityHeaders }];
  },
};

export default nextConfig;
