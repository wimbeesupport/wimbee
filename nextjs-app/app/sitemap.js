import { sanityFetch } from "@/sanity/client";
import {
  allCasestudiesquery,
  allExpertisesQuery,
  allPostsQuery,
  allSectorsQuery,
  allBoostersQuery,
} from "@/sanity/groq";

const locales = ["en", "fr"];
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://wimbeetech.com";

const localePath = (locale, path = "") => {
  const seg = path ? `/${path.replace(/^\/+/, "")}` : "";
  return `${baseUrl}${locale === "en" ? "" : `/${locale}`}${seg}`;
};

const alternatesFor = (path = "") => ({
  languages: Object.fromEntries(
    locales.map((l) => [l, localePath(l, path)])
  ),
});

const staticRoutes = [
  "",
  "about",
  "boosters",
  "careers",
  "ecosystems",
  "contactUs",
  "blog",
  "case-studies",
  "legal-page",
  "privacy-policy",
  "expertises",
  "sectors",
];


export default async function sitemap() {

  const staticPages = staticRoutes.flatMap((route) =>
    locales.map((locale) => ({
      url: localePath(locale, route),
      lastModified: new Date(),
      changeFrequency: route === "" ? "monthly" : "weekly",
      priority: route === "" ? 1.0 : 0.9,
      alternates: alternatesFor(route),
    }))
  );

  const [posts, caseStudies, expertises, sectors, boosters] = await Promise.all([
    sanityFetch({ query: allPostsQuery, tags: ["post", "blog"] }),
    sanityFetch({ query: allCasestudiesquery, tags: ["case-study"] }),
    sanityFetch({ query: allExpertisesQuery, tags: ["expertise"] }),
    sanityFetch({ query: allSectorsQuery, tags: ["sector"] }),
    sanityFetch({ query: allBoostersQuery, tags: ["booster"] }),
  ]);


  const dynamicPages = [
    ...posts.map((p) => ({
      url: localePath(p.language ?? "en", `blog/${p.slug}`),
      lastModified: new Date(p._updatedAt ?? Date.now()),
      changeFrequency: "weekly",
      priority: 0.7,
    })),
    ...caseStudies.map((c) => ({
      url: localePath(c.language ?? "en", `case-studies/${c.slug}`),
      lastModified: new Date(c._updatedAt ?? Date.now()),
      changeFrequency: "weekly",
      priority: 0.7,
    })),
    ...expertises.map((e) => ({
      url: localePath(e.language ?? "en", `expertises/${e.slug}`),
      lastModified: new Date(e._updatedAt ?? Date.now()),
      changeFrequency: "weekly",
      priority: 0.7,
    })),
    ...sectors.map((s) => ({
      url: localePath(s.language ?? "en", `sectors/${s.slug}`),
      lastModified: new Date(s._updatedAt ?? Date.now()),
      changeFrequency: "weekly",
      priority: 0.7,
    })),
    ...boosters.map((b) => ({
      url: localePath(b.language ?? "en", `boosters/${b.slug}`),
      lastModified: new Date(b._updatedAt ?? Date.now()),
      changeFrequency: "weekly",
      priority: 0.7,
    })),
  ];

  return [...staticPages, ...dynamicPages];
}
