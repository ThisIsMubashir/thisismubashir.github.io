/**
 * Back up every Sanity document to data/private/ (gitignored).
 * Run: `npm run export:sanity`   (reads tokens from .env.local)
 * Restore later: `npx sanity dataset import <file> production --replace` (inside studio/)
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import { createClient } from '@sanity/client';

const { NEXT_PUBLIC_SANITY_PROJECT_ID: projectId, NEXT_PUBLIC_SANITY_DATASET: dataset = 'production' } =
  process.env;
const token = process.env.SANITY_READ_TOKEN;
if (!projectId || !token) {
  console.error('Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_READ_TOKEN (.env.local).');
  process.exit(1);
}

const client = createClient({ projectId, dataset, apiVersion: '2024-12-01', useCdn: false, token });
// Everything except Sanity's own system documents; drafts included.
const docs = await client.fetch('*[!(_type match "system.*")] | order(_type asc, _id asc)');

const dir = new URL('../data/private/', import.meta.url);
mkdirSync(dir, { recursive: true });
const file = new URL(`sanity-export-${new Date().toISOString().slice(0, 10)}.ndjson`, dir);
writeFileSync(file, docs.map((d) => JSON.stringify(d)).join('\n') + '\n');

const counts = Object.entries(Object.groupBy(docs, (d) => d._type)).map(([t, l]) => `${t}: ${l.length}`);
console.log(`Exported ${docs.length} documents → data/private/${file.pathname.split('/').pop()}\n  ${counts.join(', ')}`);
