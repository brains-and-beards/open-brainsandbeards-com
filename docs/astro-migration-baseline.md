# Astro migration baseline

Captured: 2026-09-28

## Purpose

This document is the acceptance baseline for replacing Gatsby with Astro. The
migration must preserve public URLs, metadata, forms, redirects, and the
visible experience before optimising the implementation.

## Reproducible production build

```sh
npm run build
```

Result: successful Gatsby production build with Node `v20.19.5` and npm
`10.8.2`.

The build reports 1,139 Gatsby data nodes and 125 `SitePage` nodes. It writes
124 route data files under `public/page-data`; the difference is the Gatsby
internal page record.

### Build observations to carry into the migration

- The generated `public/` directory is 191 MB. This is dominated by the
  historical blog's images and animated GIFs, so it is not a measure of
  initial-page transfer.
- JavaScript files total 2,796,876 bytes across all route bundles; CSS files
  total 51,324 bytes. These are build-wide totals, not a per-page performance
  score.
- The build succeeds with warnings about an outdated Browserslist database and
  legacy Sass `@import` / JS API usage. They are non-blocking, but Astro should
  use the modern Sass module system where practical.
- Gatsby generates the blog RSS feed, sitemap and robots file. Astro must
  generate equivalent artifacts.

## URL inventory

### Static marketing and case-study routes

- `/`
- `/404`
- `/about-us`
- `/contact-us`
- `/estimate-project`
- `/estimate-requested`
- `/hire-us`
- `/message-sent`
- `/newsletter-subscribed`
- `/projects`
- `/projects/clincase`
- `/projects/femtasy`
- `/projects/lokalportal`
- `/projects/manomano`
- `/projects/rakuten`
- `/projects/sharoo`
- `/projects/vay`
- `/services/cross-platform`
- `/services/native-development`
- `/services/team-augmentation`
- `/team`

### Blog

- `content/blog/` currently contains 95 `index.mdx` posts.
- Gatsby generates each post at the `frontmatter.path` URL, `/blog`, and seven
  additional paginated blog index routes (`/blog/2` through `/blog/8`).
- The full generated route list is available from a build with:

  ```sh
  find public -type f -path '*/page-data/*/page-data.json' \
    | sed 's#^public/page-data##; s#/page-data.json$#/#' | sort
  ```

## Public delivery contracts

### Netlify Forms

The migration must keep the following names, field names and successful
submission destinations. No custom application backend is involved.

| Form name | Source | Success destination |
| --- | --- | --- |
| `contact` | `ContactFormInternals.tsx` | `/message-sent` |
| `estimate` | `EstimateProjectForm.tsx` | `/estimate-requested` |
| `know_more` | `PortfolioForm.tsx` | `/message-sent` |

Each output form must contain `method="post"`, `data-netlify="true"`, the
same `name`, and a hidden `form-name` input. Test these contracts on an actual
Netlify deploy preview before release.

### Redirects and headers

Preserve [`static/_redirects`](../static/_redirects) and
[`static/_headers`](../static/_headers) verbatim unless a deliberate redirect
or security-header change is approved. The current redirects cover `/jobs`,
`/mrn`, `/portfolio`, and `/free-consultation`, each with and without a
trailing slash.

### SEO artifacts

The Gatsby build emits:

- `/robots.txt`
- `/sitemap-index.xml`
- `/sitemap-0.xml`
- `/blog/feed.xml`

For every migrated page, compare the final HTML's `<title>`, meta description,
canonical URL, Open Graph/Twitter metadata, robots directives, structured
data where present, and heading hierarchy with Gatsby output.

## Functional regression checklist

- Desktop links and mobile menu: open, close, navigate and keyboard focus.
- Homepage and team testimonial carousels: next/previous, pagination,
  swipe/scroll behavior and reduced-motion behavior.
- Contact, estimate and portfolio forms: client validation, submission, and
  redirect on a Netlify preview.
- Random homepage hero: one valid hero illustration appears without layout
  shift.
- Team-member hash links apply the current visual focus treatment.
- Course sign-up embed loads only on pages that display it.
- 404 page reports a Plausible event without breaking the page.
- Blog posts retain code highlighting, local images/captions, responsive video
  embeds, RSS metadata and pagination.

## Performance comparison protocol

Use the same production-like Netlify preview and the same network/device
profile for both versions. Measure at minimum:

- `/`
- `/services/cross-platform/`
- `/projects/sharoo/`
- `/blog/`
- one image-heavy long blog post

Record Lighthouse mobile and desktop values for Performance, LCP, INP, CLS,
total transferred bytes, JavaScript bytes and request count. Treat the Gatsby
figures as the release baseline, then set the Astro release gate after the
first Astro preview is available. The goal is lower JS and transfer cost with
no regression in accessibility, SEO, visual fidelity or the checklist above.

## Baseline gaps

The browser-automation session needed for local screenshots and Lighthouse
collection is not available in this workspace. Capture those measurements from
the existing Netlify production/deploy-preview site before the Astro cutover;
the route and behavior checklist above defines exactly what to capture.
