/** @type {import('tailwindcss').Config} */
module.exports = {
  safelist: [
    "max-w-4xl",
    "max-w-[1520px]",
    "aspect-auto",
    "max-h-[808px]",
    "lg:text-4xl",
    "lg:leading-[52px]",
    "leading-[32px]",
    "mb-9",
    "lg:mb-20",
    // Add other classes that might be getting purged
  ],
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        main: ["var(--font-modern-gothic)"],
        mono: ["var(--font-modern-gothic-mono)"],
      },
      fontSize: {
        titleLarge: ["72px", "84px"],
        titleMedium: ["52px", "58px"],
        titleSmall: ["48px", "52px"],
      },
      colors: {
        primary: {
          400: "#A8E9EF",
          500: "#76848F",
          600: "#5F5F5F",
          700: "#3C4F5F",
          800: "#283139",
        },
        light: {
          200: "#FEF9F3",
          300: "#F3F3F3",
        },
        dark: "#1A1A1A",
      },
      borderRadius: {
        custom: "4px",
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      animation: {
        scroll: "scroll 40s linear infinite",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      keyframes: {
        scroll: {
          "0%": {
            transform: "translateX(0)",
          },
          "100%": {
            transform: "translateX(-100%)",
          },
        },
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
