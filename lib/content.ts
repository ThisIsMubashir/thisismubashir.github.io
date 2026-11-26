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
  summary?: string; // our own plain-language summary, shown when there is no publisher abstract
  keywords?: string[];
  bibtex?: string;
  featured?: boolean;
}

/** CPD categories in display order — the single source for labels on every page. */
export const CPD_CATEGORIES = [
  { kind: 'talk', label: 'Talks & workshops delivered', intro: 'Seminars and staff-development sessions I have led on teaching practice, learning technology and research.' },
  { kind: 'outreach', label: 'Student engagement & outreach', intro: 'Hands-on challenges, industry sessions and school outreach I have led or co-organised.' },
  { kind: 'review', label: 'Peer review', intro: 'Reviewer for international journals and conferences.' },
  { kind: 'certification', label: 'Certifications & microskills', intro: 'Credentials in artificial intelligence, cybersecurity, leadership and online teaching.' },
  { kind: 'workshop', label: 'Teaching & learning development', intro: 'Workshops and seminars on assessment, academic integrity, AI in education and learning technology.' },
  { kind: 'professional', label: 'Professional & leadership development', intro: 'Leadership programmes, technical courses and industry events.' },
  { kind: 'compliance', label: 'Inclusion, wellbeing & safety', intro: 'Equality, diversity and inclusion, health and safety, and wellbeing training.' },
] as const;

export type CpdKind = (typeof CPD_CATEGORIES)[number]['kind'];

export interface CpdEntry {
  slug: string;
  kind: CpdKind; // talk = delivered as speaker
  title: string;
  provider?: string;
  year: number;
  logo?: string;
  summary?: string; // one-line description (outreach)
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
  aiAssisted?: boolean; // shows a "Built with AI assistance" label
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
  return [...cpd].sort((a, b) => b.year - a.year); // stable: keeps file order within a year
}

export async function getCourses(): Promise<Course[]> {
  return courses;
}
