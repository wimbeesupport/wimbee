// import { defineType, defineField } from 'sanity'

// export default defineType({
//   name: 'link',
//   title: 'Link',
//   type: 'object',
//   fields: [
//     defineField({ name: 'label', type: 'string', validation: r => r.required() }),
//     defineField({ name: 'page',  type: 'reference', to: [{ type: 'legalPage' }] }),
//     defineField({ name: 'url',   type: 'url' }),
//   ],
//   validation: Rule => Rule.custom(v => (!!v?.page ^ !!v?.url) ? true : 'Pick a page OR a URL'),
//   preview: { select: { title: 'label' } },
// })

import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'link',
  title: 'Link',
  type: 'object',
  fields: [
    defineField({ name: 'title', type: 'object', fields: [
      defineField({ name: 'en', type: 'string' }),
      defineField({ name: 'fr', type: 'string' }),
    ]}), // optional if you already localize like the rest
    defineField({
      name: 'page',
      title: 'Internal page',
      type: 'reference',
      to: [{ type: 'legalPage' } /* add other page types here if you have them */],
    }),
    defineField({
      name: 'url',
      title: 'External URL',
      type: 'url',
    }),
  ],
  // exactly one of page or url
  validation: Rule =>
    Rule.custom(v => (!!v?.page ^ !!v?.url) ? true : 'Pick a page OR a URL'),
})