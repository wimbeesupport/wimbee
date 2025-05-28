import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'contact-page',
  title: 'Contact Us Page',
  type: 'document',
  preview: {
    prepare({}) {
      return {
        title: 'Contact us Page', // Assuming 'en' is your default language
        subtitle: 'Contact us Page Content',
      }
    },
  },
  fields: [
    defineField({
      name: 'tag',
      title: 'Page Tag',
      type: 'internationalizedArrayString',
      initialValue: 'CONTACT',
    }),
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'internationalizedArrayString',
      initialValue: "Let's connect and discover how we can help you succeed.",
    }),
    defineField({
      name: 'inputs',
      title: 'Inputs Displayed',
      type: 'array',
      of: [
        defineField({
          name: 'input',
          title: 'Input',
          type: 'object',
          fields: [
            defineField({
              name: 'label',
              title: 'Label',
              type: 'internationalizedArrayString',
            }),
            defineField({
              name: 'placeHolder',
              title: 'Input place holder',
              type: 'internationalizedArrayString',
            }),
            defineField({
              name: 'type',
              title: 'Type',
              type: 'string',
              options: {
                list: ['text', 'email', 'textarea', 'phone'],
              },
            }),
            defineField({
              name: 'required',
              title: 'Required',
              type: 'boolean',
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'submitBtnText',
      title: 'Text for submit button',
      type: 'internationalizedArrayString',
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
