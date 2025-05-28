import Footer from "@/components/Footer";
import InfoSection from "@/components/InfoSection";
import Newsletter from "@/components/Newsletter";
import Image from "next/image";

import Tag from "@/components/Tag";
import { sanityFetch } from "@/sanity/client";
import { ecosystemsQuery } from "@/sanity/groq";
import NavigationWrapper from "@/components/NavigationWrapper";
import { groq, PortableText } from "next-sanity";
import { MiniPortableText } from "@/lib/utils";
import TranslationsProvider from "@/components/TranslationsProvider";
import initTranslations from "@/app/i18n";
import Head from "next/head";

// Dynamic metadata
export async function generateMetadata({ params: { locale } }) {
  const data = await sanityFetch({
    query: groq`*[_type == "ecosystems"][0]{
      seo {
        "title": coalesce(title[_key == $locale][0].value, title[_key == "en"][0].value),
        "description": coalesce(description[_key == $locale][0].value, description[_key == "en"][0].value)
      }
    }`,
    qParams: { locale },
    tags: ["ecosystems"],
  });

  return {
    title: data?.seo?.title || "Welcome — Wimbee",
    description: data?.seo?.description || "Welcome — Wimbee",
  };
}

export const revalidate = 2592000; // 30 days in seconds

const i18nNamespaces = ["ecosystems", "errors"];

async function page({ params: { locale } }) {
  const { t, resources } = await initTranslations(locale, i18nNamespaces);

  const data = await sanityFetch({
    query: ecosystemsQuery,
    qParams: { locale },
    tags: ["ecosystems"],
  });

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://wimbeetech.com/";
  const canonicalUrl = `${baseUrl}/${locale === "en" ? "" : `${locale}/`}ecosystems`;

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

            <div className="mb-8 text-titleSmall text-primary-800 lg:mb-14 lg:text-titleMedium 2xl:mb-14 2xl:text-titleLarge">
              {data?.title?.split(":").map((part, index) => (
                <h1 key={index}>
                  {part}
                  {index === 0 && ":"}
                  {index === 0 && <br />}
                </h1>
              ))}
            </div>
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
        <section className="mx-auto max-w-[1568px] px-4 pb-16 lg:pb-20 2xl:pb-28">
          <h2 className="mb-8 text-titleSmall text-primary-800 lg:mb-14 lg:text-titleMedium 2xl:mb-14 2xl:text-titleLarge">
            {data?.platformSection?.title}
          </h2>
          <div className="flex flex-col items-start justify-between gap-8 md:flex-row lg:gap-16">
            <div className="flex max-w-96 flex-col gap-8 text-lg text-primary-500">
              {data?.platformSection?.sideText?.map((p, index) => (
                <p key={index}>{p.text}</p>
              ))}
            </div>
            <div className="!font-medium text-primary-500 *:!text-2xl">
              <PortableText
                value={data?.platformSection?.mainText}
                components={MiniPortableText}
              />
            </div>
          </div>
        </section>

        <section className="bg-primary-700 py-8 lg:pb-20 lg:pt-12">
          <div className="mx-auto max-w-[1568px] px-4">
            <div className="mb-8 flex items-start justify-between lg:mb-9 2xl:mb-36">
              <Tag>{data?.featuresSection?.tag}</Tag>
            </div>
            <ul className="ml-auto w-full text-2xl font-medium text-light-200 lg:text-3xl 2xl:w-[60%]">
              {data?.featuresSection?.features.map((feature, index) => (
                <li key={index}>
                  <p className="group flex cursor-pointer items-center justify-between gap-6 border-b border-primary-500 py-4 transition-all duration-300 hover:text-primary-400">
                    <span>{feature.feature}</span>
                    <span className="size-4 flex-shrink-0 rounded-full bg-primary-500 transition-all group-hover:bg-[#97CAFE]" />
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>
        <section className="mx-auto max-w-[1568px] px-4 pb-16 lg:pb-20 2xl:pb-28">
          <h2 className="mb-12 pt-4 text-titleSmall text-primary-800 lg:mb-14 lg:pt-5 lg:text-titleMedium 2xl:mb-28 2xl:pt-10 2xl:text-titleLarge">
            {data?.partnersSection?.title}
          </h2>
          <div className="!font-medium text-primary-500 *:!text-2xl">
            <PortableText
              value={data?.partnersSection?.mainText}
              components={MiniPortableText}
            />
          </div>
          <Image
            src={data?.partnersSection?.imageUrl}
            width={2000}
            height={2000}
            alt="Wimbee careers image"
            className="mb-4 h-96 w-full rounded-custom object-cover lg:mb-14 lg:h-[720px]"
          />
        </section>

        <Newsletter locale={locale} />
        <InfoSection locale={locale} />
        <Footer locale={locale} />
      </main>
    </TranslationsProvider>
  );
}

export default page;
