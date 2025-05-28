import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'internationalizedBlockContent',
  title: 'Internationalized Block Content',
  type: 'object',
  fields: [
    defineField({
      name: 'en',
      title: 'English',
      type: 'blockContent',
    }),
    defineField({
      name: 'fr',
      title: 'French',
      type: 'blockContent',
    }),
  ],
})
