import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings (singleton)',
  type: 'document',
  fields: [
    defineField({ name: 'siteTitle', type: 'string' }),
    defineField({ name: 'tagline', type: 'string' }),
    defineField({ name: 'defaultOgImage', type: 'image' }),
    defineField({ name: 'plausibleDomain', type: 'string' }),
    defineField({ name: 'primaryCtaLabel', type: 'string' }),
    defineField({ name: 'primaryCtaUrl', type: 'url' }),
    defineField({
      name: 'footerLinks',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', type: 'string' },
            { name: 'url', type: 'url' },
          ],
        },
      ],
    }),
  ],
});
