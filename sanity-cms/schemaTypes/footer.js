import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'footer',
  title: 'Footer Section Configuration',
  type: 'document',
  preview: {
    prepare({}) {
      return {
        title: 'Footer section', // Assuming 'en' is your default language
        subtitle: 'Footer section Content',
      }
    },
  },
  fields: [
    defineField({
      name: 'services',
      title: 'Services',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Title',
          type: 'internationalizedArrayString', // For translatable titles
        }),
        defineField({
          name: 'links',
          title: 'Links',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({
                  name: 'title',
                  title: 'Title',
                  type: 'internationalizedArrayString', // Translatable titles
                }),
                defineField({
                  name: 'url',
                  title: 'URL',
                  type: 'string', // URLs remain static
                }),
              ],
            },
          ],
        }),
      ],
    }),
    defineField({
      name: 'customers',
      title: 'Customers',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Title',
          type: 'internationalizedArrayString',
        }),
        defineField({
          name: 'links',
          title: 'Links',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({
                  name: 'title',
                  title: 'Title',
                  type: 'internationalizedArrayString',
                }),
                defineField({
                  name: 'url',
                  title: 'URL',
                  type: 'string',
                }),
              ],
            },
          ],
        }),
      ],
    }),
    defineField({
      name: 'news',
      title: 'News',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Title',
          type: 'internationalizedArrayString',
        }),
        defineField({
          name: 'links',
          title: 'Links',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({
                  name: 'title',
                  title: 'Title',
                  type: 'internationalizedArrayString',
                }),
                defineField({
                  name: 'url',
                  title: 'URL',
                  type: 'string',
                }),
              ],
            },
          ],
        }),
      ],
    }),
    defineField({
      name: 'company',
      title: 'Company',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Title',
          type: 'internationalizedArrayString',
        }),
        defineField({
          name: 'links',
          title: 'Links',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({
                  name: 'title',
                  title: 'Title',
                  type: 'internationalizedArrayString',
                }),
                defineField({
                  name: 'url',
                  title: 'URL',
                  type: 'string',
                }),
              ],
            },
          ],
        }),
      ],
    }),
    defineField({
      name: 'socials',
      title: 'Socials',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Title',
          type: 'internationalizedArrayString',
        }),
        defineField({
          name: 'links',
          title: 'Links',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({
                  name: 'title',
                  title: 'Title',
                  type: 'string',
                }),
                defineField({
                  name: 'url',
                  title: 'URL',
                  type: 'string',
                }),
              ],
            },
          ],
        }),
      ],
    }),
    defineField({
      name: 'logo',
      title: 'Footer Logo',
      type: 'image', // Static, non-translatable
      options: {
        hotspot: true,
      },
    }),
  ],
})
