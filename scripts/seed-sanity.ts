/**
 * One-shot seed script: pushes `data/*.json` into Sanity.
 *
 * Run after `pnpm sanity init` inside studio/, with these env vars set:
 *   NEXT_PUBLIC_SANITY_PROJECT_ID=...
 *   NEXT_PUBLIC_SANITY_DATASET=production
 *   SANITY_WRITE_TOKEN=<token with Editor role>      ← different from READ token
 *
 * Usage (from repo root):
 *   pnpm tsx scripts/seed-sanity.ts             # dry-run, prints transactions
 *   pnpm tsx scripts/seed-sanity.ts --apply     # actually writes to Sanity
 *
 * Idempotent — uses createOrReplace keyed on a deterministic `_id` derived
 * from the seed slug. Re-running overwrites in place; no duplicates.
 */
import { createClient, type SanityClient } from '@sanity/client';
import publications from '../data/publications.json' with { type: 'json' };
import projects from '../data/projects.json' with { type: 'json' };
import cpd from '../data/cpd.json' with { type: 'json' };
import courses from '../data/courses.json' with { type: 'json' };

const APPLY = process.argv.includes('--apply');

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production';
const token = process.env.SANITY_WRITE_TOKEN;

if (APPLY && (!projectId || !token)) {
  console.error('Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_WRITE_TOKEN. Aborting.');
  process.exit(1);
}

const client: SanityClient | null = APPLY
  ? createClient({
      projectId: projectId!,
      dataset,
      apiVersion: '2024-12-01',
      token,
      useCdn: false,
    })
  : null;

interface SeedPublication {
  slug: string;
  title: string;
  authors: string[];
  venue?: string;
  year: number;
  type?: string;
  doi?: string;
  url?: string;
  abstract?: string;
  keywords?: string[];
  bibtex?: string;
  featured?: boolean;
}

interface SeedProject {
  slug: string;
  title: string;
  role?: string;
  startDate?: string;
  endDate?: string | null;
  summary?: string;
  body?: string[];
  tags?: string[];
  repoUrl?: string;
  demoUrl?: string;
  featured?: boolean;
  relatedPublications?: string[];
}

interface SeedCpd {
  slug: string;
  title: string;
  provider?: string;
  dateCompleted?: string;
  hours?: number;
  certificateReceived?: boolean;
  certificateUrl?: string;
  notes?: string;
}

interface SeedCourse {
  code: string;
  name: string;
  level: string;
  institution: string;
  topics?: string[];
  languages?: string[];
  years?: string[];
}

const transactions: Array<{ _id: string; _type: string; [k: string]: unknown }> = [];

function id(prefix: string, key: string): string {
  return `${prefix}.${key.replace(/[^a-z0-9-]/gi, '-').toLowerCase()}`;
}

function portableTextFromParagraphs(paragraphs: string[]) {
  return paragraphs.map((text, i) => ({
    _type: 'block',
    _key: `p${i}`,
    style: 'normal',
    children: [{ _type: 'span', _key: `s${i}`, text }],
  }));
}

// --- Publications --------------------------------------------------------
for (const p of publications as SeedPublication[]) {
  transactions.push({
    _id: id('publication', p.slug),
    _type: 'publication',
    title: p.title,
    slug: { _type: 'slug', current: p.slug },
    authors: p.authors,
    venue: p.venue,
    year: p.year,
    type: p.type,
    doi: p.doi,
    url: p.url,
    abstract: p.abstract,
    keywords: p.keywords,
    bibtex: p.bibtex,
    featured: p.featured ?? false,
  });
}

// --- Projects ------------------------------------------------------------
for (const proj of projects as SeedProject[]) {
  transactions.push({
    _id: id('project', proj.slug),
    _type: 'project',
    title: proj.title,
    slug: { _type: 'slug', current: proj.slug },
    role: proj.role,
    startDate: proj.startDate,
    endDate: proj.endDate ?? undefined,
    summary: proj.summary,
    body: proj.body ? portableTextFromParagraphs(proj.body) : undefined,
    tags: proj.tags,
    repoUrl: proj.repoUrl,
    demoUrl: proj.demoUrl,
    featured: proj.featured ?? false,
    relatedPublications: proj.relatedPublications?.map((slug) => ({
      _type: 'reference',
      _ref: id('publication', slug),
    })),
  });
}

// --- CPD -----------------------------------------------------------------
for (const e of cpd as SeedCpd[]) {
  transactions.push({
    _id: id('cpd', e.slug),
    _type: 'cpdEntry',
    title: e.title,
    provider: e.provider,
    dateCompleted: e.dateCompleted,
    hours: e.hours,
    certificateReceived: e.certificateReceived,
    certificateUrl: e.certificateUrl,
    notes: e.notes,
  });
}

// --- Courses -------------------------------------------------------------
for (const c of courses as SeedCourse[]) {
  transactions.push({
    _id: id('course', c.code),
    _type: 'course',
    code: c.code,
    name: c.name,
    level: c.level,
    institution: c.institution,
    topics: c.topics,
    languages: c.languages,
    years: c.years,
  });
}

(async () => {
  console.log(`Prepared ${transactions.length} document(s) for seeding:`);
  const counts: Record<string, number> = {};
  for (const t of transactions) counts[t._type] = (counts[t._type] ?? 0) + 1;
  for (const [type, n] of Object.entries(counts)) console.log(`  ${type}: ${n}`);

  if (!APPLY) {
    console.log('\nDry run. Re-run with --apply to write to Sanity.');
    return;
  }

  if (!client) return;
  const tx = client.transaction();
  for (const doc of transactions) tx.createOrReplace(doc);

  console.log('\nCommitting transaction…');
  const result = await tx.commit();
  console.log(`Done. ${result.results.length} writes.`);
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
