import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'booster',
    title: 'Booster',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Booster Title',
            type: 'string',
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
        defineField({
            name: 'isNavigation',
            title: 'Navigation',
            type: 'boolean',
        }),
        defineField({
            name: 'body',
            title: 'Body',
            type: 'blockContent',
        }),
        defineField({
            name: 'publishedAt',
            title: 'Published At',
            type: 'datetime',
            initialValue: () => new Date().toISOString(),
        }),
        defineField({
            name: 'casesSection',
            title: 'Case Studies Section',
            type: 'object',
            fields: [
                defineField({
                    name: 'tag',
                    title: 'section Tag',
                    type: 'string',
                    initialValue: 'CASE STUDIES',
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
                    name: 'items',
                    type: 'array',
                    title: 'Case Studies',
                    of: [
                        {
                            type: 'reference',
                            to: [{ type: 'case-study' }],
                        },
                    ],
                }),
            ],
        }),
        defineField({
            name: 'language',
            title: 'Language',
            type: 'string',
            options: {
                list: [
                    { title: 'English', value: 'en' },
                    { title: 'French', value: 'fr' }
                ],
                layout: 'radio'
            },
            validation: Rule => Rule.required()
        }),
        defineField({
            name: 'seo',
            title: 'SEO Settings',
            type: 'object',
            fields: [
                defineField({
                    name: 'title',
                    title: 'Title',
                    type: 'string',
                }),
                defineField({
                    name: 'description',
                    title: 'Description',
                    type: 'text',
                }),
            ],
        }),
    ],
    preview: {
        select: {
            title: 'title',
            language: 'language',
        },
        prepare(selection) {
            const { title, language } = selection
            return {
                title: title,
                subtitle: language ? `Language: ${language}` : '',
            }
        },
    },
})
