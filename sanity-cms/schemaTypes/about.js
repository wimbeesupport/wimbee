import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'about',
  title: 'About us Page',
  type: 'document',
  preview: {
    prepare({}) {
      return {
        title: 'About Page', // Assuming 'en' is your default language
        subtitle: 'About Page Content',
      }
    },
  },
  fields: [
    defineField({
      name: 'tag',
      title: 'Page Tag',
      type: 'internationalizedArrayString',
      initialValue: 'ABOUT',
    }),
    defineField({
      name: 'title',
      title: 'Main Title',
      type: 'internationalizedArrayString',
    }),

    defineField({
      name: 'sideText',
      title: 'Side Text',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'text',
              title: 'Text',
              type: 'internationalizedArrayString',
            }),
          ],
        },
      ],
    }),

    defineField({
      name: 'image',
      title: 'Content Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),

    defineField({
      name: 'contentSection',
      title: 'Content Section',
      type: 'internationalizedBlockContent', // Use the new type here
    }),
    defineField({
      name: 'seo',
      title: 'SEO Settings',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Title',
          type: 'internationalizedArrayString',
        }),
        defineField({
          name: 'description',
          title: 'Description',
          type: 'internationalizedArrayString',
        }),
      ],
    }),
  ],
})
