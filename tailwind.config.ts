import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        custom: '0 0 30px rgba(0, 0, 0, 0.5)',
      },
      fontFamily: {
        vazir: ['var(--font-vazir)']
      },
      container: {
        center: true,
        padding: '5px'
      },
      screens: {
        xs: '380px',
        xs2: '450px',
        xs3: '550px',
      },
      spacing: {
        '18' : '72px',
        '22' : '88px',
        '26' : '104px',
        '27' : '108px',
        '41' : '164px',
        '45' : '180px',
        '46' : '184px',
        '47' : '188px',
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
