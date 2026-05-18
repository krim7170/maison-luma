import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: { center: true, padding: "2rem", screens: { "2xl": "1400px" } },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: { DEFAULT: "hsl(var(--primary))", foreground: "hsl(var(--primary-foreground))" },
        secondary: { DEFAULT: "hsl(var(--secondary))", foreground: "hsl(var(--secondary-foreground))" },
        destructive: { DEFAULT: "hsl(var(--destructive))", foreground: "hsl(var(--destructive-foreground))" },
        muted: { DEFAULT: "hsl(var(--muted))", foreground: "hsl(var(--muted-foreground))" },
        accent: { DEFAULT: "hsl(var(--accent))", foreground: "hsl(var(--accent-foreground))" },
        popover: { DEFAULT: "hsl(var(--popover))", foreground: "hsl(var(--popover-foreground))" },
        card: { DEFAULT: "hsl(var(--card))", foreground: "hsl(var(--card-foreground))" },
        teak: "#c4a882",
        silver: "#e0e0e0",
        dark: "#0a0a0a",
        light: "#f5f2ed",
      },
      fontFamily: {
        display: ["var(--font-syncopate)", "Syncopate", "sans-serif"],
        sans: ["var(--font-dm-sans)", "DM Sans", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "Courier New", "monospace"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": { from: { height: "0" }, to: { height: "var(--radix-accordion-content-height)" } },
        "accordion-up": { from: { height: "var(--radix-accordion-content-height)" }, to: { height: "0" } },
        grain: { "0%, 100%": { transform: "translate(0,0)" }, "10%": { transform: "translate(-2%,-3%)" }, "20%": { transform: "translate(3%,1%)" }, "30%": { transform: "translate(-1%,4%)" }, "40%": { transform: "translate(2%,-2%)" }, "50%": { transform: "translate(-3%,3%)" }, "60%": { transform: "translate(1%,-1%)" }, "70%": { transform: "translate(-2%,2%)" }, "80%": { transform: "translate(3%,-3%)" }, "90%": { transform: "translate(-1%,1%)" } },
        pulse: { "0%, 100%": { opacity: "0.4", transform: "scale(1)" }, "50%": { opacity: "0.8", transform: "scale(1.05)" } },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        grain: "grain 8s steps(10) infinite",
        pulse: "pulse 4s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
