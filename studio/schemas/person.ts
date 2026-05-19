import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'person',
  title: 'Person (singleton)',
  type: 'document',
  fields: [
    defineField({ name: 'name', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'title', type: 'string', description: 'e.g. Teaching Fellow' }),
    defineField({ name: 'currentAffiliation', type: 'string' }),
    defineField({ name: 'shortBio', type: 'text', rows: 3 }),
    defineField({ name: 'longBio', type: 'array', of: [{ type: 'block' }] }),
    defineField({
      name: 'headshot',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({ name: 'location', type: 'string' }),
    defineField({
      name: 'emails',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'social',
      type: 'object',
      fields: [
        { name: 'linkedin', type: 'url' },
        { name: 'github', type: 'url' },
        { name: 'scholar', type: 'url' },
        { name: 'orcid', type: 'url' },
        { name: 'researchgate', type: 'url' },
      ],
    }),
    defineField({ name: 'academicCv', type: 'file', title: 'Academic CV (PDF)' }),
    defineField({ name: 'industryCv', type: 'file', title: 'Industry Résumé (PDF)' }),
  ],
});
