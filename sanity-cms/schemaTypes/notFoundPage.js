import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'notFoundPage',
  title: '404 / Not Found Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title (EN/FR)',
      type: 'internationalizedArrayText',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle (EN/FR)',
      type: 'internationalizedArrayText',
    }),
    defineField({
      name: 'buttonLabel',
      title: 'Button label (EN/FR)',
      type: 'internationalizedArrayText',
      description: 'Text for the “Go back home” button.',
    }),
    defineField({
      name: 'illustration',
      title: 'SVG Illustration',
      type: 'image',
      description: 'Upload an SVG illustration for the 404 page.',
      options: {
        hotspot: false,
      },
    }),
  ],
})
