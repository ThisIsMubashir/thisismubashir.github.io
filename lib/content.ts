/**
 * Unified content loader.
 *
 * Pages call these functions to get data. The loader tries Sanity first,
 * then falls back to the JSON seed files in `data/`. This lets the site
 * render real content during development *before* the Sanity project exists,
 * and switches to live data automatically once `NEXT_PUBLIC_SANITY_PROJECT_ID`
 * is set.
 *
 * All data is fetched at build time (static export), so there's no client
 * runtime cost.
 */
import publicationsSeed from '@/data/publications.json';
import cpdSeed from '@/data/cpd.json';
import coursesSeed from '@/data/courses.json';
import projectsSeed from '@/data/projects.json';
import { sanityClient, sanityNotConfigured } from '@/lib/sanity/client';
import {
  cpdListQuery,
  coursesListQuery,
  projectsListQuery,
  publicationsListQuery,
  publicationBySlugQuery,
  projectBySlugQuery,
} from '@/lib/sanity/queries';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type PublicationType = 'journal' | 'conference' | 'chapter' | 'preprint';

export interface Publication {
  slug: string;
  title: string;
  authors: string[];
  venue?: string;
  year: number;
  type?: PublicationType;
  status?: 'submitted' | 'in-press' | 'published';
  doi?: string;
  url?: string;
  abstract?: string;
  keywords?: string[];
  bibtex?: string;
  featured?: boolean;
}

export interface CpdEntry {
  slug: string;
  title: string;
  provider?: string;
  dateCompleted?: string;
  hours?: number;
  certificateReceived?: boolean;
  certificateUrl?: string;
  notes?: string;
}

export interface Course {
  code: string;
  name: string;
  level: 'UG' | 'PG';
  institution: string;
  topics?: string[];
  languages?: string[];
  years?: string[];
  semesters?: string[];
}

export interface Project {
  slug: string;
  title: string;
  role?: string;
  startDate?: string;
  endDate?: string | null;
  summary?: string;
  body?: string[]; // paragraphs; will move to Portable Text once Sanity is live
  tags?: string[];
  repoUrl?: string;
  demoUrl?: string;
  hero?: string;
  featured?: boolean;
  relatedPublications?: string[]; // publication slugs
}

// ---------------------------------------------------------------------------
// Seed casts (TS doesn't know JSON literals match our union types)
// ---------------------------------------------------------------------------

const publications = publicationsSeed as unknown as Publication[];
const cpd = cpdSeed as unknown as CpdEntry[];
const courses = coursesSeed as unknown as Course[];
const projects = projectsSeed as unknown as Project[];

// ---------------------------------------------------------------------------
// Publications
// ---------------------------------------------------------------------------

export async function getPublications(): Promise<Publication[]> {
  if (sanityNotConfigured) return [...publications].sort(byYearDesc);
  const live = await sanityClient.fetch<Publication[]>(publicationsListQuery);
  return live.length ? live : [...publications].sort(byYearDesc);
}

export async function getPublication(slug: string): Promise<Publication | null> {
  if (sanityNotConfigured) {
    return publications.find((p) => p.slug === slug) ?? null;
  }
  const live = await sanityClient.fetch<Publication | null>(publicationBySlugQuery, { slug });
  return live ?? publications.find((p) => p.slug === slug) ?? null;
}

export async function getPublicationSlugs(): Promise<string[]> {
  const list = await getPublications();
  return list.map((p) => p.slug).filter(Boolean);
}

// ---------------------------------------------------------------------------
// Projects
// ---------------------------------------------------------------------------

export async function getProjects(): Promise<Project[]> {
  if (sanityNotConfigured) return [...projects].sort(byEndDateDesc);
  const live = await sanityClient.fetch<Project[]>(projectsListQuery);
  return live.length ? live : [...projects].sort(byEndDateDesc);
}

export async function getProject(slug: string): Promise<Project | null> {
  if (sanityNotConfigured) {
    return projects.find((p) => p.slug === slug) ?? null;
  }
  const live = await sanityClient.fetch<Project | null>(projectBySlugQuery, { slug });
  return live ?? projects.find((p) => p.slug === slug) ?? null;
}

export async function getProjectSlugs(): Promise<string[]> {
  const list = await getProjects();
  return list.map((p) => p.slug).filter(Boolean);
}

// ---------------------------------------------------------------------------
// CPD + Courses
// ---------------------------------------------------------------------------

export async function getCpdEntries(): Promise<CpdEntry[]> {
  if (sanityNotConfigured) return [...cpd].sort(byDateDesc);
  const live = await sanityClient.fetch<CpdEntry[]>(cpdListQuery);
  return live.length ? live : [...cpd].sort(byDateDesc);
}

export async function getCourses(): Promise<Course[]> {
  if (sanityNotConfigured) return [...courses];
  const live = await sanityClient.fetch<Course[]>(coursesListQuery);
  return live.length ? live : [...courses];
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function byYearDesc<T extends { year?: number }>(a: T, b: T): number {
  return (b.year ?? 0) - (a.year ?? 0);
}

function byEndDateDesc<T extends { endDate?: string | null }>(a: T, b: T): number {
  const av = a.endDate ?? '9999-12-31';
  const bv = b.endDate ?? '9999-12-31';
  return bv.localeCompare(av);
}

function byDateDesc<T extends { dateCompleted?: string }>(a: T, b: T): number {
  return (b.dateCompleted ?? '').localeCompare(a.dateCompleted ?? '');
}

/** Resolve a list of publication slugs into full Publication objects (ignores missing). */
export async function resolvePublications(slugs: string[] | undefined): Promise<Publication[]> {
  if (!slugs?.length) return [];
  const all = await getPublications();
  const map = new Map(all.map((p) => [p.slug, p]));
  return slugs.map((s) => map.get(s)).filter((p): p is Publication => Boolean(p));
}
