/** @type {import('tailwindcss').Config} */
const theme = require('@ds24/elements/dsTheme');

module.exports = {
  content: ['./src/**/*.{html,ts}', './node_modules/@ds24/elements/**/*.mjs'],
  important: true,
  theme: { extend: { ...theme } },
  plugins: [],
};
