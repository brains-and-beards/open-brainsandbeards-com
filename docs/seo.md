# Using Canonical URLs in blog pagination

## What is a Canonical URL?

Definition from [Google documentation](https://developers.google.com/search/docs/crawling-indexing/canonicalization):

> A canonical URL is the URL of a page that Google chose as the most representative from a set of duplicate pages. Often called deduplication, this process helps Google show only one version of the otherwise duplicate content in its search results.

## What's special about blog pagination?

A list of blog posts has two potential problems:

- It's dynamic, meaning that the content on `/blog/2` in September 2021 will be completely different than in May 2023 (because new blog posts arrive and shift the list of blog posts)
- It's duplicate, because it basically contains links to blog posts and those blog posts themselves are the _unique content_

## How do we handle it then?

We're following Google's [guidelines for pagination](https://developers.google.com/search/docs/specialty/ecommerce/pagination-and-incremental-page-loading#use-urls-correctly), i.e.

> Give each page a unique URL

In our case it's a `blog/x/` format, where `x` is a page number.

> Don't use the first page of a paginated sequence as the canonical page. Instead, give each page in its own canonical URL.

We set it in [our blog list template](https://github.com/brains-and-beards/open-brainsandbeards-com/blob/main/src/templates/blogListTemplate.tsx) using the [CanonicalLink component](https://github.com/brains-and-beards/open-brainsandbeards-com/blob/main/src/components/shared/layout/CanonicalLink.tsx).
