import { navigationQuery, boostersquery } from "@/sanity/groq";
import { sanityFetch } from "@/sanity/client";
import Navigation from "./Navigation";

async function NavigationWrapper({ locale = "en" }) {
  const nav = await sanityFetch({
    query: navigationQuery,
    qParams: { locale },
    tags: ["settings", "sector", "expertise"],
  });

  const boostersData = await sanityFetch({
    query: boostersquery,
    qParams: { locale },
    tags: ["booster"],
  });

  const menu = [
    {
      title: nav?.navigation?.expertisesLink?.title || "Expertises",
      type: "expertises",
      items:
        nav?.navigation?.navExpertises.map((item) => ({
          label: item.title,
          href: `/expertises/${item.slug}`,
        })) || [],
      dropDown: {
        title: nav?.navigation?.expertisesLink?.dropdownTitle,
      },
    },
    {
      title: nav?.navigation?.sectorsLink?.title || "Sectors",
      type: "sectors",
      items:
        nav?.navigation?.navSectors.map((item) => ({
          label: item.title,
          href: `/sectors/${item.slug}`,
        })) || [],
      dropDown: {
        title: nav?.navigation?.sectorsLink?.dropdownTitle,
      },
    },
    {
      title: boostersData?.title || "Boosters",
      type: "boosters",
      items:
        boostersData?.products.map((item) => ({
          label: item.name,
          href: `${item.url}`,
        })) || [],
      dropDown: {
        title: boostersData?.title,
      },
    },
    ...nav?.navigation?.links,
  ];

  return <Navigation menu={menu} content={nav?.navigation} />;
}

export default NavigationWrapper;
