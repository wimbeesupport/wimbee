import initTranslations from "@/app/i18n";
import Article from "@/components/blog/Article";
import Footer from "@/components/Footer";
import InfoSection from "@/components/InfoSection";
import NavigationWrapper from "@/components/NavigationWrapper";
import Newsletter from "@/components/Newsletter";
import TranslationsProvider from "@/components/TranslationsProvider";
import { locales } from "@/lib/locales";
import mapSlugsWithLocales from "@/lib/mapSlugsWithLocales";
import { sanityFetch } from "@/sanity/client";
import { allCasestudiesquery, singleCasestudyQuery } from "@/sanity/groq";
import { groq } from "next-sanity";
import Head from "next/head";
import { redirect } from "next/navigation";

// Dynamic metadata
export async function generateMetadata({ params: { locale, slug } }) {
  const data = await sanityFetch({
    query: groq`*[_type == "case-study" && slug.current == $slug][0]{
      seo {
        title,
      },
      summary
    }`,
    qParams: { slug, locale },
    tags: ["case-study"],
  });

  return {
    title: data?.seo?.title || "Welcome — Wimbee",
    description: data?.summary || "Welcome — Wimbee",
  };
}

export const revalidate = 2592000; // 30 days in seconds

export async function generateStaticParams() {
  const cases = await sanityFetch({
    query: allCasestudiesquery,
    tags: ["case-study", "case-studies-page", "case-studies-section"],
  });

  return cases.flatMap((post) =>
    locales
      .map((locale) => ({
        locale,
        slug: post?.language === locale ? post?.slug : null,
      }))
      .filter((param) => param.slug !== null),
  );
}

const i18nNamespaces = ["case-study", "errors"];

async function page({ params: { locale, slug } }) {
  const { t, resources } = await initTranslations(locale, i18nNamespaces);

  const caseStudy = await sanityFetch({
    query: singleCasestudyQuery,
    qParams: { slug, locale },
    tags: ["case-study"],
  });

  const localesWithSlugsMap = mapSlugsWithLocales(
    caseStudy?._translations ?? [], // Sanity translations array
    { currentLocalization: { [locale]: slug } }, // Current slug and locale
  );

  const currentSlugIsInvalid = slug !== localesWithSlugsMap[locale];

  if (currentSlugIsInvalid) {
    redirect(`/case-studies/${localesWithSlugsMap[locale]}`); // Redirect to the correct slug
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://wimbeetech.com/";
  const canonicalUrl = `${baseUrl}/${locale === "en" ? "" : `${locale}/`}case-studies/${slug}`;

  if (!caseStudy) return null;

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
        <div className="bg-light-300">
          <NavigationWrapper locale={locale} />
          <Article content={caseStudy} />
        </div>
        <Newsletter locale={locale} />
        <InfoSection locale={locale} />
        <Footer locale={locale} />
      </main>
    </TranslationsProvider>
  );
}

export default page;
