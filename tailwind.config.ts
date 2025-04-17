import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
    },
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        DM: ["DM Sans", "sans-serif"],
        clash: ["Clash Display", "sans-serif"],
        clashDisplay: ['var(--font-clashDisplay)'],
        jakarta: ['var(--font-plus-jakarta)', 'sans-serif'],
        sans: ['var(--font-geist-sans)'],
        mono: ['var(--font-geist-mono)'],
      },
      backgroundImage: {
        "auth-bg": "url('/svg/auth-bg.svg')",
        "hero-bg": "url('/svg/hero-bg.svg')",
        "about-bg": "url('/svg/about-bg.svg')",
        "service-bg": "url('/svg/service-bg.svg')",
        "contact-bg": "url('/svg/contact-bg.svg')",
        "dash-hero-bg": "url('/svg/property-hero.svg')",
      },
      keyframes: {
        "caret-blink": {
          "0%,70%,100%": { opacity: "1" },
          "20%,50%": { opacity: "0" },
        },
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "caret-blink": "caret-blink 1.25s ease-out infinite",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
    screens: {
      xxs: "320px",

      xsm: "450px",

      sm: "640px",
      // => @media (min-width: 640px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      lg: "1024px",
      // => @media (min-width: 1024px) { ... }

      xl: "1280px",
      // => @media (min-width: 1280px) { ... }

      "2xl": "1536px",
      // => @media (min-width: 1536px) { ... }
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
