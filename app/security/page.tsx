import { SectionHeading } from '@/components/section-heading';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Security',
  description: 'How to report security issues with this site.',
  path: '/security',
});

export default function SecurityPage() {
  return (
    <article className="prose prose-neutral max-w-2xl dark:prose-invert">
      <SectionHeading title="Security policy" />
      <p>
        Found a security issue with this site? Please don&apos;t open a public issue. Email me
        directly at <a href="mailto:mubashir.hussain@live.com">mubashir.hussain@live.com</a> with:
      </p>
      <ul>
        <li>A short description of the issue</li>
        <li>Steps to reproduce</li>
        <li>The impact you&apos;ve assessed</li>
        <li>Optionally, a suggested fix</li>
      </ul>
      <p>
        I aim to acknowledge within 72 hours and roll out a fix within 7 days for high-severity items.
      </p>
      <h2>Scope</h2>
      <p>This is a static site (no server-side code, no database, no authentication). Reasonable scope:</p>
      <ul>
        <li>The published site (URLs under this domain)</li>
        <li>The Next.js + Sanity build pipeline</li>
        <li>Any accidental secret leak in build artefacts</li>
      </ul>
      <p>
        Out of scope: vulnerabilities in third-party SaaS used by the site (Sanity, Formspree,
        Plausible, GitHub Pages) — please report those to the relevant vendor.
      </p>
      <p>
        See also the canonical <a href="/.well-known/security.txt"><code>security.txt</code></a>.
      </p>
    </article>
  );
}
