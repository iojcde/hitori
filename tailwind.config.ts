import type { Config } from "tailwindcss";

import { createPlugin } from "windy-radix-palette";

const colors = createPlugin({});
const alias = colors.alias;

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./milkdown/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: {
        xl: "70rem",
      },
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: () => ({
        border: alias("gray", 4),
        input: alias("gray", 6),
        ring: alias("gray", 7),
        background: alias("gray", 1),
        foreground: alias("gray", 12),
        primary: {
          DEFAULT: alias("gray", 12),
          foreground: alias("gray", 1),
        },
        secondary: {
          DEFAULT: alias("gray", 6),
          foreground: alias("gray", 12),
        },
        destructive: {
          DEFAULT: alias("red", 6),
          foreground: alias("red", 11),
        },
        muted: {
          DEFAULT: alias("gray", 3),
          foreground: alias("gray", 11),
        },
        accent: {
          // DEFAULT: `${alias("gray", 3)}/80`,
          DEFAULT: "var(--gray4)",
          foreground: alias("gray", 12),
        },
        popover: {
          DEFAULT: alias("gray", 1),
          foreground: alias("gray", 12),
        },
        card: {
          DEFAULT: alias("gray", 1),
          foreground: alias("gray", 12),
        },
      }),
      borderRadius: {
        lg: `var(--radius)`,
        md: `calc(var(--radius) - 2px)`,
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      typography: ({ theme }: { theme: (key: string) => string }) => {
        return {
          radix: {
            css: {
              "--tw-prose-body": theme(`colors.gray.12`),
              "--tw-prose-headings": theme(`colors.gray.12`),
              "--tw-prose-lead": theme(`colors.gray.11`),
              "--tw-prose-links": theme(`colors.blue.12`),
              "--tw-prose-bold": theme(`colors.gray.12`),
              "--tw-prose-counters": theme(`colors.gray.10`),
              "--tw-prose-bullets": theme(`colors.gray.8`),
              "--tw-prose-hr": theme(`colors.gray.6`),
              "--tw-prose-quotes": theme(`colors.gray.11`),
              "--tw-prose-quote-borders": theme(`colors.gray.6`),
              "--tw-prose-captions": theme(`colors.gray.11`),
              "--tw-prose-code": theme(`colors.gray.12`),
              "--tw-prose-pre-code": theme(`colors.gray.2`),
              "--tw-prose-pre-bg": theme(`colors.gray.2`),
              "--tw-prose-th-borders": theme(`colors.gray.6`),
              "--tw-prose-td-borders": theme(`colors.gray.6`),
            },
          },
        };
      },
    },
  },
  plugins: [
    colors.plugin,
    require("@tailwindcss/typography"),
    require("tailwindcss-animate"),
  ],
};
export default config;
