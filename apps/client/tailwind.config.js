const { createGlobPatternsForDependencies } = require("@nx/react/tailwind");
const { join } = require("path");
const colors = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class", '[data-theme="dark"]'],
  content: [
    join(__dirname, "index.html"),
    join(__dirname, "src/**/*!(*.stories|*.spec).{ts,tsx,html}"),
    ...createGlobPatternsForDependencies(__dirname)
  ],
  theme: {
    extend: {
      colors: {
        primary: colors.blue[500],
        screen: {
          light: "#F9FAFB",
          dark: "#1E2026"
        }
      },
      container: {
        center: true,
        padding: "1rem"
      }
    }
  }
};
