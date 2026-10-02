import mdx from '@astrojs/mdx'
import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'
import { defineConfig } from 'astro/config'

export default defineConfig({
  site: 'https://brainsandbeards.com',
  output: 'static',
  srcDir: './astro',
  publicDir: './static',
  outDir: './dist-astro',
  trailingSlash: 'ignore',
  markdown: {
    shikiConfig: {
      theme: 'solarized-light'
    }
  },
  integrations: [mdx(), react(), sitemap()]
})
