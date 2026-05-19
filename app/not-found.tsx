import Link from 'next/link';
import { ArrowRight, BookOpen, FileText, FlaskConical, Home, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="py-16">
      <p className="font-mono text-xs uppercase tracking-wider text-brand-700 dark:text-brand-300">
        404 · Page not found
      </p>
      <h1 className="mt-4 text-balance text-4xl tracking-tightish sm:text-5xl">
        That page doesn&apos;t exist (anymore).
      </h1>
      <p className="mt-4 max-w-2xl text-ink-500 dark:text-ink-300">
        The link is wrong, the page was renamed, or it never made it past Phase&nbsp;2. Here&apos;s
        what&apos;s definitely on the site:
      </p>

      <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <Suggestion href="/" icon={<Home className="h-4 w-4" />} title="Home" detail="Bio, current role, featured work" />
        <Suggestion href="/publications/" icon={<BookOpen className="h-4 w-4" />} title="Publications" detail="9 peer-reviewed papers" />
        <Suggestion href="/projects/" icon={<FlaskConical className="h-4 w-4" />} title="Projects" detail="Research + engineering work" />
        <Suggestion href="/teaching/" icon={<FileText className="h-4 w-4" />} title="Teaching" detail="Courses + CPD record" />
        <Suggestion href="/cv/" icon={<FileText className="h-4 w-4" />} title="CV" detail="Full HTML + PDF downloads" />
        <Suggestion href="/contact/" icon={<Mail className="h-4 w-4" />} title="Contact" detail="Get in touch" />
      </div>

      <div className="mt-10">
        <Link href="/" className="no-underline">
          <Button variant="primary">
            Take me home <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
}

function Suggestion({
  href,
  icon,
  title,
  detail,
}: {
  href: string;
  icon: React.ReactNode;
  title: string;
  detail: string;
}) {
  return (
    <Link
      href={href}
      className="block rounded-lg border border-ink-100 p-4 no-underline transition-colors hover:bg-ink-50 dark:border-ink-800 dark:hover:bg-ink-900"
    >
      <p className="flex items-center gap-2 text-sm font-medium">
        {icon} {title}
      </p>
      <p className="mt-1 text-xs text-ink-500 dark:text-ink-300">{detail}</p>
    </Link>
  );
}
