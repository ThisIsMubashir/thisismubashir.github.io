/**
 * GROQ queries used to pull content for the site.
 * Keep these stable and well-named — they double as the contract between
 * the Studio schemas and the rendering code.
 *
 * All queries flatten `slug.current` → `slug` so they match the local seed
 * data shape used as a fallback in `lib/content.ts`.
 */

export const personQuery = /* groq */ `
  *[_type == "person"][0]{
    name, title, currentAffiliation, shortBio, longBio,
    "headshot": headshot.asset->url,
    location, emails, social, "academicCv": academicCv.asset->url, "industryCv": industryCv.asset->url
  }
`;

export const publicationsListQuery = /* groq */ `
  *[_type == "publication"] | order(year desc, _createdAt desc) {
    title, "slug": slug.current, authors, venue, year, type, doi, url, featured,
    abstract, keywords, bibtex
  }
`;

export const publicationBySlugQuery = /* groq */ `
  *[_type == "publication" && slug.current == $slug][0]{
    title, "slug": slug.current, authors, venue, year, type, doi, url, abstract,
    keywords, bibtex, featured,
    "pdf": pdf.asset->url
  }
`;

export const projectsListQuery = /* groq */ `
  *[_type == "project"] | order(coalesce(endDate, "9999") desc) {
    title, "slug": slug.current, summary, tags, repoUrl, demoUrl, featured,
    "hero": hero.asset->url, startDate, endDate
  }
`;

export const projectBySlugQuery = /* groq */ `
  *[_type == "project" && slug.current == $slug][0]{
    title, "slug": slug.current, summary, body, tags, repoUrl, demoUrl,
    startDate, endDate, featured,
    "hero": hero.asset->url,
    "gallery": gallery[].asset->url,
    "relatedPublications": relatedPublications[]->slug.current
  }
`;

export const coursesListQuery = /* groq */ `
  *[_type == "course"] | order(level asc, code asc) {
    code, name, level, institution, semesters, topics, languages, years
  }
`;

export const cpdListQuery = /* groq */ `
  *[_type == "cpdEntry"] | order(dateCompleted desc) {
    "slug": _id, title, provider, dateCompleted, hours, certificateReceived,
    certificateUrl, notes
  }
`;

export const talksListQuery = /* groq */ `
  *[_type == "talk"] | order(date desc) {
    "slug": _id, title, event, date, location, slidesUrl, videoUrl, abstract
  }
`;

export const postsListQuery = /* groq */ `
  *[_type == "post"] | order(date desc) {
    title, "slug": slug.current, date, tags, "excerpt": excerpt
  }
`;

export const postBySlugQuery = /* groq */ `
  *[_type == "post" && slug.current == $slug][0]{
    title, date, tags, body, "cover": cover.asset->url
  }
`;
