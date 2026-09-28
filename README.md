# Brains & Beards web page

## Current Gatsby site

Clone the website source code (this repo) and run:

```
npm install
npm run develop
```

You can see the development version on `http://localhost:8000/`.

## Astro migration preview

Astro is configured in parallel while the current production build continues to
use Gatsby. Use Node.js 22.12.0 or newer (see `.nvmrc`), then run:

```
npm install
npm run astro:dev
```

The Astro source directory is `astro/`; it deliberately does not yet replace
the Gatsby pages in `src/`. The preview build output is written to
`dist-astro/`:

```
npm run astro:check
npm run astro:build
npm run astro:preview
```

The default `npm run build` command remains the Gatsby production build until
the final Netlify cutover.

## Learn more

- [Documentation](https://www.gatsbyjs.com/docs/?utm_source=starter&utm_medium=readme&utm_campaign=minimal-starter-ts)
- [Tutorials](https://www.gatsbyjs.com/tutorial/?utm_source=starter&utm_medium=readme&utm_campaign=minimal-starter-ts)
- [Guides](https://www.gatsbyjs.com/tutorial/?utm_source=starter&utm_medium=readme&utm_campaign=minimal-starter-ts)
- [API Reference](https://www.gatsbyjs.com/docs/api-reference/?utm_source=starter&utm_medium=readme&utm_campaign=minimal-starter-ts)
- [Plugin Library](https://www.gatsbyjs.com/plugins?utm_source=starter&utm_medium=readme&utm_campaign=minimal-starter-ts)
- [Cheat Sheet](https://www.gatsbyjs.com/docs/cheat-sheet/?utm_source=starter&utm_medium=readme&utm_campaign=minimal-starter-ts)

Happy hacking!
