// import Tag from "../Tag";
// import Image from "next/image";
// import {
//   Accordion,
//   AccordionContent,
//   AccordionItem,
//   AccordionTrigger,
// } from "@/components/ui/accordion";
// import Link from "next/link";

// function SplitSection({
//   content,
//   type = "blog",
//   flipped = false,
//   variant = "default",
// }) {
//   if (!content) return null;

//   return (
//     <section
//       className={`${variant === "light" ? "bg-light-300" : variant === "primary" ? "bg-primary-800" : ""} `}
//     >
//       <div className="mx-auto max-w-[1568px] px-4 py-8 lg:pb-20 lg:pt-12">
//         <div className="mb-8 flex items-start justify-between lg:mb-14 2xl:mb-28">
//           <Tag bg={`${variant === "primary" && "light"}`}>{content.tag}</Tag>
//         </div>

//         <div
//           className={`flex items-center justify-between gap-6 lg:gap-20 ${
//             flipped
//               ? "flex-col-reverse lg:flex-row-reverse"
//               : "flex-col lg:flex-row"
//           }`}
//         >
//           <Accordion
//             type="single"
//             collapsible
//             defaultValue="item-0"
//             className="w-full text-primary-800 2xl:w-[720px]"
//           >
//             {content.items.map((post, index) => (
//               <AccordionItem
//                 key={index}
//                 value={`item-${index}`}
//                 className={`border-b border-primary-800 py-4 ${variant === "primary" && "border-primary-[#97CAFE]"}`}
//               >
//                 <AccordionTrigger className="group hover:no-underline">
//                   <div className="flex w-full items-center justify-between gap-1 font-medium">
//                     <p
//                       className={`text-left text-2xl lg:text-[28px] ${variant === "primary" && "text-light-200"}`}
//                     >
//                       {post.title}
//                     </p>
//                     <span
//                       className={`rounded-custom p-2 font-mono text-xs uppercase text-primary-700 transition-colors duration-200 ease-in-out group-data-[state=open]:bg-primary-400 lg:text-sm 2xl:text-lg ${variant === "primary" && "!text-[#0F6FFF]"}`}
//                     >
//                       retail
//                     </span>
//                   </div>
//                 </AccordionTrigger>
//                 <AccordionContent className="flex items-end justify-between">
//                   <p
//                     className={`pt-6 text-lg font-normal text-[#76848F] lg:text-xl ${variant === "primary" && "text-light-300"}`}
//                   >
//                     {post.summary}
//                   </p>

//                   <Link
//                     href={`/${type}/${post.slug.current}` || "/"}
//                     className={`min-w-fit text-xs uppercase ${variant === "primary" ? "text-light-300" : "text-primary-800"} underline-offset-2 transition-all hover:underline`}
//                   >
//                     Read more...
//                   </Link>
//                 </AccordionContent>
//               </AccordionItem>
//             ))}
//           </Accordion>
//           <Image
//             src={content.imageUrl}
//             width={600}
//             height={600}
//             alt="Introduction section of wimbee GIF"
//             className="aspect-square lg:max-w-[270px] 2xl:max-w-[580px]"
//           />
//         </div>
//       </div>
//     </section>
//   );
// }

// export default SplitSection;
"use client";

import { useState, useEffect } from "react";
import Tag from "../Tag";
import Image from "next/image";
import Link from "next/link";

import FilterBar from "../FilterBar";

