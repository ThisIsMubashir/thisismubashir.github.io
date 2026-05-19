'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { cn, siteConfig } from '@/lib/utils';
import { ThemeToggle } from './theme-toggle';
import { SearchButton } from './search';

const links = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/publications', label: 'Publications' },
  { href: '/projects', label: 'Projects' },
  { href: '/teaching', label: 'Teaching' },
  { href: '/cv', label: 'CV' },
  { href: '/contact', label: 'Contact' },
];

export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-ink-100 bg-white/80 backdrop-blur dark:border-ink-900 dark:bg-ink-950/80">
      <div className="container-wide flex h-14 items-center justify-between">
        <Link href="/" className="font-serif text-lg font-medium no-underline">
          {siteConfig.shortName}
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex" aria-label="Main">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={cn(
                'rounded-md px-3 py-1.5 text-sm no-underline transition-colors',
                isActive(l.href)
                  ? 'bg-ink-100 text-ink-900 dark:bg-ink-900 dark:text-ink-50'
                  : 'text-ink-900/70 hover:bg-ink-50 dark:text-ink-50/70 dark:hover:bg-ink-900/60',
              )}
            >
              {l.label}
            </Link>
          ))}
          <SearchButton />
          <ThemeToggle />
        </nav>

        {/* Mobile toggle */}
        <button
          type="button"
          className="md:hidden"
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
          className="border-t border-ink-100 md:hidden dark:border-ink-900"
        >
          <ul className="container-wide flex flex-col py-2">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className={cn(
                    'block rounded-md px-3 py-2 text-sm no-underline',
                    isActive(l.href)
                      ? 'bg-ink-100 dark:bg-ink-900'
                      : 'hover:bg-ink-50 dark:hover:bg-ink-900/60',
                  )}
                  onClick={() => setOpen(false)}
                >
                  {l.label}
                </Link>
              </li>
            ))}
            <li className="flex items-center gap-2 px-3 py-2">
              <SearchButton />
              <ThemeToggle />
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
