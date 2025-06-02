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
import { allExpertisesQuery, singleExpertiseQuery } from "@/sanity/groq";
import { groq } from "next-sanity";
import Head from "next/head";
import { notFound, redirect } from "next/navigation";

// Dynamic metadata
export async function generateMetadata({ params: { locale, slug } }) {
  const data = await sanityFetch({
    query: groq`*[_type == "expertise" && slug.current == $slug][0]{
      seo {
        title,
        description
      }
    }`,
    qParams: { slug, locale },
    tags: ["expertise"],
  });

  return {
    title: data?.seo?.title || "Welcome — Wimbee",
    description: data?.seo?.description || "Welcome — Wimbee",
  };
}

export const revalidate = 2592000; // 30 days in seconds

export async function generateStaticParams() {
  const expertises = await sanityFetch({
    query: allExpertisesQuery,
    tags: ["expertise"],
  });

  return expertises.flatMap((post) =>
    locales
      .map((locale) => ({
        locale,
        slug: post?.language === locale ? post?.slug : null,
      }))
      .filter((param) => param.slug !== null),
  );
}

const i18nNamespaces = ["expertise", "errors"];

async function page({ params: { locale, slug } }) {
  const { t, resources } = await initTranslations(locale, i18nNamespaces);

  const expertise = await sanityFetch({
    query: singleExpertiseQuery,
    qParams: { slug, locale },
    tags: ["expertise"],
  });

  const localesWithSlugsMap = mapSlugsWithLocales(
    expertise?._translations ?? [], // Sanity translations array
    { currentLocalization: { [locale]: slug } }, // Current slug and locale
  );

  const currentSlugIsInvalid = slug !== localesWithSlugsMap[locale];

  if (currentSlugIsInvalid) {
    redirect(`/expertises/${localesWithSlugsMap[locale]}`); // Redirect to the correct slug
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://wimbeetech.com/";
  const canonicalUrl = `${baseUrl}/${locale === "en" ? "" : `${locale}/`}expertises/${slug}`;

  if (!expertise) return notFound();

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
          <SingleContent
            type="expertises"
            name="Expertises"
            content={expertise}
          />
        </div>
        <SplitSection
          content={expertise?.casesSection}
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
