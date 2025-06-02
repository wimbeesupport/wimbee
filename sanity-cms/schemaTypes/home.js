import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'home',
  title: 'Home Page',
  type: 'document',
  // Add preview configuration to control what's shown in the header
  preview: {
    prepare({}) {
      return {
        title: 'Home Page', // Assuming 'en' is your default language
        subtitle: 'Home Page Content',
      }
    },
  },
  fields: [
    defineField({
      name: 'hero',
      title: 'Hero Section',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Title',
          type: 'internationalizedArrayString',
        }),
        defineField({
          name: 'backgroundVideo',
          title: 'Background Video',
          type: 'file',
          options: {
            accept: 'video/*',
          },
        }),
      ],
    }),
    defineField({
      name: 'partners',
      title: 'Partner Companies',
      type: 'object',
      fields: [
        defineField({
          name: 'logos',
          title: 'Partner Logos',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({
                  name: 'name',
                  title: 'Company Name',
                  type: 'string',
                }),
                defineField({
                  name: 'logo',
                  title: 'Company Logo',
                  type: 'image',
                  options: {
                    hotspot: true,
                  },
                }),
              ],
            },
          ],
        }),
      ],
    }),
    defineField({
      name: 'introduction',
      title: 'Introduction Section',
      type: 'object',
      fields: [
        defineField({
          name: 'tag',
          title: 'Tag',
          type: 'internationalizedArrayString',
        }),
        defineField({
          name: 'description',
          title: 'Description',
          type: 'internationalizedArrayString',
        }),

        defineField({
          name: 'blocks',
          title: 'Introduction Blocks',
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
                  name: 'description',
                  title: 'Description',
                  type: 'internationalizedArrayString',
                }),
                defineField({
                  name: 'url',
                  title: 'URL',
                  type: 'string',
                }),
                defineField({
                  name: 'staticImage',
                  title: 'Static Hub Image',
                  type: 'image',
                  options: {
                    hotspot: true,
                  },
                }),
                defineField({
                  name: 'hoverImage',
                  title: 'Hover Block Image',
                  type: 'image',
                  options: {
                    hotspot: true,
                  },
                }),
              ],
            },
          ],
        }),
      ],
    }),
    defineField({
      name: 'sectors',
      title: 'Sectors We Serve',
      type: 'object',
      fields: [
        defineField({
          name: 'tag',
          title: 'Tag',
          type: 'internationalizedArrayString',
        }),
        defineField({
          name: 'title',
          title: 'Title',
          type: 'internationalizedArrayString',
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
    }),
    defineField({
      name: 'services',
      title: 'Services Section',
      type: 'object',
      fields: [
        defineField({
          name: 'tag',
          title: 'Tag',
          type: 'internationalizedArrayString',
        }),
        defineField({
          name: 'description',
          title: 'Description',
          type: 'internationalizedArrayString',
        }),
        defineField({
          name: 'hubs',
          title: 'Service Hubs',
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
                  name: 'description',
                  title: 'Description',
                  type: 'internationalizedArrayString',
                }),
                defineField({
                  name: 'url',
                  title: 'URL',
                  type: 'string',
                }),
                defineField({
                  name: 'staticImage',
                  title: 'Static Hub Image',
                  type: 'image',
                  options: {
                    hotspot: true,
                  },
                }),
                defineField({
                  name: 'hoverImage',
                  title: 'Hover Hub Image',
                  type: 'image',
                  options: {
                    hotspot: true,
                  },
                }),
              ],
            },
          ],
        }),
      ],
    }),
    defineField({
      name: 'caseStudies',
      title: 'case studies Section',
      type: 'object',
      fields: [
        defineField({
          name: 'tag',
          title: 'Tag',
          type: 'internationalizedArrayString',
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
    }),
    defineType({
      name: 'spotlight',
      title: 'Spotlight Section',
      type: 'object',
      fields: [
        // Tag/Label
        defineField({
          name: 'tag',
          title: 'Tag/Label',
          type: 'internationalizedArrayString',
        }),
        // Title
        defineField({
          name: 'title',
          title: 'Title',
          type: 'internationalizedArrayString',
        }),
        // Description
        defineField({
          name: 'description',
          title: 'Description',
          type: 'internationalizedArrayString',
        }),
        // Image
        defineField({
          name: 'image',
          title: 'Featured Image',
          type: 'image',
          options: {
            hotspot: true, // Enables image cropping
          },
          description: 'The main image for the spotlight section.',
        }),
      ],
    }),
    defineField({
      name: 'blog',
      title: 'Blog Section',
      type: 'object',
      fields: [
        defineField({
          name: 'tag',
          title: 'Tag',
          type: 'internationalizedArrayString',
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
