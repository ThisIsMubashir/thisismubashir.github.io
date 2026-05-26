'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { Search as SearchIcon, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PagefindResult {
  id: string;
  data: () => Promise<{
    url: string;
    excerpt: string;
    meta: { title?: string; image?: string };
    sub_results?: { url: string; title: string; excerpt: string }[];
  }>;
}

interface PagefindAPI {
  search: (query: string) => Promise<{ results: PagefindResult[] }>;
}

// Lazy global; loaded on first open so the dependency only ships to users
// who actually search. Lives at /_pagefind/pagefind.js after `pnpm pagefind`.
declare global {
  interface Window {
    __pagefind?: PagefindAPI;
  }
}

async function loadPagefind(): Promise<PagefindAPI | null> {
  if (window.__pagefind) return window.__pagefind;
  try {
    // @ts-expect-error — dynamic import of a non-bundled, static URL
    const mod = await import(/* webpackIgnore: true */ '/_pagefind/pagefind.js');
    window.__pagefind = mod;
    return mod;
  } catch {
    return null;
  }
}

interface ResultRow {
  url: string;
  title: string;
  excerpt: string;
}

// Allow only <mark> and </mark> — strip every other HTML tag from Pagefind excerpts.
function sanitizeExcerpt(html: string): string {
  return html.replace(/<(?!\/?\bmark\b)[^>]*>/gi, '');
}

// Pagefind result URLs are always site-relative paths; reject anything else.
function safeResultUrl(url: string): string {
  return url.startsWith('/') ? url : '/';
}

export function SearchButton() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<ResultRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [unavailable, setUnavailable] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Cmd/Ctrl+K to open
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen((v) => !v);
      }
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  const runSearch = useCallback(async (q: string) => {
    const trimmed = q.trim().slice(0, 200);
    if (!trimmed) {
      setResults([]);
      return;
    }
    setLoading(true);
    const pf = await loadPagefind();
    if (!pf) {
      setUnavailable(true);
      setLoading(false);
      return;
    }
    const { results: raw } = await pf.search(trimmed);
    const top = await Promise.all(raw.slice(0, 8).map((r) => r.data()));
    setResults(
      top.map((d) => ({
        url: safeResultUrl(d.url),
        title: d.meta.title ?? d.url,
        excerpt: sanitizeExcerpt(d.excerpt),
      })),
    );
    setLoading(false);
  }, []);

  useEffect(() => {
    const id = setTimeout(() => runSearch(query), 120);
    return () => clearTimeout(id);
  }, [query, runSearch]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex h-9 items-center gap-2 rounded-md border border-ink-200 px-3 text-sm text-ink-500 transition-colors hover:bg-ink-50 dark:border-ink-700 dark:text-ink-300 dark:hover:bg-ink-900"
        aria-label="Search the site"
      >
        <SearchIcon className="h-4 w-4" />
        <span className="hidden sm:inline">Search</span>
        <kbd className="hidden rounded border border-ink-200 px-1.5 py-0.5 font-mono text-[10px] sm:inline dark:border-ink-700">
          ⌘K
        </kbd>
      </button>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Search"
          className="fixed inset-0 z-50 flex items-start justify-center bg-ink-900/60 p-4 pt-[10vh] backdrop-blur-sm"
        >
          {/* Backdrop click-to-close — separate button so the dialog stays semantic */}
          <button
            type="button"
            aria-label="Close search"
            tabIndex={-1}
            onClick={() => setOpen(false)}
            className="absolute inset-0 cursor-default"
          />
          <div className="relative w-full max-w-xl overflow-hidden rounded-lg border border-ink-100 bg-white shadow-lg dark:border-ink-800 dark:bg-ink-950">
            <div className="flex items-center gap-3 border-b border-ink-100 p-3 dark:border-ink-800">
              <SearchIcon className="h-4 w-4 text-ink-400" />
              <input
                ref={inputRef}
                type="search"
                placeholder="Search publications, projects, CV…"
                value={query}
                onChange={(e) => setQuery(e.target.value.slice(0, 200))}
                maxLength={200}
                autoComplete="off"
                spellCheck={false}
                className="flex-1 bg-transparent text-sm outline-none placeholder:text-ink-400"
              />
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close search"
                className="text-ink-400 hover:text-ink-900 dark:hover:text-ink-50"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="max-h-[60vh] overflow-y-auto">
              {unavailable && (
                <p className="p-4 text-sm text-ink-500 dark:text-ink-300">
                  Search index is built only in production. Run <code>pnpm build</code> locally to test.
                </p>
              )}
              {!unavailable && loading && (
                <p className="p-4 text-sm text-ink-500 dark:text-ink-300">Searching…</p>
              )}
              {!unavailable && !loading && query && results.length === 0 && (
                <p className="p-4 text-sm text-ink-500 dark:text-ink-300">
                  No matches for &ldquo;{query}&rdquo;.
                </p>
              )}
              <ul>
                {results.map((r) => (
                  <li key={r.url}>
                    <a
                      href={r.url}
                      onClick={() => setOpen(false)}
                      className="block border-t border-ink-100 px-4 py-3 no-underline hover:bg-ink-50 dark:border-ink-800 dark:hover:bg-ink-900"
                    >
                      <p className="text-sm font-medium text-ink-900 dark:text-ink-50">
                        {r.title}
                      </p>
                      <p
                        className={cn(
                          'mt-1 text-xs text-ink-500 [&_mark]:rounded [&_mark]:bg-brand-100 [&_mark]:px-0.5 [&_mark]:text-brand-900 dark:text-ink-300 [&_mark]:dark:bg-brand-900 [&_mark]:dark:text-brand-50',
                        )}
                        dangerouslySetInnerHTML={{ __html: r.excerpt }}
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <p className="border-t border-ink-100 p-2 text-center text-xs text-ink-400 dark:border-ink-800">
              Powered by Pagefind · press <kbd className="font-mono">Esc</kbd> to close
            </p>
          </div>
        </div>
      )}
    </>
  );
}
