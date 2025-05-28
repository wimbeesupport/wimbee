import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'category',
  title: 'Category',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'internationalizedArrayString',
    }),
  ],
  preview: {
    select: {
      title: 'title', // Select the title field
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
})