function SplitSection({
  content,
  type = "blog",
  flipped = false,
  variant = "default",
  allCategories = [],
  allIndustries = [],
}) {
  const [hoveredIndex, setHoveredIndex] = useState(0);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [filteredItems, setFilteredItems] = useState([]);

  useEffect(() => {
    setIsInitialLoad(false);
    if (content?.items) {
      setFilteredItems(content.items);
    }
  }, [content]);

  const handleFilterChange = ({ categories, industries }) => {
    if (!content?.items) return;

    if (categories.length === 0 && industries.length === 0) {
      setFilteredItems(content.items);
      return;
    }

    const filtered = content.items.filter((item) => {
      const itemCategories = item.categories?.map((c) => c.title) || [];
      const itemIndustries = item.industries?.map((i) => i.title) || [];

      const matchesCategory =
        categories.length === 0 ||
        categories.some((cat) => itemCategories.includes(cat));

      const matchesIndustry =
        industries.length === 0 ||
        industries.some((ind) => itemIndustries.includes(ind));

      return matchesCategory && matchesIndustry;
    });

    setFilteredItems(filtered);
  };

  if (!content) return null;

  return (
    <section
      className={`${variant === "light" ? "bg-light-300" : variant === "primary" ? "bg-primary-800" : ""} `}
    >
      <div className="mx-auto max-w-[1568px] px-4 py-8 lg:pb-20 lg:pt-12">
        <div className="mb-8 flex items-start justify-between lg:mb-14 2xl:mb-28">
          <Tag bg={`${variant === "primary" && "light"}`}>{content?.tag}</Tag>
          {(allCategories.length > 0 || allIndustries.length > 0) && (
            <FilterBar
              categories={allCategories}
              industries={allIndustries}
              onFilterChange={handleFilterChange}
            />
          )}
        </div>

        <div
          className={`flex items-start justify-between gap-6 lg:gap-20 ${flipped
            ? "flex-col-reverse lg:flex-row-reverse"
            : "flex-col lg:flex-row"
            }`}
        >
          <div className="w-full text-primary-800 2xl:w-[720px]">
            {filteredItems.map((post, index) => {
              const categoryStyles =
                variant === "primary" && hoveredIndex !== index
                  ? "bg-light-200 !text-[#5D99FC]"
                  : variant === "primary" && hoveredIndex === index
                    ? "bg-primary-400 !text-[#0F6FFF]"
                    : variant !== "primary" && hoveredIndex === index
                      ? "bg-primary-400"
                      : "bg-light-200";

              return (
                <div
                  key={index}
                  className={`flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 lg:gap-6 border-b py-4 ${variant === "primary" ? "border-[#97CAFE]" : "border-primary-800"}`}
                  onMouseEnter={() => !isInitialLoad && setHoveredIndex(index)}
                  onMouseLeave={() => !isInitialLoad && setHoveredIndex(null)}
                >
                  <div className="flex w-full flex-col gap-1 font-medium">
                    <Link
                      href={`/${type}/${post.slug.current}` || "/"}
                      className={`text-left text-2xl lg:text-[28px] ${variant === "primary" && "text-light-200"}`}
                    >
                      {post.title}
                    </Link>

                    <div
                      className={`flex items-end justify-between overflow-hidden transition-all duration-300 ease-in-out ${hoveredIndex === index
                        ? "max-h-96 opacity-100"
                        : "max-h-0 opacity-0"
                        }`}
                    >
                      <p
                        className={`pt-6 text-lg font-normal text-[#76848F] lg:text-xl ${variant === "primary" && "text-light-300"}`}
                      >
                        {post.summary}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 lg:flex-col lg:items-end">
                    {post?.categories?.map((category, i) => (
                      <span
                        key={`cat-${i}`}
                        className={`w-fit whitespace-nowrap rounded-custom p-2 font-mono text-xs uppercase text-primary-700 transition-colors duration-200 ease-in-out lg:text-sm 2xl:text-lg ${categoryStyles}`}
                      >
                        {category.title}
                      </span>
                    ))}
                    {post?.industries?.map((industry, i) => (
                      <span
                        key={`ind-${i}`}
                        className={`w-fit whitespace-nowrap rounded-custom p-2 font-mono text-xs uppercase text-primary-700 transition-colors duration-200 ease-in-out lg:text-sm 2xl:text-lg ${categoryStyles}`}
                      >
                        {industry.title}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
          <Image
            src={content?.imageUrl || "/images/france.jpg"}
            width={600}
            height={600}
            alt="Introduction section of wimbee GIF"
            className="aspect-square rounded-custom lg:max-w-[270px] 2xl:max-w-[580px]"
          />
        </div>
      </div>
    </section>
  );
}

export default SplitSection;
