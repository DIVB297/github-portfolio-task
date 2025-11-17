import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        github: {
          bg: '#ffffff',
          border: '#d0d7de',
          hover: '#f6f8fa',
          text: '#1f2328',
          muted: '#656d76',
          link: '#0969da',
          success: '#1a7f37',
        },
      },
    },
  },
  plugins: [],
};
export default config;
