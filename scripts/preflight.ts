/**
 * Pre-deploy verification.
 *
 * Runs three checks:
 *   1. Required env vars are present (warnings, not failures, when optional).
 *   2. Seed JSON files are valid (every slug unique, no empty titles).
 *   3. If `./out` exists, every internal href in the HTML resolves to a file.
 *
 * Wire into CI via the Build & Deploy workflow (already done in .github/workflows/deploy.yml).
 *
 * Usage:
 *   pnpm tsx scripts/preflight.ts                # checks everything available
 *   pnpm tsx scripts/preflight.ts --strict       # treat warnings as errors
 */
import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { join, relative, dirname } from 'node:path';
import publications from '../data/publications.json' with { type: 'json' };
import projects from '../data/projects.json' with { type: 'json' };
import cpd from '../data/cpd.json' with { type: 'json' };
import courses from '../data/courses.json' with { type: 'json' };

const STRICT = process.argv.includes('--strict');
const errors: string[] = [];
const warnings: string[] = [];

function err(msg: string) { errors.push(msg); }
function warn(msg: string) { warnings.push(msg); }

// ---- 1. Env vars --------------------------------------------------------

const REQUIRED = ['NEXT_PUBLIC_SITE_URL'];
const RECOMMENDED = [
  'NEXT_PUBLIC_SANITY_PROJECT_ID',
  'NEXT_PUBLIC_SANITY_DATASET',
  'SANITY_READ_TOKEN',
  'NEXT_PUBLIC_FORMSPREE_ID',
  'NEXT_PUBLIC_PLAUSIBLE_DOMAIN',
];

for (const k of REQUIRED) {
  if (!process.env[k]) err(`Required env var missing: ${k}`);
}
for (const k of RECOMMENDED) {
  if (!process.env[k]) warn(`Recommended env var missing: ${k} (site will work but feature is disabled)`);
}

// ---- 2. Seed data --------------------------------------------------------

interface Slugged { slug: string; title?: string }

function checkSlugs<T extends Slugged>(arr: T[], name: string) {
  const seen = new Map<string, number>();
  for (const item of arr) {
    if (!item.slug) err(`${name}: entry missing slug — ${item.title ?? '(no title)'}`);
    seen.set(item.slug, (seen.get(item.slug) ?? 0) + 1);
    if (!item.title || item.title.trim().length === 0) {
      err(`${name}: entry missing title — slug ${item.slug}`);
    }
  }
  for (const [slug, n] of seen) {
    if (n > 1) err(`${name}: duplicate slug ${slug} (${n} entries)`);
  }
}

checkSlugs(publications as unknown as Slugged[], 'publications');
checkSlugs(projects as unknown as Slugged[], 'projects');
checkSlugs(cpd as unknown as Slugged[], 'cpd');

// Courses use `code` as the key
{
  const seen = new Map<string, number>();
  for (const c of courses as unknown as { code: string; name?: string }[]) {
    if (!c.code) err(`courses: entry missing code — ${c.name ?? '(no name)'}`);
    seen.set(c.code, (seen.get(c.code) ?? 0) + 1);
  }
  for (const [code, n] of seen) if (n > 1) err(`courses: duplicate code ${code} (${n} entries)`);
}

// Cross-ref: every project.relatedPublications slug should exist
{
  const pubSlugs = new Set((publications as unknown as { slug: string }[]).map((p) => p.slug));
  for (const project of projects as unknown as { slug: string; relatedPublications?: string[] }[]) {
    for (const ref of project.relatedPublications ?? []) {
      if (!pubSlugs.has(ref)) {
        err(`projects.${project.slug}.relatedPublications references unknown publication: ${ref}`);
      }
    }
  }
}

// ---- 3. Static export link check ----------------------------------------

const OUT_DIR = join(process.cwd(), 'out');
if (existsSync(OUT_DIR)) {
  const htmlFiles: string[] = [];
  let unreadable = 0;
  (function walk(dir: string) {
    let entries: string[];
    try {
      entries = readdirSync(dir);
    } catch {
      unreadable++;
      return;
    }
    for (const f of entries) {
      // Skip macOS Finder duplicates ("foo 2") which sometimes have garbage permissions.
      if (/ \d+$/.test(f)) continue;
      const full = join(dir, f);
      let isDir = false;
      try {
        isDir = statSync(full).isDirectory();
      } catch {
        unreadable++;
        continue;
      }
      if (isDir) walk(full);
      else if (f.endsWith('.html')) htmlFiles.push(full);
    }
  })(OUT_DIR);

  const HREF = /href="(\/[^"#?]*)/g;
  let broken = 0;
  let checked = 0;
  for (const file of htmlFiles) {
    let html: string;
    try {
      html = readFileSync(file, 'utf8');
    } catch {
      unreadable++;
      continue;
    }
    for (const m of html.matchAll(HREF)) {
      const href = m[1];
      checked++;
      const candidates = [
        join(OUT_DIR, href),
        join(OUT_DIR, href, 'index.html'),
        join(OUT_DIR, `${href}.html`),
      ];
      if (!candidates.some((p) => existsSync(p))) {
        broken++;
        warn(`Possible broken link in ${relative(OUT_DIR, file)}: ${href}`);
      }
    }
  }
  console.log(
    `Link check: ${checked} internal href(s) across ${htmlFiles.length} HTML files; ${broken} unresolved` +
      (unreadable ? `; ${unreadable} skipped (unreadable)` : '') +
      '.',
  );
} else {
  console.log('No ./out directory — skipping link check. (Run `pnpm build` first if you want it.)');
}

// ---- Report --------------------------------------------------------------

console.log('');
if (warnings.length) {
  console.log(`⚠  ${warnings.length} warning(s):`);
  for (const w of warnings) console.log(`   - ${w}`);
}
if (errors.length) {
  console.log(`✗ ${errors.length} error(s):`);
  for (const e of errors) console.log(`   - ${e}`);
}
if (!warnings.length && !errors.length) {
  console.log('✓ Preflight passed.');
}

const failed = errors.length > 0 || (STRICT && warnings.length > 0);
if (failed) process.exit(1);
