import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'contact',
  title: 'Contact Section Configuration',
  type: 'document',
  preview: {
    prepare({}) {
      return {
        title: 'Contact informations section', // Assuming 'en' is your default language
        subtitle: 'Contact informations section Content',
      }
    },
  },
  fields: [
    defineField({
      name: 'title',
      title: 'Main Title',
      type: 'internationalizedArrayString',
      description: 'The main title or heading of the contact section.',
      initialValue: 'Find the space to drive innovation and bring ideas to life with us.',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'internationalizedArrayString',
      description: 'Subtitle or a brief description for the contact section.',
      initialValue: 'Fill out the form and contact wimbee as soon as possible!',
    }),
    defineField({
      name: 'buttonText',
      title: 'Button Text',
      type: 'internationalizedArrayString',
      initialValue: 'Contact us',
    }),
    defineField({
      name: 'locations',
      title: 'Locations',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'country',
              title: 'Country',
              type: 'string',
              description: 'Name of the country or region.',
              initialValue: 'France',
            }),
            defineField({
              name: 'phone',
              title: 'Phone Number',
              type: 'string',
              description: 'Contact phone number for this location.',
            }),
            defineField({
              name: 'address',
              title: 'Address',
              type: 'text',
              description: 'Complete address of the location.',
            }),
          ],
        },
      ],
    }),
    defineField({
      name: 'contactImage',
      title: 'Contact Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      description: 'Image of the map to display in the contact section.',
    }),
  ],
})
