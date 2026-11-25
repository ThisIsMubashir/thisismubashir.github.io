/**
 * Regression checks for the Projects section. Run: `npm run check`
 */
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { registerHooks } from 'node:module';
import { fileURLToPath, pathToFileURL } from 'node:url';
import ts from 'typescript';

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

// 1. Public data files carry only displayed fields — private ones (dates, notes,
//    hours, institutions, …) live in the gitignored data/private/ and stay there.
const PRIVATE_KEYS = /^(dateCompleted|startDate|endDate|notes|hours|certificateReceived|certificateUrl|institution|topics|languages|years|semesters|hero|gallery)$/;
for (const name of ['projects', 'cpd', 'courses']) {
  const rows = JSON.parse(readFileSync(new URL(`data/${name}.json`, root), 'utf8'));
  assert.ok(rows.length > 0, `data/${name}.json is empty — run \`pnpm data\``);
  for (const row of rows) {
    const leaked = Object.keys(row).filter((k) => PRIVATE_KEYS.test(k));
    assert.deepEqual(leaked, [], `data/${name}.json "${row.slug ?? row.code}" exposes ${leaked}`);
    if (name === 'cpd') {
      assert.ok(Number.isInteger(row.year), `${row.slug}: cpd needs an integer year`);
      assert.match(row.kind, /^(talk|outreach|review|certification|workshop|professional|compliance)$/, `${row.slug}: unknown kind`);
    }
  }
}

// 2. Every CSP copy must allow the GitHub contribution graph host.
for (const file of ['next.config.mjs', 'public/_headers']) {
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
