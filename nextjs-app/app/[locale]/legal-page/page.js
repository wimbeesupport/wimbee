import initTranslations from "@/app/i18n";
import Footer from "@/components/Footer";
import InfoSection from "@/components/InfoSection";
import NavigationWrapper from "@/components/NavigationWrapper";
import Newsletter from "@/components/Newsletter";
import TranslationsProvider from "@/components/TranslationsProvider";
import { sanityFetch } from "@/sanity/client";
import { legalPageQuery } from "@/sanity/groq";
import { groq } from "next-sanity";
import Head from "next/head";
import { PortableText } from "@portabletext/react";

export async function generateMetadata({ params: { locale } }) {
  const meta = await sanityFetch({
    query: groq`*[_type == "legalPage"][0]{
      "title": coalesce(title[$locale], title.en)
    }`,
    qParams: { locale },
    tags: ["legal-page"],
  });

  return {
    title: meta?.title ? `${meta.title} — Wimbee` : "Legal Mentions — Wimbee",
    description: `${meta?.title || "Legal Mentions"} page`,
  };
}

export const revalidate = 0;

const i18nNamespaces = ["common"];
export default async function Page({ params: { locale } }) {
  const { t, resources } = await initTranslations(locale, i18nNamespaces);

  const data = await sanityFetch({
    query: legalPageQuery,
    qParams: { locale },
    tags: ["legal-page", "settings"],
  });

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://wimbeetech.com/";
  const canonicalUrl = `${baseUrl}/${locale === "en" ? "" : `${locale}/`}legal-page`;

  if (!data) return null;

  return (
    <TranslationsProvider
      namespaces={i18nNamespaces}
      locale={locale}
      resources={resources}
    >
      <Head>
        <link rel="canonical" href={canonicalUrl} />
      </Head>

      <main>
        <div className="pt-16">
          <NavigationWrapper locale={locale} />

          <section className="mx-auto max-w-3xl px-4 py-10">
            <h1 className="mb-6 text-3xl font-semibold">{data.title}</h1>
            <article className="prose prose-neutral max-w-none">
              {/* Render bilingual rich text */}
              <PortableText value={data.content} />
            </article>
          </section>
        </div>

        <Footer locale={locale} />
      </main>
    </TranslationsProvider>
  );
}
