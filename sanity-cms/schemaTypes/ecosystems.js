import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'ecosystems',
  title: 'Ecossytems Page',
  type: 'document',
  preview: {
    prepare({}) {
      return {
        title: 'Ecosystems Page', // Assuming 'en' is your default language
        subtitle: 'Ecosystems Page Content',
      }
    },
  },
  fields: [
    defineField({
      name: 'tag',
      title: 'Main Tag',
      type: 'internationalizedArrayString',
      initialValue: 'OUR ECOSYSTEMS',
    }),
    defineField({
      name: 'title',
      title: 'Main Title',
      type: 'internationalizedArrayString',
      initialValue: 'Careers at Wimbee are paths to growth and impact.',
    }),
    defineField({
      name: 'image',
      title: 'Main Image',
      type: 'image',
      options: {
        hotspot: true,
      },
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
          preview: {
            select: {
              title: 'text',
            },
            prepare(selection) {
              const {title} = selection
              // If the title is an array of objects, join them into a readable string
              if (Array.isArray(title)) {
                return {
                  title: title.map((item) => item.value || '').join(', '),
                }
              }
              return {title: title}
            },
          },
        },
      ],
    }),
    defineField({
      name: 'mainText',
      title: 'Main Text',
      type: 'internationalizedBlockContent', // Use the new type here
    }),

    defineField({
      name: 'platformSection',
      title: 'Our Platform Section',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Section Title',
          type: 'internationalizedArrayString',
          initialValue: 'Our Platform: Tekouin',
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
              preview: {
                select: {
                  title: 'text',
                },
                prepare(selection) {
                  const {title} = selection
                  // If the title is an array of objects, join them into a readable string
                  if (Array.isArray(title)) {
                    return {
                      title: title.map((item) => item.value || '').join(', '),
                    }
                  }
                  return {title: title}
                },
              },
            },
          ],
        }),
        defineField({
          name: 'mainText',
          title: 'Main Text',
          type: 'internationalizedBlockContent', // Use the new type here
        }),
      ],
    }),
    defineField({
      name: 'featuresSection',
      title: 'Features Section',
      type: 'object',
      fields: [
        defineField({
          name: 'tag',
          title: 'Tag',
          type: 'internationalizedArrayString',
          initialValue: 'TEKOUIN FEATURES:',
        }),
        defineField({
          name: 'features',
          title: 'Features',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({
                  name: 'feature',
                  title: 'Feature',
                  type: 'internationalizedArrayString',
                }),
              ],
              preview: {
                select: {
                  title: 'feature',
                },
                prepare(selection) {
                  const {title} = selection
                  // If the title is an array of objects, join them into a readable string
                  if (Array.isArray(title)) {
                    return {
                      title: title.map((item) => item.value || '').join(', '),
                    }
                  }
                  return {title: title}
                },
              },
            },
          ],
        }),
      ],
    }),
    defineField({
      name: 'partnersSection',
      title: 'Partners Section',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Title',
          type: 'internationalizedArrayString',
        }),
        defineField({
          name: 'mainText',
          title: 'Main Text',
          type: 'internationalizedBlockContent', // Use the new type here
        }),
        defineField({
          name: 'image',
          title: 'Main Image',
          type: 'image',
          options: {
            hotspot: true,
          },
        }),
      ],
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
