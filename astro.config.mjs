import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://www.qiforlifeacupuncture.com',
  integrations: [sitemap()],
  build: {
    assets: 'assets',
    inlineStylesheets: 'always'
  }
});
