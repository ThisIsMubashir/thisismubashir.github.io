import Link from 'next/link';
import { Github, Linkedin, GraduationCap, Mail } from 'lucide-react';
import { siteConfig } from '@/lib/utils';

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-24 border-t border-ink-100 py-10 text-sm dark:border-ink-900">
      <div className="container-wide flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
        <p className="text-ink-900/70 dark:text-ink-50/70">
          © {year} {siteConfig.name}
        </p>
        <ul className="flex items-center gap-3">
          <li>
            <a
              href={siteConfig.social.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="no-underline"
            >
              <Github className="h-5 w-5" />
            </a>
          </li>
          <li>
            <a
              href={siteConfig.social.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="no-underline"
            >
              <Linkedin className="h-5 w-5" />
            </a>
          </li>
          <li>
            <a
              href={siteConfig.social.scholar}
              target="_blank"
              rel="noreferrer"
              aria-label="Google Scholar"
              className="no-underline"
            >
              <GraduationCap className="h-5 w-5" />
            </a>
          </li>
          <li>
            <a
              href={`mailto:${siteConfig.authorEmail}`}
              aria-label="Email"
              className="no-underline"
            >
              <Mail className="h-5 w-5" />
            </a>
          </li>
        </ul>
      </div>
      <div className="container-wide mt-4 text-xs text-ink-900/50 dark:text-ink-50/50">
        <Link href="/privacy" className="no-underline hover:underline">
          Privacy
        </Link>
      </div>
    </footer>
  );
}
