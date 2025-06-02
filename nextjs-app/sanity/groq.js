import { groq } from "next-sanity";

export const homequery = groq`*[_type == "home"][0]{
hero {
    "title": coalesce(title[_key == $locale][0].value, title[_key == "en"][0].value),
    "backgroundVideoUrl": backgroundVideo.asset->url
  },
  partners {
    logos[] {
      name,
      "logoUrl": logo.asset->url,
      url
    }
  },
  introduction {
    "tag": coalesce(tag[_key == $locale][0].value, tag[_key == "en"][0].value),
    "description": coalesce(description[_key == $locale][0].value, description[_key == "en"][0].value),
    blocks[] {
      "title": coalesce(title[_key == $locale][0].value, title[_key == "en"][0].value),
      "description": coalesce(description[_key == $locale][0].value, description[_key == "en"][0].value),
        url,
      "staticImage": staticImage.asset->url,
      "hoverImage": hoverImage.asset->url
    }
  },
  sectors {
    "tag": coalesce(tag[_key == $locale][0].value, tag[_key == "en"][0].value),
    "title": coalesce(title[_key == $locale][0].value, title[_key == "en"][0].value),
    "imageUrl": image.asset->url,
    "allSectors": *[_type == "sector" && language == $locale] | order(publishedAt asc) {
      title,
      "slug": slug.current
    }
  },
  services {
    "tag": coalesce(tag[_key == $locale][0].value, tag[_key == "en"][0].value),
    "description": coalesce(description[_key == $locale][0].value, description[_key == "en"][0].value),
    hubs[] {
      "title": coalesce(title[_key == $locale][0].value, title[_key == "en"][0].value),
      "description": coalesce(description[_key == $locale][0].value, description[_key == "en"][0].value),
        url,
      "staticImage": staticImage.asset->url,
      "hoverImage": hoverImage.asset->url
    }
  },
  caseStudies {
    "tag": coalesce(tag[_key == $locale][0].value, tag[_key == "en"][0].value),
    "imageUrl": image.asset->url,
    "items": *[_type == "case-study" && isDisplay == true && language == $locale] | order(publishedAt desc) {
      title,
      slug,
      categories[]-> {
        "title": coalesce(title[_key == $locale][0].value, title[_key == "en"][0].value),
      },
      summary
    }
  },
  spotlight {
    "tag": coalesce(tag[_key == $locale][0].value, tag[_key == "en"][0].value),
    "title": coalesce(title[_key == $locale][0].value, title[_key == "en"][0].value),
    "description": coalesce(description[_key == $locale][0].value, description[_key == "en"][0].value),
    "imageUrl": image.asset->url
  },
  blog {
    "tag": coalesce(tag[_key == $locale][0].value, tag[_key == "en"][0].value),
    "imageUrl": image.asset->url,
    "items": *[_type == "post" && isDisplay == true && language == $locale] | order(publishedAt desc) {
      title,
      slug,
      categories[]-> {
        "title": coalesce(title[_key == $locale][0].value, title[_key == "en"][0].value),
      },
      summary,
    }
  },
}`;

export const aboutQuery = groq`*[_type == "about"][0]{
 "tag": coalesce(tag[_key == $locale][0].value, tag[_key == "en"][0].value),
  "title": coalesce(title[_key == $locale][0].value, title[_key == "en"][0].value),
  sideText[] {
    "text": coalesce(text[_key == $locale][0].value, text[_key == "en"][0].value),
  },
  "imageUrl": image.asset->url,
  "contentSection": coalesce(contentSection[$locale], contentSection["en"]),
}`;

export const boostersquery = groq`*[_type == "boosters"][0] {
  "tag": coalesce(tag[_key == $locale][0].value, tag[_key == "en"][0].value),
  "title": coalesce(title[_key == $locale][0].value, title[_key == "en"][0].value),
  products[] {
    "name": coalesce(name[_key == $locale][0].value, name[_key == "en"][0].value),
    "description": coalesce(description[$locale], description["en"]),
    "imageUrl": image.asset->url,
    url
  }
}`;

