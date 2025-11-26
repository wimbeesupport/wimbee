import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'industry',
    title: 'Industry',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'internationalizedArrayString',
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96,
            },
        }),
    ],
    preview: {
        select: {
            title: 'title',
        },
        prepare(selection) {
            const { title } = selection
            if (Array.isArray(title)) {
                return {
                    title: title.map((item) => item.value || '').join(', '),
                }
            }
            return { title: title }
        },
    },
})
