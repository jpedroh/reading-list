import type { Config } from "tailwindcss";
import tailwindCssAnimate from "tailwindcss-animate";
import tailwindCssReactAriaComponents from "tailwindcss-react-aria-components";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}", "./modules/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: "var(--font-inter)",
      },
    },
  },
  plugins: [tailwindCssReactAriaComponents, tailwindCssAnimate],
} satisfies Config;
