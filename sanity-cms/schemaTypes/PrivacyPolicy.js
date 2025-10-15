import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'privacyPolicy',
  title: 'Privacy Policy',
  type: 'document',
  preview: {
    prepare() {
      return { title: 'Privacy Policy', subtitle: 'EN/FR' }
    },
  },
  fields: [
    defineField({
      name: 'title',
      title: 'Title (EN/FR)',
      type: 'internationalizedArrayText',
      validation: r => r.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Base slug (without locale)',
      type: 'slug',
      options: { source: () => 'privacy-policy', maxLength: 96 },
      initialValue: { current: 'privacy-policy' },
      validation: r => r.required(),
    }),
    defineField({
      name: 'content',
      title: 'Content (EN/FR)',
      type: 'internationalizedBlockContent',
      validation: r => r.required(),
    }),
  ],
})