export const blogPageQuery = groq`*[_type == "blog"][0]{
  "tag": coalesce(tag[_key == $locale][0].value, tag[_key == "en"][0].value),
  "imageUrl": image.asset->url,
  "items": *[_type == "post" && language == $locale]| order(publishedAt desc) {
    title,
    slug,
    categories[]-> {
      "title": coalesce(title[_key == $locale][0].value, title[_key == "en"][0].value),
    },
    summary
  }
}`;

export const casestudiesPageQuery = groq`*[_type == "case-studies-page"][0]{
  "tag": coalesce(tag[_key == $locale][0].value, tag[_key == "en"][0].value),
  "imageUrl": image.asset->url,
  "items": *[_type == "case-study" && language == $locale] | order(publishedAt desc) {
    title,
    slug,
    categories[]-> {
      "title": coalesce(title[_key == $locale][0].value, title[_key == "en"][0].value),
    },
    summary
  }
}`;

export const careersQuery = groq`*[_type == "careers"][0]{
  "tag": coalesce(tag[_key == $locale][0].value, tag[_key == "en"][0].value),
   "title": coalesce(title[_key == $locale][0].value, title[_key == "en"][0].value),
  "imageUrl": image.asset->url,
  sideText[] {
    "text": coalesce(text[_key == $locale][0].value, text[_key == "en"][0].value),
  },
  "mainText": coalesce(mainText[$locale], mainText["en"]),
  positionsSection {
    "tag": coalesce(tag[_key == $locale][0].value, tag[_key == "en"][0].value),
    positions[] {
      "title": coalesce(title[_key == $locale][0].value, title[_key == "en"][0].value),
      date,
      "place": coalesce(place[_key == $locale][0].value, place[_key == "en"][0].value),
      company,
      url
    }
  }
}`;

export const ecosystemsQuery = groq`*[_type == "ecosystems"][0]{
  "tag": coalesce(tag[_key == $locale][0].value, tag[_key == "en"][0].value),
   "title": coalesce(title[_key == $locale][0].value, title[_key == "en"][0].value),
  "imageUrl": image.asset->url,
  sideText[] {
    "text": coalesce(text[_key == $locale][0].value, text[_key == "en"][0].value),
  },
  "mainText": coalesce(mainText[$locale], mainText["en"]),
  platformSection {
    "title": coalesce(title[_key == $locale][0].value, title[_key == "en"][0].value),
    sideText[] {
      "text": coalesce(text[_key == $locale][0].value, text[_key == "en"][0].value),
    },
    "mainText": coalesce(mainText[$locale], mainText["en"])
  },
  featuresSection {
    "tag": coalesce(tag[_key == $locale][0].value, tag[_key == "en"][0].value),
    features[] {
      "feature": coalesce(feature[_key == $locale][0].value, feature[_key == "en"][0].value),
    },
  },
  partnersSection {
    "title": coalesce(title[_key == $locale][0].value, title[_key == "en"][0].value),
    "mainText": coalesce(mainText[$locale], mainText["en"]),
    "imageUrl": image.asset->url,
  }
}`;

export const contactPageQuery = groq`*[_type == "contact-page"][0]{
  "tag": coalesce(tag[_key == $locale][0].value, tag[_key == "en"][0].value),
  "title": coalesce(title[_key == $locale][0].value, title[_key == "en"][0].value),
  inputs[] {
    "label": coalesce(label[_key == $locale][0].value, label[_key == "en"][0].value),
    "placeHolder": coalesce(placeHolder[_key == $locale][0].value, placeHolder[_key == "en"][0].value),
    type,
    required
  },
  "submitBtnText": coalesce(submitBtnText[_key == $locale][0].value, submitBtnText[_key == "en"][0].value)
}`;

