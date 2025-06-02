import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'internationalizedArrayText',
  title: 'Internationalized Text',
  type: 'object',
  fields: [
    defineField({
      name: 'en',
      title: 'English',
      type: 'text',
    }),
    defineField({
      name: 'fr',
      title: 'French',
      type: 'text',
    }),
  ],
})
