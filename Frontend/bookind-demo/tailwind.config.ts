import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        "1500px": "1500px"
      },
      colors: {
        gold: "#ffb700",
        booking: "#003b95",
        bookingLight: "#0049b8",
        transparentWhite: "#ffffff21",
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        bluesans: ['"Blue Sans"', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;
