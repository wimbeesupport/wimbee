import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {structure} from './strcuture/index.js'
import {internationalizedArray} from 'sanity-plugin-internationalized-array'
import {documentInternationalization} from '@sanity/document-internationalization'
import {media} from 'sanity-plugin-media'

export default defineConfig({
  name: 'default',
  title: 'wimbee',

  projectId: 'j5a0ndtr',
  dataset: 'production',

  plugins: [
    structureTool({structure}),
    visionTool(),
    media(),
    documentInternationalization({
      // Required configuration
      supportedLanguages: [
        {id: 'en', title: 'English'},
        {id: 'fr', title: 'French'},
      ],
      schemaTypes: ['post', 'case-study', 'sector', 'expertise'],
    }),
    internationalizedArray({
      languages: [
        {id: 'en', title: 'English'},
        {id: 'fr', title: 'French'},
      ],
      defaultLanguages: ['en'],
      fieldTypes: ['string'],
    }),
  ],

  schema: {
    types: schemaTypes,
  },
})
