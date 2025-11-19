import Footer from "@/components/Footer";
import InfoSection from "@/components/InfoSection";
import Newsletter from "@/components/Newsletter";
import Image from "next/image";

import Tag from "@/components/Tag";
import { sanityFetch } from "@/sanity/client";
import { boostersquery } from "@/sanity/groq";
import NavigationWrapper from "@/components/NavigationWrapper";
import TranslationsProvider from "@/components/TranslationsProvider";
import initTranslations from "@/app/i18n";
import { groq } from "next-sanity";
import Head from "next/head";
import Link from "next/link";

// Dynamic metadata
export async function generateMetadata({ params: { locale } }) {
  const data = await sanityFetch({
    query: groq`*[_type == "boosters"][0]{
      seo {
        "title": coalesce(title[_key == $locale][0].value, title[_key == "en"][0].value),
        "description": coalesce(description[_key == $locale][0].value, description[_key == "en"][0].value)
      }
    }`,
    qParams: { locale },
    tags: ["boosters"],
  });

  return {
    title: data?.seo?.title || "Welcome — Wimbee",
    description: data?.seo?.description || "Welcome — Wimbee",
  };
}

export const revalidate = 2592000; // 30 days in seconds

const i18nNamespaces = ["boosters", "errors"];

async function page({ params: { locale } }) {
  const { t, resources } = await initTranslations(locale, i18nNamespaces);

  const data = await sanityFetch({
    query: boostersquery,
    qParams: { locale },
    tags: ["boosters"],
  });

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://wimbeetech.com/";
  const canonicalUrl = `${baseUrl}/${locale === "en" ? "" : `${locale}/`}boosters`;
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
        <section className="bg-light-300">
          <NavigationWrapper locale={locale} />
          <div className="mx-auto max-w-[1568px] px-4 py-8 lg:pb-20 lg:pt-36">
            <div className="mb-8 flex items-start justify-between 2xl:mb-12">
              <Tag>{data.tag}</Tag>
            </div>

            <h1 className="mb-8 text-titleSmall text-primary-800 lg:mb-14 lg:text-titleMedium 2xl:mb-24 2xl:text-titleLarge">
              {data.description}
            </h1>

            <div className="flex flex-col gap-6">
              {data.products.map((product, index) => (
                <Link
                  href={product.url || "/"}
                  key={index}
                  className="flex w-full items-center gap-4 rounded-xl border border-light-500 bg-white px-4 py-3 transition hover:shadow-md"
                >
                  <div className="flex-shrink-0">
                    <Image
                      src={product.imageUrl}
                      alt={`Gif image from wimbee`}
                      width={320}
                      height={320}
                      className="h-40 w-40 rounded-lg object-cover sm:h-40 sm:w-40 md:h-40 md:w-40"
                    />
                  </div>

                  <div className="flex flex-1 flex-col gap-1">
                    <p className="font-mono text-base uppercase text-[#0F6FFF] sm:text-lg">
                      {product.name}
                    </p>
                    <p className="text-sm text-primary-500 sm:text-base">
                      {product.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>

          </div>
        </section>
        <Newsletter locale={locale} />
        <InfoSection locale={locale} />
        <Footer locale={locale} />
      </main>
    </TranslationsProvider>
  );
}

export default page;
