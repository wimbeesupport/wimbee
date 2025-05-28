import localFont from "next/font/local";
import "./globals.css";

import i18nConfig from "@/i18nConfig";
import { dir } from "i18next";
import { settingsQuery } from "@/sanity/groq";
import { sanityFetch } from "@/sanity/client";

export const modernGothic = localFont({
  src: [
    {
      path: "../fonts/ModernGothic/ModernGothic-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/ModernGothic/ModernGothic-Medium.woff2",
      weight: "500",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-modern-gothic",
});

export const modernGothicMono = localFont({
  src: [
    {
      path: "../fonts/ModernGothic/ModernGothicMono-Medium.woff2",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-modern-gothic-mono",
});

// Dynamic metadata
export async function generateMetadata({ params: { locale } }) {
  const data = await sanityFetch({
    query: settingsQuery,
    qParams: { locale },
    tags: ["settings"],
  });

  return {
    title: {
      default: data?.defaultTitle || "Welcome — Wimbee",
    },
    description:
      data?.description ||
      "A team at the heart of your Data & Digital strategy. Business experts, functional experts, consultants and technical developers who master market innovations and solutions. A team with strong experience and major references serving your projects and programs around Data & Digital.",
    icons: {
      icon: [data?.imageUrl || "/favicon.png"],
    },
    robots:
      process.env.NEXT_PUBLIC_ENV === "production"
        ? { index: true, follow: true }
        : { index: false, follow: false },
  };
}

export function generateStaticParams() {
  return i18nConfig.locales.map((locale) => ({ locale }));
}

export default function RootLayout({ children, params: { locale } }) {
  return (
    <html lang={locale} dir={dir(locale)}>
      <body
        suppressHydrationWarning={true}
        className={`${modernGothic.variable} ${modernGothicMono.variable} bg-light-200 font-main antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
