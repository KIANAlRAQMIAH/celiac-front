import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem", // Default padding for all screen sizes
        sm: "1rem", // Small screens and up
        md: "2rem", // Medium screens and up
        lg: "4rem", // Large screens and up
      },
    },
  },
  plugins: [],
};
export default config;
