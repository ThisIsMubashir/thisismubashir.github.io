/**
 * Content loader — reads the public JSON in `data/` at build time.
 *
 * `data/projects.json`, `data/cpd.json` and `data/courses.json` are generated
 * by `pnpm data` from the gitignored originals in `data/private/` and hold only
 * the fields the site displays. Publications are public as-is.
 */
import publicationsData from '@/data/publications.json';
import cpdData from '@/data/cpd.json';
import coursesData from '@/data/courses.json';
import projectsData from '@/data/projects.json';

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
  dateCompleted?: string; // YYYY-MM
}

export interface Course {
  code: string;
  name: string;
  level: 'UG' | 'PG';
}

export interface Project {
  slug: string;
  title: string;
  role?: string;
  current?: boolean; // shows a "Current" badge; list order = file order
  summary?: string;
  body?: string[]; // paragraphs
  tags?: string[];
  repoUrl?: string;
  demoUrl?: string;
  featured?: boolean;
  relatedPublications?: string[]; // publication slugs
}

const publications = publicationsData as unknown as Publication[];
const cpd = cpdData as unknown as CpdEntry[];
const courses = coursesData as unknown as Course[];
const projects = projectsData as unknown as Project[];

// ---------------------------------------------------------------------------
// Publications
// ---------------------------------------------------------------------------

export async function getPublications(): Promise<Publication[]> {
  return [...publications].sort((a, b) => (b.year ?? 0) - (a.year ?? 0));
}

export async function getPublication(slug: string): Promise<Publication | null> {
  return publications.find((p) => p.slug === slug) ?? null;
}

export async function getPublicationSlugs(): Promise<string[]> {
  return publications.map((p) => p.slug);
}

/** Resolve a list of publication slugs into full Publication objects (ignores missing). */
export async function resolvePublications(slugs: string[] | undefined): Promise<Publication[]> {
  return (slugs ?? []).map((s) => publications.find((p) => p.slug === s)).filter((p): p is Publication => Boolean(p));
}

// ---------------------------------------------------------------------------
// Projects, CPD, courses
// ---------------------------------------------------------------------------

export async function getProjects(): Promise<Project[]> {
  return projects;
}

export async function getProject(slug: string): Promise<Project | null> {
  return projects.find((p) => p.slug === slug) ?? null;
}

export async function getProjectSlugs(): Promise<string[]> {
  return projects.map((p) => p.slug);
}

export async function getCpdEntries(): Promise<CpdEntry[]> {
  return [...cpd].sort((a, b) => (b.dateCompleted ?? '').localeCompare(a.dateCompleted ?? ''));
}

export async function getCourses(): Promise<Course[]> {
  return courses;
}
