import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'talk',
  title: 'Talk / Presentation',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'event', type: 'string' }),
    defineField({ name: 'date', type: 'date' }),
    defineField({ name: 'location', type: 'string', description: 'Or "Virtual"' }),
    defineField({ name: 'abstract', type: 'text', rows: 4 }),
    defineField({ name: 'slidesUrl', type: 'url' }),
    defineField({ name: 'videoUrl', type: 'url' }),
  ],
});
