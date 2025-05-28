import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'case-study',
  title: 'Case Study',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
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
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{type: 'reference', to: {type: 'category'}}],
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
    }),
    defineField({
      name: 'isDisplay',
      title: 'Show on Home',
      type: 'boolean',
    }),
    // New Summary Field
    defineField({
      name: 'summary',
      title: 'Summary',
      type: 'text',
      description: 'A short summary of the post (e.g., for previews or meta descriptions)',
      validation: (Rule) => Rule.max(200).warning('Keep summaries concise!'),
    }),

    defineField({
      name: 'body',
      title: 'Body',
      type: 'blockContent',
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
      ],
    }),
    defineField({
      // should match 'languageField' plugin configuration setting, if customized
      name: 'language',
      type: 'string',
      readOnly: true,
      hidden: true,
    }),
  ],
})
