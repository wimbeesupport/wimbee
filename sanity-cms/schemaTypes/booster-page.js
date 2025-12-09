import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'booster-page',
    title: 'Booster Page',
    type: 'document',
    preview: {
        prepare({ }) {
            return {
                title: 'Booster Page',
                subtitle: 'Booster Page Content',
            }
        },
    },
    fields: [
        defineField({
            name: 'tag',
            title: 'Page Tag',
            type: 'internationalizedArrayString',
            initialValue: 'BOOSTERS',
        }),
        defineField({
            name: 'title',
            title: 'Main Title',
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
