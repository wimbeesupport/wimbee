import Footer from "@/components/Footer";
import InfoSection from "@/components/InfoSection";
import Newsletter from "@/components/Newsletter";
import Image from "next/image";

import Tag from "@/components/Tag";
import { sanityFetch } from "@/sanity/client";
import { careersQuery } from "@/sanity/groq";
import NavigationWrapper from "@/components/NavigationWrapper";
import { groq, PortableText } from "next-sanity";
import { MiniPortableText } from "@/lib/utils";
import TranslationsProvider from "@/components/TranslationsProvider";
import initTranslations from "@/app/i18n";
import Link from "next/link";
import Head from "next/head";

// Dynamic metadata
export async function generateMetadata({ params: { locale } }) {
  const data = await sanityFetch({
    query: groq`*[_type == "careers"][0]{
      seo {
        "title": coalesce(title[_key == $locale][0].value, title[_key == "en"][0].value),
        "description": coalesce(description[_key == $locale][0].value, description[_key == "en"][0].value)
      }
    }`,
    qParams: { locale },
    tags: ["careers"],
  });

  return {
    title: data?.seo?.title || "Welcome — Wimbee",
    description: data?.seo?.description || "Welcome — Wimbee",
  };
}

export const revalidate = 2592000; // 30 days in seconds

const i18nNamespaces = ["careers", "errors"];

async function page({ params: { locale } }) {
  const { t, resources } = await initTranslations(locale, i18nNamespaces);

  const data = await sanityFetch({
    query: careersQuery,
    qParams: { locale },
    tags: ["careers"],
  });

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://wimbeetech.com/";
  const canonicalUrl = `${baseUrl}/${locale === "en" ? "" : `${locale}/`}careers`;

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
      <main className="bg-light-300">
        <section>
          <NavigationWrapper locale={locale} />
          <div className="mx-auto max-w-[1568px] px-4 py-24 lg:pb-20 lg:pt-36">
            <div className="mb-8 flex items-start justify-between 2xl:mb-12">
              <Tag>{data?.tag}</Tag>
            </div>

            <h1 className="mb-8 text-titleSmall text-primary-800 lg:mb-14 lg:text-titleMedium 2xl:mb-14 2xl:text-titleLarge">
              {data?.title}
            </h1>
            <Image
              src={data?.imageUrl}
              width={2000}
              height={2000}
              alt="Wimbee careers image"
              className="mb-12 h-96 w-full rounded-custom object-cover lg:mb-14 lg:h-[720px] 2xl:mb-28"
            />
            <div className="flex flex-col items-start justify-between gap-8 md:flex-row lg:gap-16">
              <div className="flex max-w-96 flex-col gap-8 text-lg text-primary-500">
                {data?.sideText?.map((p, index) => (
                  <p key={index}>{p.text}</p>
                ))}
              </div>
              <div className="!font-medium text-primary-500 *:!text-2xl">
                <PortableText
                  value={data?.mainText}
                  components={MiniPortableText}
                />
              </div>
            </div>
          </div>
        </section>
        {data?.positionsSection && (
          <section className="mx-auto max-w-[1568px] px-4 pb-16 lg:pb-20 2xl:pb-28">
            <div className="mb-8 flex items-start justify-between 2xl:mb-12">
              <Tag>{data?.positionsSection?.tag}</Tag>
            </div>
            <div className="w-full flex-col">
              {data?.positionsSection?.positions?.map((position, index) => (
                <div
                  key={index}
                  className="flex w-fit flex-col border-b border-primary-500 py-4"
                >
                  <div className="flex items-start gap-5 lg:gap-20">
                    <p className="mb-6 text-2xl text-primary-700 2xl:text-3xl">
                      {position.title}
                    </p>
                    <Link
                      href={position?.url || "/"}
                      target="_blank"
                      className="h-auto rounded-custom px-1 py-0.5 text-xs font-medium text-primary-700 hover:bg-primary-800 hover:text-primary-400 lg:text-lg"
                    >
                      Apply
                    </Link>
                  </div>
                  <div className="flex w-full items-center gap-3 font-mono text-sm uppercase text-primary-500/70">
                    <span>{position.date},</span>
                    <span>{position.place},</span>
                    <span>{position.company}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        <Newsletter locale={locale} />
        <InfoSection locale={locale} />
        <Footer locale={locale} />
      </main>
    </TranslationsProvider>
  );
}

export default page;
