import mdx from '@astrojs/mdx'
import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'
import expressiveCode from 'astro-expressive-code'
import { defineConfig } from 'astro/config'

export default defineConfig({
  site: 'https://brainsandbeards.com',
  output: 'static',
  srcDir: './astro',
  publicDir: './static',
  outDir: './dist-astro',
  trailingSlash: 'ignore',
  redirects: {
    '/projects': { status: 301, destination: '/#projects' }
  },
  vite: {
    plugins: [
      {
        name: 'react-development-runtime',
        config(_config, { command, mode }) {
          if (command !== 'serve' || mode !== 'development') return

          // Keep prebundled React dependencies on the same runtime as development JSX.
          return {
            cacheDir: 'node_modules/.vite/astro-development',
            optimizeDeps: {
              rolldownOptions: {
                transform: {
                  define: { 'process.env.NODE_ENV': JSON.stringify('development') }
                }
              }
            }
          }
        }
      }
    ]
  },
  integrations: [
    expressiveCode(),
    mdx(),
    react(),
    sitemap({
      filter: (page) => !/^\/stories(?:\/|$)/.test(new URL(page).pathname)
    })
  ]
})
