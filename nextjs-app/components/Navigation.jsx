"use client";

import { useState, useEffect, useRef } from "react";
import { IoClose, IoMenu } from "react-icons/io5";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import LanguageChanger from "./LanguageChanger";
import ContactBtn from "./ContactBtn";
import { DesktopMenuItem } from "./DesktopMenuItem";
import { MobileMenuItem } from "./MobileMenuItem";
import Link from "next/link";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

function Navigation({ menu, content }) {
  const [navIsOpen, setNavIsOpen] = useState(false);
  const headerRef = useRef(null);

  useEffect(() => {
    const header = headerRef.current;
    const homeHero = document.querySelector(".hero-section");

    let stInstance;

    header.classList.add("bg-transparent");
    header.classList.remove("bg-light-300");

    if (homeHero) {
      stInstance = ScrollTrigger.create({
        trigger: homeHero,
        start: "bottom top",
        end: "bottom top",
        onEnter: () => {
          if (headerRef.current) {
            header.classList.remove("bg-transparent");
            header.classList.add("bg-light-300");
          }
        },
        onLeaveBack: () => {
          if (headerRef.current) {
            header.classList.add("bg-transparent");
            header.classList.remove("bg-light-300");
          }
        },
      });

      // Fix Safari issues
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 500);
    } else {
      // Apply bg-light-300 on all other pages
      header.classList.remove("bg-transparent");
      header.classList.add("bg-light-300");
    }

    return () => {
      if (stInstance) stInstance.kill();
    };
  }, []);

  // Effect for hiding/showing the header on scroll
  // useEffect(() => {
  //   let lastScrollTop = 0;

  //   const handleScroll = () => {
  //     const scrollTop = document.documentElement.scrollTop;

  //     if (window.innerWidth > 768) {
  //       if (scrollTop > lastScrollTop) {
  //         // Hide header
  //         if (headerRef.current) {
  //           headerRef.current.style.transform = "translateY(-100%)";
  //         }
  //       } else {
  //         // Show header
  //         if (headerRef.current) {
  //           headerRef.current.style.transform = "translateY(0)";
  //         }
  //       }
  //     }

  //     lastScrollTop = scrollTop;
  //   };

  //   window.addEventListener("scroll", handleScroll, { passive: true });

  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // }, []);

  return (
    <header
      ref={headerRef}
      className="fixed left-0 right-0 top-0 z-20 transition-all duration-300"
    >
      <div className="mx-auto flex max-w-[1568px] items-center justify-between p-4 2xl:py-6">
        <nav className="flex items-center gap-20">
          <Link href="/">
            <Image
              width={600}
              height={600}
              src={content?.imageUrl}
              alt="Wimbee logo"
              className="max-w-20 lg:max-w-32"
            />
          </Link>
          <ul className="hidden h-[34px] items-center rounded-[4px] bg-white lg:flex">
            {menu.map((item, index) => (
              <li key={index}>
                <DesktopMenuItem item={item} />
              </li>
            ))}
          </ul>
        </nav>

        <nav className="flex items-center gap-2">
          <div className="hidden lg:block">
            <LanguageChanger />
          </div>
          <ContactBtn label={content?.buttonText} />
          <button
            className="hover:bg-primary-100 flex h-[34px] items-center rounded-[4px] bg-white px-2 text-primary-700 transition-colors duration-200 lg:hidden"
            onClick={() => setNavIsOpen((current) => !current)}
          >
            {navIsOpen ? <IoClose size={28} /> : <IoMenu size={28} />}
          </button>
          <div
            className={`absolute left-1/2 top-16 z-20 w-[95%] -translate-x-1/2 rounded-custom bg-light-300 px-3 py-2 transition-all duration-300 ease-in-out lg:hidden ${
              navIsOpen
                ? "translate-y-0 opacity-100"
                : "pointer-events-none -translate-y-4 opacity-0"
            }`}
          >
            {menu.map((item, index) => (
              <MobileMenuItem key={index} item={item} />
            ))}
            <div className="mt-2 flex items-center justify-end">
              <LanguageChanger />
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Navigation;
