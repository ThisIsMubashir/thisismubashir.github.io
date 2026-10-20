import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fieldsets: [
    {
      name: 'private',
      title: 'Private — never shown on the website',
      options: { collapsible: true, collapsed: true },
    },
  ],
  orderings: [{ title: 'Display order', name: 'sortOrder', by: [{ field: 'sortOrder', direction: 'asc' }] }],
  fields: [
    defineField({ name: 'title', type: 'string', validation: (r) => r.required() }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: { source: 'title' },
      validation: (r) => r.required(),
    }),
    defineField({ name: 'role', type: 'string', description: 'e.g. PhD project, Side project' }),
    defineField({
      name: 'current',
      type: 'boolean',
      initialValue: false,
      description: 'Ongoing — rendered as a "Current" badge.',
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
    defineField({
      name: 'sortOrder',
      type: 'number',
      description: 'Position on the Projects page (lower = first).',
    }),
    // Private: stored in the private dataset, never selected by lib/sanity/queries.ts.
    defineField({ name: 'startDate', type: 'date', fieldset: 'private' }),
    defineField({ name: 'endDate', type: 'date', fieldset: 'private' }),
    defineField({ name: 'notes', type: 'text', rows: 4, fieldset: 'private' }),
  ],
});
