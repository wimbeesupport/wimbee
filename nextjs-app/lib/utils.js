import { urlFor } from "@/sanity/sanity-img";
import { clsx } from "clsx";
import Image from "next/image";
import Link from "next/link";
import { twMerge } from "tailwind-merge";

import Carousel from "@/components/Carousel";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

//
export const myPortableTextComponents = {
  types: {
    carousel: ({ value }) => {
      return <Carousel value={value} />;
    },
    image: ({ value }) => {
      return (
        <>
          <Image
            src={urlFor(value).url()}
            alt="Image"
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: "100%", height: "auto" }}
            className="mb-8 w-full rounded-custom lg:hidden"
          />
          <Image
            src={urlFor(value).url()}
            alt="Image"
            width={800}
            height={800}
            className="mb-10 hidden h-[620px] w-full rounded-custom object-cover object-center lg:block 2xl:mb-20"
          />
        </>
      );
    },
  },

  marks: {
    em: ({ children }) => (
      <em className="font-medium text-primary-800">{children}</em>
    ),
    strong: ({ children }) => (
      <strong className="font-medium text-primary-800">{children}</strong>
    ),

    link: ({ children, value }) => {
      const rel = !value.href.startsWith("/")
        ? "noreferrer noopener"
        : undefined;
      return (
        <Link
          href={value.href}
          rel={rel}
          id=""
          className="text-neutral-800 underline underline-offset-2"
        >
          {children}
        </Link>
      );
    },
  },

  block: {
    // Ex. 1: customizing common block types
    h1: ({ children, node }) => (
      <h1
        id={node?._key}
        className="mb-8 max-w-7xl text-titleSmall text-primary-800 lg:mb-10 lg:text-titleMedium 2xl:mb-20 2xl:text-titleLarge"
      >
        {children}
      </h1>
    ),
    h2: ({ children, node }) => (
      <h2
        id={node?._key}
        className="mb-10 font-main text-3xl font-medium text-primary-800"
      >
        {children}
      </h2>
    ),
    h3: ({ children, node }) => (
      <h3
        id={node?._key}
        className="mb-10 font-main text-2xl font-medium text-primary-800"
      >
        {children}
      </h3>
    ),
    h4: ({ children, node }) => (
      <h4
        id={node?._key}
        className="mb-1 font-main text-lg font-medium text-primary-800 lg:text-xl"
      >
        {children}
      </h4>
    ),
    blockquote: ({ children }) => {
      return (
        <blockquote className="mb-9 text-3xl leading-[32px] text-primary-500 lg:mb-20 lg:text-4xl lg:leading-[52px]">
          {children}
        </blockquote>
      );
    },

    // Styling for normal text
    normal: ({ children, index, value, next }) => {
      return (
        <p className="mb-8 text-base leading-relaxed lg:text-xl 2xl:mb-20">
          {children}
        </p>
      );
    },
  },
  list: {
    // Ex. 1: customizing common list types
    bullet: ({ children }) => (
      <ul
        className="text-base leading-relaxed lg:text-xl"
        style={{
          paddingLeft: "1.125rem",
          maxWidth: "56rem",
          display: "flex",
          flexDirection: "column",
          gap: "1.25rem",
          listStyleType: "disc",
        }}
      >
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol
        className="text-base leading-relaxed lg:text-xl"
        style={{
          paddingLeft: "1.125rem",
          maxWidth: "56rem",
          display: "flex",
          flexDirection: "column",
          gap: "1.25rem",
          listStyleType: "disc",
        }}
      >
        {children}
      </ol>
    ),
  },
};
//

export const MiniPortableText = {
  types: {
    carousel: ({ value }) => {
      return <Carousel value={value} />;
    },
    image: ({ value }) => {
      return (
        <Image
          src={urlFor(value).url()}
          alt="Image"
          width={1200}
          height={1200}
          className="mx-auto mb-8 block h-24 w-full rounded-custom object-cover object-center lg:mb-10 2xl:mb-20"
        />
      );
    },
  },

  marks: {
    em: ({ children }) => (
      <em className="mx-auto max-w-4xl font-medium text-primary-800">
        {children}
      </em>
    ),
    strong: ({ children }) => (
      <strong className="mx-auto max-w-4xl font-medium text-primary-800">
        {children}
      </strong>
    ),

    link: ({ children, value }) => {
      const rel = !value.href.startsWith("/")
        ? "noreferrer noopener"
        : undefined;
      return (
        <Link
          href={value.href}
          rel={rel}
          id=""
          className="mx-auto max-w-4xl text-neutral-800 underline underline-offset-2"
        >
          {children}
        </Link>
      );
    },
  },

  block: {
    // Ex. 1: customizing common block types
    h1: ({ children, node }) => (
      <h1
        id={node?._key}
        className="mx-auto mb-8 w-full text-titleSmall text-primary-800 lg:mb-10 lg:text-titleMedium 2xl:mb-20 2xl:text-titleLarge"
      >
        {children}
      </h1>
    ),
    h2: ({ children, node }) => (
      <h2
        id={node?._key}
        className="mx-auto mb-10 max-w-4xl font-main text-3xl font-medium text-primary-800"
      >
        {children}
      </h2>
    ),
    h3: ({ children, node }) => (
      <h3
        id={node?._key}
        className="mx-auto mb-10 max-w-3xl font-main text-3xl font-medium text-primary-800"
      >
        {children}
      </h3>
    ),
    h4: ({ children, node }) => (
      <h4
        id={node?._key}
        className="mx-auto mb-1 max-w-4xl font-main text-lg font-medium text-primary-800 lg:text-xl"
      >
        {children}
      </h4>
    ),
    blockquote: ({ children }) => {
      return (
        <blockquote className="mb-9 text-3xl leading-[32px] text-primary-500 lg:mb-20 lg:text-4xl lg:leading-[52px]">
          {children}
        </blockquote>
      );
    },

    // Styling for normal text
    normal: ({ children, index, value, next }) => {
      return (
        <p className="mx-auto mb-8 max-w-4xl text-base leading-relaxed lg:text-xl 2xl:mb-20">
          {children}
        </p>
      );
    },
  },
  list: {
    // Ex. 1: customizing common list types
    bullet: ({ children }) => (
      <ul
        className="mx-auto max-w-4xl text-base leading-relaxed lg:text-xl"
        style={{
          paddingLeft: "1.125rem",
          maxWidth: "56rem",
          display: "flex",
          flexDirection: "column",
          gap: "1.25rem",
          listStyleType: "disc",
        }}
      >
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol
        className="mx-auto max-w-4xl text-base leading-relaxed lg:text-xl"
        style={{
          paddingLeft: "1.125rem",
          maxWidth: "56rem",
          display: "flex",
          flexDirection: "column",
          gap: "1.25rem",
          listStyleType: "disc",
        }}
      >
        {children}
      </ol>
    ),
  },
};
