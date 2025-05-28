import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'blog-section',
  title: 'Other news section in articles',
  type: 'document',
  preview: {
    prepare({}) {
      return {
        title: 'log section', // Assuming 'en' is your default language
        subtitle: 'Blog section Content',
      }
    },
  },
  fields: [
    defineField({
      name: 'tag',
      title: 'section Tag',
      type: 'internationalizedArrayString',
      initialValue: 'OTHER NEWS',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
  ],
})
