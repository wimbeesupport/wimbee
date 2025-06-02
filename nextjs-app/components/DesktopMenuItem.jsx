"use client";

import Link from "next/link";
import { useState } from "react";

export function DesktopMenuItem({ item }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const sharedClasses =
    "rounded-[4px] mx-1 px-2 text-lg font-medium text-primary-800 transition-all hover:bg-primary-800 hover:text-primary-400 inline-block";

  if (!item.items) {
    return (
      <Link href={item.href || "/"} className={sharedClasses}>
        {item.title}
      </Link>
    );
  }

  return (
    <div
      className=""
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button
        className={`${sharedClasses} outline-none data-[state=open]:bg-primary-800 data-[state=open]:text-primary-400`}
      >
        {item.title}
      </button>
      <div
        className={`absolute z-10 mt-2 max-w-xl rounded-custom bg-white p-6 ${isOpen ? "block" : "hidden"}`}
      >
        {/* Pseudo-element to cover the gap */}
        <div className="absolute left-0 right-0 top-[-8px] h-2" />
        <div className="absolute left-0 right-0 top-[-10px] h-[10px]"></div>

        <div className="px-0 font-main text-xl font-medium text-primary-800">
          <span>{item.dropDown.title}</span>
        </div>

        <div className={`flex flex-col items-start`}>
          <div className="flex max-w-md flex-col text-primary-800">
            {item.items.map((subItem, index) => (
              <Link
                key={index}
                href={subItem.href}
                className="group flex w-full items-center justify-between gap-10 border-b border-light-300 py-5 text-xl"
              >
                <span>{subItem.label}</span>
                <span className="size-4 flex-shrink-0 rounded-full bg-primary-800 opacity-0 transition-all group-hover:visible group-hover:opacity-100" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
