// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://kushviewbrian.github.io',
  base: '/woodward',
  trailingSlash: 'always',

  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [sitemap()],
});