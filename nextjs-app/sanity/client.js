import "server-only";

import { createClient } from "next-sanity";

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-11-01",
  useCdn: false,
});

export async function sanityFetch({ query, qParams = {}, tags }) {
  return client.fetch(query, qParams, {
    cache:
      process.env.NEXT_PUBLIC_ENV === "development" ? "no-store" : "default",
    next: { tags },
  });
}