// Reusable sections

export const contactquery = groq`*[_type == "contact"][0] {
    "title": coalesce(title[_key == $locale][0].value, title[_key == "en"][0].value),
    "description": coalesce(description[_key == $locale][0].value, description[_key == "en"][0].value),
    "buttonText": coalesce(buttonText[_key == $locale][0].value, buttonText[_key == "en"][0].value),
    locations[] {
      country,
      phone,
      address
    },
    "contactImage": contactImage.asset->url
  }`;

export const newsletterquery = groq`*[_type == "newsletter"][0] {
    socials[] {
      title,
      url
    },
    "title": coalesce(title[_key == $locale][0].value, title[_key == "en"][0].value),
    "labelText": coalesce(labelText[_key == $locale][0].value, labelText[_key == "en"][0].value),
    "placeholderText": coalesce(placeholderText[_key == $locale][0].value, placeholderText[_key == "en"][0].value),
    "buttonText": coalesce(buttonText[_key == $locale][0].value, buttonText[_key == "en"][0].value),
    
  }`;

export const footerquery = groq`*[_type == "footer"][0] {
      services {
        "title": coalesce(title[_key == $locale][0].value, title[_key == "en"][0].value),
        links[] {
          "title": coalesce(title[_key == $locale][0].value, title[_key == "en"][0].value),
          url
        }
      },
      customers {
        "title": coalesce(title[_key == $locale][0].value, title[_key == "en"][0].value),
        links[] {
          "title": coalesce(title[_key == $locale][0].value, title[_key == "en"][0].value),
          url
        }
      },
      news {
        "title": coalesce(title[_key == $locale][0].value, title[_key == "en"][0].value),
        links[] {
          "title": coalesce(title[_key == $locale][0].value, title[_key == "en"][0].value),
          url
        }
      },
      company {
        "title": coalesce(title[_key == $locale][0].value, title[_key == "en"][0].value),
        links[] {
          "title": coalesce(title[_key == $locale][0].value, title[_key == "en"][0].value),
          url
        }
      },
      socials {
        "title": coalesce(title[_key == $locale][0].value, title[_key == "en"][0].value),
        links[] {
          title,
          url
        }
      },
      "logoUrl": logo.asset->url
    }`;

export const caseStudiesSectionQuery = groq`*[_type == "case-studies-section"][0]{
      "tag": coalesce(tag[_key == $locale][0].value, tag[_key == "en"][0].value),
      "imageUrl": image.asset->url,
      "items": *[_type == "case-study" && language == $locale] | order(publishedAt desc) {
          title,
          slug,
          categories[]-> {
            "title": coalesce(title[_key == $locale][0].value, title[_key == "en"][0].value),
          },
          summary
        }
    }`;

export const BlogSectionQuery = groq`*[_type == "blog-section"][0]{
      "tag": coalesce(tag[_key == $locale][0].value, tag[_key == "en"][0].value),
      "imageUrl": image.asset->url,
      "items": *[_type == "post" && language == $locale] [0...7] | order(publishedAt desc) {
          title,
          slug,
          categories[]-> {
            "title": coalesce(title[_key == $locale][0].value, title[_key == "en"][0].value),
          },
          summary
        }
    }`;

// Single Post
export const singlearticlequery = groq`*[_type == "post" && slug.current == $slug][0] {
        title,
        slug,
        publishedAt,
        categories[]-> {
          "title": coalesce(title[_key == $locale][0].value, title[_key == "en"][0].value),
        },
        body,
        "_translations": *[_type == "translation.metadata" && references(^._id)].translations[].value->{
          title,
          slug,
          language
        },
      }
`;

// Single Post
export const singleCasestudyQuery = groq`*[_type == "case-study" && slug.current == $slug][0] {
        title,
        slug,
        publishedAt,
        categories[]-> {
          "title": coalesce(title[_key == $locale][0].value, title[_key == "en"][0].value),
        },
        body,
        "_translations": *[_type == "translation.metadata" && references(^._id)].translations[].value->{
          title,
          slug,
          language
        },
      }
`;

