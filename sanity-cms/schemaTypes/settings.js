import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'settings',
  title: 'Site Settings',
  type: 'document',
  preview: {
    prepare({}) {
      return {
        title: 'Settings', // Assuming 'en' is your default language
        subtitle: 'Settings Content',
      }
    },
  },
  fields: [
    defineField({
      name: 'favicon',
      title: 'Favicon',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'defaultTitle',
      title: 'Site Default Title',
      type: 'internationalizedArrayString',
      initialValue: 'Welcome — Wimbee',
    }),
    defineField({
      name: 'siteDescription',
      title: 'Site Description',
      type: 'internationalizedArrayString',
    }),
    defineField({
      name: 'navigation',
      title: 'Navigation',
      type: 'object',
      fields: [
        defineField({
          name: 'logo',
          title: 'Logo',
          type: 'image',
          options: {
            hotspot: true,
          },
        }),
        defineField({
          name: 'buttonText',
          title: 'Button Text',
          type: 'internationalizedArrayString',
          initialValue: 'Contact us',
        }),
        defineField({
          name: 'expertisesLink',
          title: 'Expertises Link',
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'internationalizedArrayString',
              initialValue: 'Expertises',
            }),
            defineField({
              name: 'dropdownTitle',
              title: 'Dropdown Title',
              type: 'internationalizedArrayString',
            }),
            defineField({
              name: 'dropdownImage',
              title: 'Dropdown Image',
              type: 'image',
            }),
          ],
        }),
        defineField({
          name: 'sectorsLink',
          title: 'Sectors Link',
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'internationalizedArrayString',
              initialValue: 'Sectors',
            }),
            defineField({
              name: 'dropdownTitle',
              title: 'Dropdown Title',
              type: 'internationalizedArrayString',
            }),
          ],
        }),
        defineField({
          name: 'boostersLink',
          title: 'Boosters Link',
          type: 'internationalizedArrayString',
          initialValue: 'Boosters',
        }),
        defineField({
          name: 'aboutLink',
          title: 'About Link',
          type: 'internationalizedArrayString',
          initialValue: 'About',
        }),
      ],
    }),
  ],
})
