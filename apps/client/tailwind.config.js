const { createGlobPatternsForDependencies } = require("@nx/react/tailwind");
const { join } = require("path");
const colors = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(__dirname, "index.html"),
    join(__dirname, "src/**/*!(*.stories|*.spec).{ts,tsx,html}"),
    ...createGlobPatternsForDependencies(__dirname),
    join(__dirname, "../../node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}")
  ],
  theme: {
    extend: {
      colors: {
        primary: colors.blue[500]
      }
    }
  },
  plugins: [require("flowbite/plugin")]
};
