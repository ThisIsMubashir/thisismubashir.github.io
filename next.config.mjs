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

  // We run `next lint` and `tsc --noEmit` as separate CI steps in `.github/workflows/ci.yml`,
  // so we don't need next build to redo them. Skipping them roughly halves cold build time.
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },

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
};

export default nextConfig;
