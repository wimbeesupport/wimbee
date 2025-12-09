import initTranslations from "@/app/i18n";
import Footer from "@/components/Footer";
import InfoSection from "@/components/InfoSection";
import NavigationWrapper from "@/components/NavigationWrapper";
import Newsletter from "@/components/Newsletter";
import Tag from "@/components/Tag";
import TranslationsProvider from "@/components/TranslationsProvider";
import { sanityFetch } from "@/sanity/client";
import { boosterPageQuery } from "@/sanity/groq";
import { groq } from "next-sanity";
import Head from "next/head";
import Link from "next/link";

// Dynamic metadata
export async function generateMetadata({ params: { locale } }) {
    const data = await sanityFetch({
        query: groq`*[_type == "booster-page"][0]{
      seo {
        "title": coalesce(title[_key == $locale][0].value, title[_key == "en"][0].value),
        "description": coalesce(description[_key == $locale][0].value, description[_key == "en"][0].value)
      }
    }`,
        qParams: { locale },
        tags: ["booster-page"],
    });

    return {
        title: data?.seo?.title || "Boosters — Wimbee",
        description: data?.seo?.description || "Discover our innovative boosters",
    };
}

export const revalidate = 2592000; // 30 days in seconds

const i18nNamespaces = ["booster", "errors"];

async function page({ params: { locale } }) {
    const { t, resources } = await initTranslations(locale, i18nNamespaces);

    const data = await sanityFetch({
        query: boosterPageQuery,
        qParams: { locale },
        tags: ["booster-page", "booster"],
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
                            {data.title}
                        </h1>

                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {data.items?.map((booster, index) => (
                                <Link
                                    href={`/boosters/${booster.slug}`}
                                    key={index}
                                    className="group flex flex-col gap-4 rounded-custom border border-light-500 bg-white p-6 transition hover:shadow-lg"
                                >
                                    <h2 className="text-2xl font-medium text-primary-800 group-hover:text-primary-600">
                                        {booster.title}
                                    </h2>
                                    <div className="text-primary-500 line-clamp-3">
                                        {booster.body?.[0]?.children?.[0]?.text || ""}
                                    </div>
                                    <span className="mt-auto text-sm font-medium text-primary-600">
                                        Learn more →
                                    </span>
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
