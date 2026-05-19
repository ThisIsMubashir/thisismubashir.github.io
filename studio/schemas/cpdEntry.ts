import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'cpdEntry',
  title: 'CPD Entry',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'provider', type: 'string' }),
    defineField({ name: 'dateCompleted', type: 'date' }),
    defineField({ name: 'hours', type: 'number' }),
    defineField({ name: 'certificateReceived', type: 'boolean', initialValue: false }),
    defineField({ name: 'certificateUrl', type: 'url' }),
    defineField({ name: 'notes', type: 'text', rows: 2 }),
  ],
  orderings: [
    { title: 'Date, newest first', name: 'dateDesc', by: [{ field: 'dateCompleted', direction: 'desc' }] },
  ],
});
