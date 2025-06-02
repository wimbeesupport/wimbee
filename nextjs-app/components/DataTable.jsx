"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { HiMenuAlt4 } from "react-icons/hi";
import { IoClose } from "react-icons/io5";

function DataTable({ content, name = "", type = "" }) {
  const [isOpen, setIsOpen] = useState(false);
  const [height, setHeight] = useState("0px");
  const ref = useRef(null);

  useEffect(() => {
    if (isOpen) {
      const height = ref.current?.scrollHeight;
      setHeight(`${height}px`);
    } else {
      setHeight("0px");
    }
  }, [isOpen]);

  return (
    <div className="top-20 w-full self-start lg:sticky lg:w-fit">
      <div className="rounded-custom bg-primary-700 p-4">
        <p className="flex items-center justify-between font-mono uppercase text-light-300 lg:mb-6">
          <span className="pl-2 lg:text-xl">{name}</span>
          <button
            onClick={() => setIsOpen((state) => !state)}
            className="hover:bg-primary-100 flex h-[34px] items-center rounded-[4px] bg-white px-2 text-primary-700 transition-colors duration-200 lg:hidden"
            aria-expanded={isOpen}
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? <IoClose size={28} /> : <HiMenuAlt4 size={28} />}
          </button>
        </p>
        <nav
          ref={ref}
          className="overflow-hidden transition-all duration-300 ease-in-out lg:!h-auto lg:overflow-visible"
          style={{ height: isOpen ? height : "0px" }}
        >
          <div className="flex min-w-72 flex-col gap-1">
            {content.allLinks.map((item, index) => (
              <Link
                key={index}
                href={`/${type}/${item.slug}`}
                className={`text rounded-custom p-2 text-sm transition-all hover:bg-primary-800 hover:text-primary-400 2xl:text-base ${
                  content.title === item.title
                    ? "bg-primary-800 text-primary-400"
                    : "bg-primary-700 text-[#97CAFE]"
                }`}
              >
                {item.title}
              </Link>
            ))}
          </div>
        </nav>
      </div>
    </div>
  );
}

export default DataTable;
