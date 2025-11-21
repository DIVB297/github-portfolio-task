import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
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
          dark: {
            bg: '#0d1117',
            border: '#30363d',
            hover: '#161b22',
            text: '#e6edf3',
            muted: '#7d8590',
            link: '#2f81f7',
            success: '#3fb950',
          },
        },
      },
    },
  },
  plugins: [],
};
export default config;
