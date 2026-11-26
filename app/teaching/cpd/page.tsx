import Link from 'next/link';

// CPD moved to its own top-level page. Static export has no server redirects, so this
// stub uses an HTML meta refresh (works without JS) plus a visible link.
export const metadata = {
  title: 'Moved to CPD',
  robots: { index: false },
  alternates: { canonical: '/cpd/' },
};

export default function OldCpdPage() {
  return (
    <>
      <meta httpEquiv="refresh" content="0; url=/cpd/" />
      <p>
        This page has moved to <Link href="/cpd/">Professional development &amp; service</Link>.
      </p>
    </>
  );
}
