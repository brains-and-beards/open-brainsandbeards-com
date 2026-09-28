import { defineConfig } from 'astro/config'
import mdx from '@astrojs/mdx'
import netlify from '@astrojs/netlify'
import sitemap from '@astrojs/sitemap'

export default defineConfig({
  site: 'https://brainsandbeards.com',
  output: 'static',
  adapter: netlify(),
  srcDir: './astro',
  publicDir: './static',
  outDir: './dist-astro',
  trailingSlash: 'always',
  integrations: [mdx(), sitemap()]
})
