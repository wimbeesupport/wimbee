import { navigationQuery } from "@/sanity/groq";
import { sanityFetch } from "@/sanity/client";
import Navigation from "./Navigation";

async function NavigationWrapper({ locale = "en" }) {
  const nav = await sanityFetch({
    query: navigationQuery,
    qParams: { locale },
    tags: ["navigation", "sector", "expertise"],
  });

  const menu = [
    {
      title: "Expertises",
      type: "expertises",
      items:
        nav?.navigation?.navExpertises.map((item) => ({
          label: item.title,
          href: `/expertises/${item.slug}`,
        })) || [],
      dropDown: {
        title: nav?.navigation?.expertisesLink?.dropdownTitle,
        image: nav?.navigation?.expertisesLink?.imageUrl,
      },
    },
    {
      title: "Sectors",
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
    { title: nav?.navigation?.boostersLink, href: "/boosters" },
    { title: nav?.navigation?.aboutLink, href: "/about" },
  ];

  return <Navigation menu={menu} content={nav?.navigation} />;
}

export default NavigationWrapper;
