import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'seo',
  title: 'SEO',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title (EN/FR)',
      type: 'internationalizedArrayText',
      validation: r => r.max(60).warning('≤ 60 caractères'),
    }),
    defineField({
      name: 'description',
      title: 'Meta Description (EN/FR)',
      type: 'internationalizedArrayText',
      validation: r => r.min(50).max(160).warning('Idéal: 140–160'),
    }),
    defineField({
      name: 'ogImage',
      title: 'Open Graph Image',
      type: 'image',
      options: {hotspot: true}
    }),
  ],
  options: {collapsible: true, collapsed: false},
})