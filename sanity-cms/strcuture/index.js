import {CogIcon, DocumentIcon, ListIcon} from '@sanity/icons'

export const structure = (S) =>
  S.list()
    .id('root')
    .title('Content')
    .items([
      S.listItem()
        .title('Settings')
        .id('settings')
        .child(S.document().schemaType('settings').documentId('settings'))
        .icon(CogIcon),
      S.listItem()
        .title('Home')
        .id('home')
        .child(S.document().schemaType('home').documentId('home')),
      S.listItem()
        .title('Boosters')
        .id('boosters')
        .child(S.document().schemaType('boosters').documentId('boosters')),
      S.listItem()
        .title('About Us')
        .id('about')
        .child(S.document().schemaType('about').documentId('about')),
      S.listItem()
        .title('Blog')
        .id('blog')
        .child(S.document().schemaType('blog').documentId('blog')),
      S.listItem()
        .title('Case studies')
        .id('case-studies-page')
        .child(S.document().schemaType('case-studies-page').documentId('case-studies-page')),
      S.listItem()
        .title('Careers')
        .id('careers')
        .child(S.document().schemaType('careers').documentId('careers')),
      S.listItem()
        .title('Ecosystems')
        .id('ecosystems')
        .child(S.document().schemaType('ecosystems').documentId('ecosystems')),
      S.listItem()
        .title('Contact Us')
        .id('contact-page')
        .child(S.document().schemaType('contact-page').documentId('contact-page')),

      S.divider(),

      S.listItem()
        .title('Reused sections')
        .child(
          S.list()
            .title('Reused sections')
            .items([
              S.listItem()
                .title('Footer')
                .id('footer')
                .child(S.document().schemaType('footer').documentId('footer')),
              S.listItem()
                .title('Contact Information')
                .id('contact')
                .child(S.document().schemaType('contact').documentId('contact')),
              S.listItem()
                .title('Newsletter')
                .id('newsletter')
                .child(S.document().schemaType('newsletter').documentId('newsletter')),
              S.listItem()
                .title('Case Studies section')
                .id('case-studies-section')
                .child(
                  S.document()
                    .schemaType('case-studies-section')
                    .documentId('case-studies-section'),
                ),
              S.listItem()
                .title('Blog section')
                .id('blog-section')
                .child(S.document().schemaType('blog-section').documentId('blog-section')),
            ]),
        ),

      S.divider(),

      S.documentTypeListItem('category').title('Categories').icon(ListIcon),
      S.documentTypeListItem('post').title('Posts').icon(DocumentIcon),
      S.documentTypeListItem('case-study').title('Case Studies').icon(DocumentIcon),
      S.documentTypeListItem('expertise').title('Expertises').icon(DocumentIcon),
      S.documentTypeListItem('sector').title('Sectors').icon(DocumentIcon),
    ])
