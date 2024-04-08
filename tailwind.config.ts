import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./app/**/*.tsx", "./components/**/*.tsx"],
  theme: {
    container: {
      center: true,
      screens: {
        "2xl": "640px",
      }
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
    },
  },
  plugins: [],
} satisfies Config;
