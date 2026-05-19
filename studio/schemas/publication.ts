import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'publication',
  title: 'Publication',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', validation: (r) => r.required() }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'authors',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'In order. Highlight your own name in the rendered output.',
    }),
    defineField({ name: 'venue', type: 'string', description: 'Journal or conference name' }),
    defineField({ name: 'year', type: 'number' }),
    defineField({
      name: 'type',
      type: 'string',
      options: {
        list: [
          { title: 'Journal article', value: 'journal' },
          { title: 'Conference paper', value: 'conference' },
          { title: 'Book chapter', value: 'chapter' },
          { title: 'Preprint', value: 'preprint' },
        ],
      },
    }),
    defineField({ name: 'doi', type: 'string' }),
    defineField({ name: 'url', type: 'url' }),
    defineField({ name: 'pdf', type: 'file' }),
    defineField({ name: 'abstract', type: 'text', rows: 6 }),
    defineField({ name: 'keywords', type: 'array', of: [{ type: 'string' }] }),
    defineField({ name: 'bibtex', type: 'text', rows: 8, description: 'Raw BibTeX entry' }),
    defineField({ name: 'featured', type: 'boolean', initialValue: false }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'venue', year: 'year' },
    prepare: ({ title, subtitle, year }) => ({
      title,
      subtitle: [subtitle, year].filter(Boolean).join(' · '),
    }),
  },
  orderings: [
    { title: 'Year, newest first', name: 'yearDesc', by: [{ field: 'year', direction: 'desc' }] },
  ],
});