// Single Expertise
export const singleExpertiseQuery = groq`
*[_type == "expertise" && slug.current == $slug][0] {
  title,
  "slug": slug.current,
  body,
  "allLinks": *[_type == "expertise" && language == $locale] | order(publishedAt asc) {
    title,
    "slug": slug.current
  },
  casesSection {
    tag,
    "imageUrl": image.asset->url,
    items[]->{
      title,
      "slug": slug.current,
      language,
      categories[]-> {
        "title": coalesce(title[_key == $locale][0].value, title[_key == "en"][0].value),
      },
      summary
    }
  },
  "_translations": *[_type == "translation.metadata" && references(^._id)].translations[].value->{
    title,
    slug,
    language
  }
}`;

// Single Sector
export const singleSectorQuery = groq`*[_type == "sector" && slug.current == $slug][0]  {
  title,
  "slug": slug.current,
  body,
  "allLinks": *[_type == "sector" && language == $locale] | order(publishedAt asc)  {
    title,
    "slug": slug.current
  },
  casesSection {
    tag,
    "imageUrl": image.asset->url,
    items[]->{
      title,
      "slug": slug.current,
      language,
      categories[]-> {
        "title": coalesce(title[_key == $locale][0].value, title[_key == "en"][0].value),
      },
      summary
    }
  },
  "_translations": *[_type == "translation.metadata" && references(^._id)].translations[].value->{
    title,
    slug,
    language
  }
}`;

export const settingsQuery = groq`*[_type == "settings"][0] {
  "imageUrl": favicon.asset->url,
  "defaultTitle": coalesce(defaultTitle[_key == $locale][0].value, defaultTitle[_key == "en"][0].value),
  "description": coalesce(siteDescription[_key == $locale][0].value, siteDescription[_key == "en"][0].value),
}`;

export const navigationQuery = groq`*[_type == "settings"][0] {
  navigation {
    "imageUrl": logo.asset->url,
    "buttonText": coalesce(buttonText[_key == $locale][0].value, buttonText[_key == "en"][0].value),
    "navExpertises": *[_type == "expertise" && isNavigation == true && language == $locale] | order(publishedAt asc) {
      title,
      "slug": slug.current,
    },
    "navSectors": *[_type == "sector" && isNavigation == true && language == $locale] | order(publishedAt asc) {
      title,
      "slug": slug.current
    },
    expertisesLink {
      "title": coalesce(title[_key == $locale][0].value, title[_key == "en"][0].value),
      "dropdownTitle": coalesce(dropdownTitle[_key == $locale][0].value, dropdownTitle[_key == "en"][0].value),
      "imageUrl": dropdownImage.asset->url
    },
    sectorsLink {
      "title": coalesce(title[_key == $locale][0].value, title[_key == "en"][0].value),
      "dropdownTitle": coalesce(dropdownTitle[_key == $locale][0].value, dropdownTitle[_key == "en"][0].value),
    },
    links[] {
      "title": coalesce(title[_key == $locale][0].value, title[_key == "en"][0].value),
      href
    }
  }
}`;

// ALL routes (mostly for sitemap and SSG)

export const allPostsQuery = groq`
    *[_type == "post"] {
      "slug": slug.current,
      _updatedAt,
      language,
    }
  `;

export const allCasestudiesquery = groq`
    *[_type == "case-study"] {
      "slug": slug.current,
      _updatedAt,
      language,
    }
  `;

export const allExpertisesQuery = groq`
    *[_type == "expertise"] {
      "slug": slug.current,
      _updatedAt,
      language,
    }
  `;

export const allSectorsQuery = groq`
    *[_type == "sector"] {
      "slug": slug.current,
      _updatedAt,
      language,
    }
  `;
