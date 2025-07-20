import typographyPlugin from "@tailwindcss/typography";
import { type Config } from "tailwindcss";

export default {
    content: ["./src/**/*.{js,jsx,ts,tsx,md,mjs}"],
    darkMode: "selector",
    theme: {
        fontSize: {
            xs: ["0.75rem", { lineHeight: "1rem" }],
            sm: ["0.875rem", { lineHeight: "1.5rem" }],
            base: ["1rem", { lineHeight: "2rem" }],
            lg: ["1.125rem", { lineHeight: "1.75rem" }],
            xl: ["1.25rem", { lineHeight: "2rem" }],
            "2xl": ["1.5rem", { lineHeight: "2.5rem" }],
            "3xl": ["2rem", { lineHeight: "2.5rem" }],
            "4xl": ["2.5rem", { lineHeight: "3rem" }],
            "5xl": ["3rem", { lineHeight: "3.5rem" }],
            "6xl": ["3.75rem", { lineHeight: "1" }],
            "7xl": ["4.5rem", { lineHeight: "1" }],
            "8xl": ["6rem", { lineHeight: "1" }],
            "9xl": ["8rem", { lineHeight: "1" }],
        },
        extend: {
            maxWidth: { "8xl": "88rem" },
            colors: {
                typography: "#aeaeae",
                primary: {
                    darkest: "#5a8662",
                    darker: "#101010",
                    DEFAULT: "#1e3a8a",
                    btn: "#5a8662",
                    "btn-hover": "#b6c89f",
                    "btn-text": "#ffffff",
                },
                secondary: {
                    darker: "#5a8662",
                    DEFAULT: "#5a8662",
                    btn: "#5a8662",
                    "btn-hover": "#b6c89f",
                    "btn-text": "#ffffff",
                },
                glow: {
                    left: "#5a8662",
                    middle: "#5a8662",
                    right: "#5a8662",
                    divider: "#5a8662",
                    light: "#ffffff",
                    glass: "black"
                }
            },
            fontFamily: {
                sans: "var(--font-inter)",
                display: ["var(--font-lexend)", { fontFeatureSettings: '"ss01"' }],
            },
        },
    },
    plugins: [typographyPlugin],
} satisfies Config;
