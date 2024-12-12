/** @type {import('prettier').Config} */
const config = {
  semi: true,
  singleQuote: true,
  arrowParens: 'always',
  trailingComma: 'none',
  printWidth: 100,
  tabWidth: 2,
  bracketSpacing: true,
  plugins: ['prettier-plugin-tailwindcss']
};

export default config;
