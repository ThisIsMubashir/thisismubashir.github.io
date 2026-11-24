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
  projects: ['slug', 'title', 'role', 'current', 'summary', 'body', 'tags', 'repoUrl', 'demoUrl', 'featured', 'relatedPublications'],
  cpd: ['slug', 'title', 'provider', 'dateCompleted'],
  courses: ['code', 'name', 'level'],
};

const pick = (obj, keys) => Object.fromEntries(keys.filter((k) => obj[k] != null).map((k) => [k, obj[k]]));

for (const [name, keys] of Object.entries(PUBLIC_FIELDS)) {
  const src = new URL(`../data/private/${name}.json`, import.meta.url);
  const rows = JSON.parse(readFileSync(src, 'utf8')).map((row) => pick(row, keys));
  // Month precision only — the site never shows the day.
  if (name === 'cpd') for (const r of rows) if (r.dateCompleted) r.dateCompleted = r.dateCompleted.slice(0, 7);
  writeFileSync(new URL(`../data/${name}.json`, import.meta.url), JSON.stringify(rows, null, 2) + '\n');
  console.log(`data/${name}.json: ${rows.length} entries`);
}
