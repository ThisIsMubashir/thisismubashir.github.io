import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'course',
  title: 'Course',
  type: 'document',
  fields: [
    defineField({ name: 'code', type: 'string', description: 'e.g. MN601' }),
    defineField({ name: 'name', type: 'string', validation: (r) => r.required() }),
    defineField({
      name: 'level',
      type: 'string',
      options: { list: [{ title: 'Undergraduate', value: 'UG' }, { title: 'Postgraduate', value: 'PG' }] },
    }),
    defineField({ name: 'institution', type: 'string' }),
    defineField({ name: 'semesters', type: 'array', of: [{ type: 'string' }] }),
    defineField({ name: 'topics', type: 'array', of: [{ type: 'string' }] }),
    defineField({ name: 'languages', type: 'array', of: [{ type: 'string' }] }),
    defineField({ name: 'years', type: 'array', of: [{ type: 'string' }] }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'institution', level: 'level' },
    prepare: ({ title, subtitle, level }) => ({
      title,
      subtitle: [level, subtitle].filter(Boolean).join(' · '),
    }),
  },
});
