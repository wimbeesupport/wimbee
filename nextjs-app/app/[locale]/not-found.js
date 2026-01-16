"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const SUPPORTED_LOCALES = ["en", "fr"];

function getLocaleFromPath(pathname) {
  if (!pathname) return "en";

  const pathWithoutQuery = pathname.split("?")[0];
  const segments = pathWithoutQuery.split("/").filter(Boolean);
  const first = segments[0];

  if (SUPPORTED_LOCALES.includes(first)) {
    return first;
  }

  return "en";
}

export default function NotFound() {
  const pathname = usePathname();
  const locale = getLocaleFromPath(pathname);

  const fallbackTexts =
    locale === "fr"
      ? {
        title: "Cette page est introuvable 😓",
        subtitle:
          "La page que vous cherchez n'existe pas ou a été déplacée.",
        buttonLabel: "Retour à l'accueil",
      }
      : {
        title: "This page could not be found 😓",
        subtitle:
          "The page you're looking for doesn't exist or has been moved.",
        buttonLabel: "Go back home",
      };

  const { title, subtitle, buttonLabel } = fallbackTexts;
  const illustrationUrl = null;

  const homeHref = locale === "en" ? "/" : `/${locale}`;

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-light-300 px-4 py-24 text-center text-primary-800">
      {illustrationUrl && (
        <div className="mb-10 w-full max-w-md">
          <img
            src={illustrationUrl}
            alt={title}
            className="mx-auto h-auto w-full max-w-xs lg:max-w-md"
          />
        </div>
      )}

      <h1 className="mb-6 text-3xl font-semibold lg:text-5xl">
        {title}
      </h1>

      {subtitle && (
        <p className="mb-10 max-w-xl text-base text-primary-700 lg:text-lg">
          {subtitle}
        </p>
      )}

      <Link
        href={homeHref}
        className="inline-block w-fit rounded-md bg-primary-800 px-6 py-3 text-lg text-primary-400 transition-all duration-300 hover:bg-primary-800/95"
      >
        {buttonLabel}
      </Link>
    </main>
  );
}
