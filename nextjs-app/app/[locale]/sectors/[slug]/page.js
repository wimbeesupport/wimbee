import initTranslations from "@/app/i18n";
import Footer from "@/components/Footer";
import SplitSection from "@/components/home/SplitSection";
import InfoSection from "@/components/InfoSection";
import NavigationWrapper from "@/components/NavigationWrapper";
import Newsletter from "@/components/Newsletter";
import SingleContent from "@/components/SingleContent";
import TranslationsProvider from "@/components/TranslationsProvider";
import { locales } from "@/lib/locales";
import mapSlugsWithLocales from "@/lib/mapSlugsWithLocales";
import { sanityFetch } from "@/sanity/client";
import {
  allSectorsQuery,
  caseStudiesSectionQuery,
  singleSectorQuery,
} from "@/sanity/groq";
import { groq } from "next-sanity";
import Head from "next/head";
import { redirect } from "next/navigation";

// Dynamic metadata
export async function generateMetadata({ params: { locale, slug } }) {
  const data = await sanityFetch({
    query: groq`*[_type == "sector" && slug.current == $slug][0]{
      seo {
        title,
        description
      }
    }`,
    qParams: { slug, locale },
    tags: ["sector"],
  });

  return {
    title: data?.seo?.title || "Welcome — Wimbee",
    description: data?.seo?.description || "Welcome — Wimbee",
  };
}

export const revalidate = 2592000; // 30 days in seconds

export async function generateStaticParams() {
  const sectors = await sanityFetch({
    query: allSectorsQuery,
    tags: ["sector"],
  });

  return sectors.flatMap((post) =>
    locales
      .map((locale) => ({
        locale,
        slug: post?.language === locale ? post?.slug : null,
      }))
      .filter((param) => param.slug !== null),
  );
}

const i18nNamespaces = ["sector", "errors"];

async function page({ params: { locale, slug } }) {
  const { t, resources } = await initTranslations(locale, i18nNamespaces);

  const sector = await sanityFetch({
    query: singleSectorQuery,
    qParams: { slug, locale },
    tags: ["sector"],
  });

  const caseStudiesSection = await sanityFetch({
    query: caseStudiesSectionQuery,
    qParams: { slug, locale },
    tags: ["case-studies-section", "case-study"],
  });

  const localesWithSlugsMap = mapSlugsWithLocales(
    sector?._translations ?? [], // Sanity translations array
    { currentLocalization: { [locale]: slug } }, // Current slug and locale
  );

  const currentSlugIsInvalid = slug !== localesWithSlugsMap[locale];

  if (currentSlugIsInvalid) {
    redirect(`/sectors/${localesWithSlugsMap[locale]}`); // Redirect to the correct slug
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://wimbeetech.com/";
  const canonicalUrl = `${baseUrl}/${locale === "en" ? "" : `${locale}/`}sectors/${slug}`;

  if (!sector) return null;

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
          <SingleContent type="sectors" name="Sectors" content={sector} />
        </div>
        <SplitSection
          content={sector?.casesSection}
          type="case-studies"
          variant="primary"
        />
        <Newsletter locale={locale} />
        <InfoSection locale={locale} />
        <Footer locale={locale} />
      </main>
    </TranslationsProvider>
  );
}

export default page;
