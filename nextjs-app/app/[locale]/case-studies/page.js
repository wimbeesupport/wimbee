import initTranslations from "@/app/i18n";
import Footer from "@/components/Footer";
import SplitSection from "@/components/home/SplitSection";
import InfoSection from "@/components/InfoSection";
import NavigationWrapper from "@/components/NavigationWrapper";
import Newsletter from "@/components/Newsletter";
import TranslationsProvider from "@/components/TranslationsProvider";
import { sanityFetch } from "@/sanity/client";
import { casestudiesPageQuery } from "@/sanity/groq";
import { groq } from "next-sanity";
import Head from "next/head";

// Dynamic metadata
export async function generateMetadata({ params: { locale } }) {
  const data = await sanityFetch({
    query: groq`*[_type == "case-studies-page"][0]{
      seo {
        "title": coalesce(title[_key == $locale][0].value, title[_key == "en"][0].value),
        "description": coalesce(description[_key == $locale][0].value, description[_key == "en"][0].value)
      }
    }`,
    qParams: { locale },
    tags: ["case-studies-page"],
  });

  return {
    title: data?.seo?.title || "Welcome — Wimbee",
    description: data?.seo?.description || "Welcome — Wimbee",
  };
}

export const revalidate = 2592000; // 30 days in seconds

const i18nNamespaces = ["blog", "post", "errors"];

async function page({ params: { locale } }) {
  const { t, resources } = await initTranslations(locale, i18nNamespaces);

  const data = await sanityFetch({
    query: casestudiesPageQuery,
    qParams: { locale },
    tags: ["case-studies-section", "case-studies-page", "case-study"],
  });

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://wimbeetech.com/";
  const canonicalUrl = `${baseUrl}/${locale === "en" ? "" : `${locale}/`}case-studies`;

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
          <SplitSection content={data} type="case-studies" variant="light" />
        </div>
        <Newsletter locale={locale} />
        <InfoSection locale={locale} />
        <Footer locale={locale} />
      </main>
    </TranslationsProvider>
  );
}

export default page;
