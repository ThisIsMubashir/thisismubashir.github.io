import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', validation: (r) => r.required() }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: { source: 'title' },
      validation: (r) => r.required(),
    }),
    defineField({ name: 'role', type: 'string', description: 'e.g. PhD project, Side project' }),
    defineField({ name: 'startDate', type: 'date' }),
    defineField({
      name: 'endDate',
      type: 'date',
      description: 'Leave empty if ongoing — rendered as "Current".',
    }),
    defineField({ name: 'summary', type: 'text', rows: 3 }),
    defineField({ name: 'body', type: 'array', of: [{ type: 'block' }, { type: 'image' }] }),
    defineField({ name: 'tags', type: 'array', of: [{ type: 'string' }] }),
    defineField({ name: 'repoUrl', type: 'url' }),
    defineField({ name: 'demoUrl', type: 'url' }),
    defineField({ name: 'hero', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'gallery', type: 'array', of: [{ type: 'image' }] }),
    defineField({
      name: 'relatedPublications',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'publication' }] }],
    }),
    defineField({ name: 'featured', type: 'boolean', initialValue: false }),
  ],
});
