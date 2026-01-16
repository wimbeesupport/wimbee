import localFont from "next/font/local";
import "./globals.css";

import i18nConfig from "@/i18nConfig";
import { dir } from "i18next";
import { settingsQuery } from "@/sanity/groq";
import { sanityFetch } from "@/sanity/client";
import { cookies } from "next/headers";
import Script from "next/script";
import CookieConsent from "@/components/CookieConsent";
import { Toaster } from "sonner";
import { Analytics } from "@vercel/analytics/next"

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
    revalidate: 60 * 60,
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

export function generateViewport() {
  return {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
  };
}

export function generateStaticParams() {
  return i18nConfig.locales.map((locale) => ({ locale }));
}

export default function RootLayout({ children, params: { locale } }) {
  const consent = cookies().get("cookie-consent")?.value;
  const initialOpen = consent !== "granted" && consent !== "denied";
  const policyHref = `/${locale}/privacy-policy`;

  return (
    <html lang={locale} dir={dir(locale)} className="max-w-screen overflow-x-hidden">
      <body
        suppressHydrationWarning={true}
        className={`${modernGothic.variable} ${modernGothicMono.variable} bg-light-200 font-main antialiased overflow-x-hidden`}
      >
        {children}
        <CookieConsent locale={locale} initialOpen={initialOpen} policyHref={policyHref} />
        <Toaster />
      </body>
    </html>
  );
}
