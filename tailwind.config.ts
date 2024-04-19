import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/ui/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        pallete1: {
          background: "#f4f4f4",
          headersmall: "#04293a",
          headerbig: "#04293a",
          headercaption: "#B7BDB0",
          title: "#064663",
          button: {
            text: "#fff",
            background: "#1081d9",
            border: "#1081d9",
          },
          link: {
            blue: "#1081d9",
          },
          input: {
            background: "#f4f4f4",
          },
        },
        primary: {
          dark: "#0b0d0c",
          red: "#fa3a5c",
          purple: "#667efa",
          background: "#0b1121",
        },
        background: {
          primary: "#fff",
        },
        header: {
          primary: "#7a7d68",
          secondary: "#7a7d68",
        },
      },
      dropShadow: {
        glow: "0 0 30px #15253e",
        input: "0 0 3px #818cf8",
        "input-error": "0 0 3px #fa3a5c",
      },
      fontFamily: {
        reenie: ["Reenie Beanie", "cursive"],
      },
    },
  },
  plugins: [],
};
export default config;
