// /sanity-cms/schemas/legalPage.js
import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'legalPage',
  title: 'Legal Mentions',
  type: 'document',
  preview: {
    prepare() {
      return { title: 'Legal Mentions', subtitle: 'EN/FR' }
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
      options: { source: () => 'legal-mentions', maxLength: 96 },
      initialValue: { current: 'legal-mentions' },
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
