import type { Metadata, Viewport } from 'next';
import { ThemeProvider } from '@/components/theme-provider';
import { Nav } from '@/components/nav';
import { Footer } from '@/components/footer';
import { Analytics } from '@/components/analytics';
import { buildMetadata, personJsonLd } from '@/lib/seo';
import './globals.css';

// Fonts are defined in globals.css via system stacks for zero external deps,
// no FOUT, and no third-party privacy concerns. To switch to Google Fonts
// (Inter / Source Serif 4 / JetBrains Mono), uncomment the block below and
// re-add the `cn(sans.variable, …)` className on <html>. Network access to
// fonts.googleapis.com is required at build time.
//
// import { Inter, Source_Serif_4, JetBrains_Mono } from 'next/font/google';
// import { cn } from '@/lib/utils';
// const sans = Inter({ subsets: ['latin'], variable: '--font-sans', display: 'swap' });
// const serif = Source_Serif_4({ subsets: ['latin'], variable: '--font-serif', display: 'swap' });
// const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono', display: 'swap' });

export const metadata: Metadata = buildMetadata();

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0e0e10' },
  ],
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <a href="#main" className="skip-link">
            Skip to content
          </a>
          <Nav />
          <main
            id="main"
            data-pagefind-body
            className="container-wide py-10 sm:py-14"
          >
            {children}
          </main>
          <Footer />
        </ThemeProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <Analytics />
      </body>
    </html>
  );
}
