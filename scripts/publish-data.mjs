/**
 * Build the public data files from the private, gitignored originals.
 *
 *   data/private/{projects,cpd,courses}.json  →  data/{projects,cpd,courses}.json
 *
 * Only the fields the site displays are copied; everything else (dates,
 * hours, notes, institutions, topics, …) stays on this machine.
 * Run: `pnpm data`, then commit the regenerated data/*.json.
 */
import { readFileSync, writeFileSync } from 'node:fs';

const PUBLIC_FIELDS = {
  projects: ['slug', 'title', 'role', 'current', 'summary', 'body', 'tags', 'repoUrl', 'demoUrl', 'featured', 'relatedPublications', 'aiAssisted'],
  cpd: ['slug', 'kind', 'title', 'provider', 'year', 'logo', 'summary'],
  courses: ['code', 'name', 'level'],
};

const pick = (obj, keys) => Object.fromEntries(keys.filter((k) => obj[k] != null).map((k) => [k, obj[k]]));

for (const [name, keys] of Object.entries(PUBLIC_FIELDS)) {
  const src = new URL(`../data/private/${name}.json`, import.meta.url);
  let rows = JSON.parse(readFileSync(src, 'utf8'));
  // Year only — the full date stays private.
  if (name === 'cpd') rows = rows.map((r) => ({ ...r, year: Number(r.dateCompleted.slice(0, 4)) }));
  rows = rows.map((row) => pick(row, keys));
  writeFileSync(new URL(`../data/${name}.json`, import.meta.url), JSON.stringify(rows, null, 2) + '\n');
  console.log(`data/${name}.json: ${rows.length} entries`);
}
