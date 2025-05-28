import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'newsletter',
  title: 'Newsletter Section',
  type: 'document',
  preview: {
    prepare({}) {
      return {
        title: 'Newsletter section', // Assuming 'en' is your default language
        subtitle: 'Newsletter section Content',
      }
    },
  },
  fields: [
    // Social Links
    defineField({
      name: 'socials',
      title: 'Socials',
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
              title: 'Platform URL',
              type: 'url',
            }),
          ],
        },
      ],
    }),
    // Newsletter Content
    defineField({
      name: 'title',
      title: 'Newsletter Title',
      type: 'internationalizedArrayString',
      description: 'Title or heading for the newsletter section.',
      initialValue: 'Sign up for our newsletter To receive daily news and updates.',
    }),
    defineField({
      name: 'labelText',
      title: 'Email Input Label',
      type: 'internationalizedArrayString',
      description: 'Label text for the email input field.',
      initialValue: 'Your email',
    }),
    defineField({
      name: 'placeholderText',
      title: 'Email Input Placeholder',
      type: 'internationalizedArrayString',
      description: 'Placeholder text for the email input field.',
      initialValue: 'Your email',
    }),
    defineField({
      name: 'buttonText',
      title: 'Button Text',
      type: 'internationalizedArrayString',
      description: 'Text to display on the subscription button.',
      initialValue: 'Subscribe to Newsletter',
    }),
  ],
})
