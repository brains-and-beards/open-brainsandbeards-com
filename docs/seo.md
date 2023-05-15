# **Canonical URLs Strategy for Blog Post List Page**

## What is a Canonical URL?

The easiest way to explain what a canonical URL is, is to quote the [Google documentation](https://developers.google.com/search/docs/crawling-indexing/canonicalization):

> Canonicalization is the process of selecting the representative **–canonical–** URL of a piece of content. Consequently, a canonical URL is the URL of a page that Google chose as the most representative from a set of duplicate pages. Often called deduplication, this process helps Google show only one version of the otherwise duplicate content in its search results.

## How do we do it now?

On each page, we have the [`Header`](https://github.com/brains-and-beards/open-brainsandbeards-com/blob/main/src/components/shared/layout/Header.tsx) component, which contains the [`SEO`](https://github.com/brains-and-beards/open-brainsandbeards-com/blob/main/src/components/shared/layout/SEO.tsx) component.

We are only interested in this line in the `SEO` component:

```tsx
{!!pathname && <CanonicalLink path={pathname} />}
```

This is our [component](https://github.com/brains-and-beards/open-brainsandbeards-com/blob/main/src/components/shared/layout/CanonicalLink.tsx) to set the canonical URL for pages. Here is its code:

The next line of code is actually setting the canonical URL:

```tsx
  return <link rel="canonical" href={`${host}${findBasePath(/*locale,*/ path)}`} />
```

## Why we need this document about canonicalization blogposts list?

We should talk about blogposts canonicalization because Google is not always indexing automatically paginated pages of blogposts with link structure `blog/x/`, where x - is a page number

### **And why is it happening?**

Canonical URL is a static representative link to a content, and link to paginated list will show different in few months (as soon as new blogpost will be posted)


## The Decision

After investigation, I found a few possible solutions, but we decided to do nothing and stick with the current implementation.

**Why?**

According to the sources, I have concluded that staying with the current implementation is the best solution. First of all, because of the following reasons:

1. We want those pages to be in the search results
2. We still want those pages to be paginated
3. It's recommended (and possibly the only) approach with [gatsby pagination](https://www.gatsbyjs.com/docs/adding-pagination/)

## Alternative approaches, we didn't choose

1. Exclude pages with `/blog/x` paths from the sitemap and/or mark them with noindex.

### Why wasn't this option chosen?

This is the worst option according to the [Google documentation](https://developers.google.com/search/docs/specialty/ecommerce/pagination-and-incremental-page-loading#use-urls-correctly) Here is a quote from it:
>Don't use the first page of a paginated sequence as the canonical page. Instead, give each page in its own canonical URL.

2. Change the pagination logic, making it not via `/blog/x` but via `/blog?page=x` (using parameters).

### What's wrong with this option?

This solution cannot be implemented with [Gatsby](https://www.gatsbyjs.com/docs/adding-pagination/)

3. Mark paginated pages as not indexed.

### Why is no indexing not an option?

It is not recommended, according to the following quote from the [Google documentation](https://developers.google.com/search/docs/specialty/ecommerce/pagination-and-incremental-page-loading#use-urls-correctly):
> We don't recommend using noindex to prevent selection of a canonical page within a single site, because it will completely block the page from Search. rel="canonical" link annotations are the preferred solution.

