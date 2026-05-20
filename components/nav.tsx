'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Menu, X, User, BookOpen, FlaskConical,
  GraduationCap, FileText, Mail, Github, Linkedin,
} from 'lucide-react';
import { useState } from 'react';
import { cn, siteConfig } from '@/lib/utils';
import { ThemeToggle } from './theme-toggle';

const links = [
  { href: '/about',        label: 'About',        icon: User },
  { href: '/publications', label: 'Publications',  icon: BookOpen },
  { href: '/projects',     label: 'Projects',      icon: FlaskConical },
  { href: '/teaching',     label: 'Teaching',      icon: GraduationCap },
  { href: '/cv',           label: 'CV',            icon: FileText },
  { href: '/contact',      label: 'Contact',       icon: Mail },
];

export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-40 w-full bg-white/90 backdrop-blur-md dark:bg-ink-950/90">
      <div className="container-wide flex h-16 items-center justify-between gap-4">
        {/* Name / logo */}
        <Link
          href="/"
          className="shrink-0 text-base font-bold text-ink-900 no-underline dark:text-ink-50"
        >
          {siteConfig.shortName}
        </Link>

        {/* Desktop pill nav — lg+ */}
        <nav
          className="hidden items-center rounded-full border border-ink-200/80 bg-white/90 px-2 py-1.5 shadow-sm backdrop-blur lg:flex dark:border-ink-700/80 dark:bg-ink-900/90"
          aria-label="Main"
        >
          {links.map((l) => {
            const Icon = l.icon;
            const active = isActive(l.href);
            return (
              <Link
                key={l.href}
                href={l.href}
                className={cn(
                  'inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm no-underline transition-all duration-200',
                  active
                    ? 'bg-ink-900 text-white shadow-sm dark:bg-white dark:text-ink-900'
                    : 'text-ink-600 hover:bg-ink-100 hover:text-ink-900 dark:text-ink-300 dark:hover:bg-ink-800 dark:hover:text-ink-50',
                )}
              >
                <Icon className="h-3.5 w-3.5 shrink-0" />
                <span>{l.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Right side: social + theme */}
        <div className="hidden items-center gap-1 lg:flex">
          <a
            href={siteConfig.social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full p-2 text-ink-500 transition-colors hover:bg-ink-100 hover:text-ink-900 dark:text-ink-400 dark:hover:bg-ink-800 dark:hover:text-ink-50"
            aria-label="GitHub"
          >
            <Github className="h-4 w-4" />
          </a>
          <a
            href={siteConfig.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full p-2 text-ink-500 transition-colors hover:bg-ink-100 hover:text-ink-900 dark:text-ink-400 dark:hover:bg-ink-800 dark:hover:text-ink-50"
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
                    className={cn(
                      'flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm no-underline transition-colors',
                      isActive(l.href)
                        ? 'bg-ink-900 text-white dark:bg-ink-50 dark:text-ink-900'
                        : 'text-ink-700 hover:bg-ink-50 dark:text-ink-200 dark:hover:bg-ink-800',
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
