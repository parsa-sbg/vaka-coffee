import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        vazir: ['var(--font-vazir)']
      },
      container: {
        center: true,
        padding: '5px'
      },
      screens: {
        xs: '380px'
      },
      colors: {
        main: "#D19960",
        maindark: "#A2461F",
        bgColer: "#1b1b1b",
        secondary: "#333"
      },
    },
  },
  plugins: [],
};
export default config;
