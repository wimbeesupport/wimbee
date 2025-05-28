import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'blog',
  title: 'Blog Page',
  type: 'document',
  preview: {
    prepare({}) {
      return {
        title: 'Blog Page', // Assuming 'en' is your default language
        subtitle: 'Blog Page Content',
      }
    },
  },
  fields: [
    defineField({
      name: 'tag',
      title: 'Page Tag',
      type: 'internationalizedArrayString',
      initialValue: 'BLOG',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
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
