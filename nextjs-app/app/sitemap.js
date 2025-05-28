import { sanityFetch } from "@/sanity/client";
import {
  allCasestudiesquery,
  allExpertisesQuery,
  allPostsQuery,
  allSectorsQuery,
} from "@/sanity/groq";

const locales = ["en", "fr"]; // Add your locales here

export default async function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://wimbeetech.com";

  const routes = [
    "",
    "/boosters",
    "/about",
    "/careers",
    "/ecosystems",
    "/contactUs",
  ];

  const staticPages = locales.flatMap((locale) =>
    routes.map((route) => ({
      url: `${baseUrl}${locale === "en" ? "" : `/${locale}`}${route}`,
      lastModified: new Date(),
      changeFrequency: route === "" ? "monthly" : "weekly",
      priority: route === "" ? 1 : 0.9,
    })),
  );

  const posts = await sanityFetch({
    query: allPostsQuery,
    tags: ["post", "blog"],
  });

  const caseStudies = await sanityFetch({
    query: allCasestudiesquery,
    tags: ["case-study"],
  });

  const expertises = await sanityFetch({
    query: allExpertisesQuery,
    tags: ["expertise"],
  });

  const sectors = await sanityFetch({
    query: allSectorsQuery,
    tags: ["sector"],
  });

  const dynamicPages = [
    ...posts.map((post) => ({
      url: `${baseUrl}${post.language === "en" ? "" : `/${post.language}`}/blog/${post.slug}`,
      lastModified: new Date(post._updatedAt),
      changeFrequency: "weekly",
      priority: 0.7,
    })),
    ...caseStudies.map((caseStudy) => ({
      url: `${baseUrl}${caseStudy.language === "en" ? "" : `/${caseStudy.language}`}/case-studies/${caseStudy.slug}`,
      lastModified: new Date(caseStudy._updatedAt),
      changeFrequency: "weekly",
      priority: 0.7,
    })),
    ...expertises.map((expertise) => ({
      url: `${baseUrl}${expertise.language === "en" ? "" : `/${expertise.language}`}/expertises/${expertise.slug}`,
      lastModified: new Date(expertise._updatedAt),
      changeFrequency: "weekly",
      priority: 0.7,
    })),
    ...sectors.map((sector) => ({
      url: `${baseUrl}${sector.language === "en" ? "" : `/${sector.language}`}/sectors/${sector.slug}`,
      lastModified: new Date(sector._updatedAt),
      changeFrequency: "weekly",
      priority: 0.7,
    })),
  ];

  return [...staticPages, ...dynamicPages];
}
