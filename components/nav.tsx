'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Menu,
  X,
  Home,
  User,
  BookOpen,
  Cpu,
  GraduationCap,
  FileText,
  Mail,
  Github,
  Linkedin,
} from 'lucide-react';
import { useState } from 'react';
import { cn, siteConfig } from '@/lib/utils';
import { ThemeToggle } from './theme-toggle';

const links = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/about', label: 'About', icon: User },
  { href: '/publications', label: 'Publications', icon: BookOpen },
  { href: '/projects', label: 'Projects', icon: Cpu },
  { href: '/teaching', label: 'Teaching', icon: GraduationCap },
  { href: '/cv', label: 'CV', icon: FileText },
  { href: '/contact', label: 'Contact', icon: Mail },
];

export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href));

  return (
    <header className="sticky top-0 z-40 w-full border-b border-ink-100/80 bg-white/90 backdrop-blur-md dark:border-ink-900/80 dark:bg-ink-950/90">
      <div className="container-wide flex h-16 items-center justify-between gap-6">
        {/* Name / logo */}
        <Link
          href="/"
          className="shrink-0 bg-gradient-to-r from-brand-700 via-brand-500 to-brand-400 bg-clip-text text-[15px] font-semibold tracking-tight text-transparent no-underline"
        >
          {siteConfig.shortName}
        </Link>

        {/* Desktop nav — lg+ */}
        <nav className="hidden items-center gap-8 lg:flex" aria-label="Main">
          {links.map((l) => {
            const active = isActive(l.href);
            return (
              <Link
                key={l.href}
                href={l.href}
                aria-current={active ? 'page' : undefined}
                className={cn(
                  'group relative py-2 text-[13px] tracking-wide no-underline transition-colors duration-200',
                  active
                    ? 'font-semibold text-ink-900 dark:text-white'
                    : 'font-medium text-ink-500 hover:text-ink-900 dark:text-ink-400 dark:hover:text-ink-100',
                )}
              >
                {l.label}
                {/* Editorial sliding underline: persistent when active, slides in
                    from the left on hover. Honors prefers-reduced-motion. */}
                <span
                  aria-hidden="true"
                  className={cn(
                    'absolute -bottom-px left-0 h-px w-full origin-left bg-brand-500 transition-transform duration-300 ease-out motion-reduce:transition-none',
                    active ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100',
                  )}
                />
              </Link>
            );
          })}
        </nav>

        {/* Right side: social + theme */}
        <div className="hidden items-center gap-1 lg:flex">
          <div className="mr-2 h-4 w-px bg-ink-200 dark:bg-ink-800" aria-hidden="true" />
          <a
            href={`mailto:${siteConfig.authorEmail}`}
            className="rounded-full p-2 text-ink-400 transition-colors hover:bg-ink-100 hover:text-ink-900 dark:text-ink-500 dark:hover:bg-ink-800 dark:hover:text-ink-50"
            aria-label="Email"
          >
            <Mail className="h-4 w-4" />
          </a>
          <a
            href={siteConfig.social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full p-2 text-ink-400 transition-colors hover:bg-ink-100 hover:text-ink-900 dark:text-ink-500 dark:hover:bg-ink-800 dark:hover:text-ink-50"
            aria-label="GitHub"
          >
            <Github className="h-4 w-4" />
          </a>
          <a
            href={siteConfig.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full p-2 text-ink-400 transition-colors hover:bg-ink-100 hover:text-ink-900 dark:text-ink-500 dark:hover:bg-ink-800 dark:hover:text-ink-50"
            aria-label="LinkedIn"
          >
            <Linkedin className="h-4 w-4" />
          </a>
          <ThemeToggle />
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          className="rounded-full p-2 text-ink-600 hover:bg-ink-100 dark:text-ink-300 dark:hover:bg-ink-800 lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          aria-label="Main (mobile)"
          className="border-t border-ink-100 bg-white/95 backdrop-blur dark:border-ink-800 dark:bg-ink-950/95 lg:hidden"
        >
          <ul className="container-wide flex flex-col py-3">
            {links.map((l) => {
              const Icon = l.icon;
              return (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    aria-current={isActive(l.href) ? 'page' : undefined}
                    className={cn(
                      'flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm no-underline transition-colors',
                      isActive(l.href)
                        ? 'bg-ink-100 font-medium text-ink-900 dark:bg-ink-800 dark:text-white'
                        : 'text-ink-600 hover:bg-ink-50 dark:text-ink-300 dark:hover:bg-ink-800/60',
                    )}
                    onClick={() => setOpen(false)}
                  >
                    <Icon className="h-4 w-4 shrink-0" />
                    {l.label}
                  </Link>
                </li>
              );
            })}
            <li className="mt-1 flex items-center gap-2 border-t border-ink-100 px-3 py-2 dark:border-ink-800">
              <a
                href={`mailto:${siteConfig.authorEmail}`}
                className="p-1.5 text-ink-500 hover:text-ink-900 dark:text-ink-400"
                aria-label="Email"
              >
                <Mail className="h-4 w-4" />
              </a>
              <a
                href={siteConfig.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 text-ink-500 hover:text-ink-900 dark:text-ink-400"
                aria-label="GitHub"
              >
                <Github className="h-4 w-4" />
              </a>
              <a
                href={siteConfig.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 text-ink-500 hover:text-ink-900 dark:text-ink-400"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <ThemeToggle />
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
