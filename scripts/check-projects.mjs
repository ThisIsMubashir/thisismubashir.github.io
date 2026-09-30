/**
 * Regression checks for the Projects section. Run: `npm run check`
 * Forces a negative-UTC timezone on purpose — that's where date bugs show.
 */
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { registerHooks } from 'node:module';
import { fileURLToPath, pathToFileURL } from 'node:url';
import ts from 'typescript';

process.env.TZ = 'America/Los_Angeles';

// ponytail: tiny TS/TSX loader so this runs on plain Node (local tsx/esbuild install is ia32-only).
// Handles `@/` aliases and extensionless paths only — swap for tsx/vitest if checks grow.
const root = new URL('../', import.meta.url);
registerHooks({
  resolve(spec, ctx, next) {
    if (!spec.startsWith('@/')) return next(spec, ctx);
    const base = fileURLToPath(new URL(spec.slice(2), root));
    const file = ['.ts', '.tsx', '/index.ts'].map((ext) => base + ext).find(existsSync);
    return next(pathToFileURL(file).href, ctx);
  },
  load(url, ctx, next) {
    if (!/\.tsx?$/.test(url)) return next(url, ctx);
    const { outputText } = ts.transpileModule(readFileSync(fileURLToPath(url), 'utf8'), {
      fileName: fileURLToPath(url),
      compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.ReactJSX },
    });
    return { format: 'module', source: outputText, shortCircuit: true };
  },
});

const { createElement } = await import('react');
const { renderToString } = await import('react-dom/server');
const { ThemeProvider } = await import('next-themes');
const { ThemeToggle } = await import('@/components/theme-toggle');
const { formatPeriod } = await import('@/lib/utils');

// 1. Dates are YYYY-MM-DD (UTC midnight) — must not slip a month west of UTC.
assert.equal(formatPeriod('2026-05-01', null), 'May 2026 → Current');
assert.equal(formatPeriod('2014-08-01', '2018-08-01'), 'Aug 2014 → Aug 2018');
assert.equal(formatPeriod(undefined, null), '');

// 2. Every CSP copy must allow the GitHub contribution graph host.
for (const file of ['app/layout.tsx', 'next.config.mjs', 'public/_headers']) {
  const imgSrc = readFileSync(new URL(file, root), 'utf8').match(/img-src[^;"]*/)?.[0] ?? '';
  assert.match(imgSrc, /ghchart\.rshah\.org/, `${file} CSP img-src blocks ghchart`);
}

// 3. The server can't know the visitor's theme, so ThemeToggle's SSR label must not
//    name one — otherwise it mismatches on hydration for every dark-mode visitor.
const ssrLabel = renderToString(
  createElement(ThemeProvider, { attribute: 'class' }, createElement(ThemeToggle)),
).match(/aria-label="([^"]*)"/)?.[1];
assert.doesNotMatch(ssrLabel ?? '', /light|dark/i, `ThemeToggle SSR label is theme-specific: "${ssrLabel}"`);

console.log('check-projects: all passed');
