# **Canonical URLs strategy for blogposts list page**

## What is Canonical URL? 

The easiest way to explain what is canonical URL is to quote  [Google documentation](https://developers.google.com/search/docs/crawling-indexing/canonicalization)

> Canonicalization is the process of selecting the representative **–canonical–** URL of a piece of content.  Consequently, a canonical URL is the URL of a page that Google chose as the most representative from a set of duplicate pages. Often called deduplication, this process helps Google show only one version of the otherwise duplicate content in its search results.

## How we do it now?  

On each page we have [`Header`](https://github.com/brains-and-beards/open-brainsandbeards-com/blob/main/src/components/shared/layout/Header.tsx) component, which contains the [`SEO`](https://github.com/brains-and-beards/open-brainsandbeards-com/blob/main/src/components/shared/layout/SEO.tsx) component.

Here we are interested only in this line in the `SEO` component: 

```tsx
 {!!pathname && <CanonicalLink path={pathname} />}
```

This is our [component](https://github.com/brains-and-beards/open-brainsandbeards-com/blob/main/src/components/shared/layout/CanonicalLink.tsx) to set canonical URL for pages, here it's code: 

The next line of code is actually setting the Canonical URL
```tsx
  return <link rel="canonical" href={`${host}${findBasePath(/*locale,*/ path)}`} />
```


## What is the problem and what's wrong with blogposts list?

The problem with blogposts is that Google is not always indexing automatically paginated pages of blogposts with link structure `blog/x/`, where x - is a page number

### **And why is it happening?** 

Canonical URL is a static representative link to a content, and link to paginated list will show different in few months (as soon as new blogpost will be posted)


## The Decision

After investigation, I found few possible solutions, but we sure do nothing. And stay with current implementation.


**Why?**

According to the sources I decided that to stay with current implementation is the best solution. 
First of all because of next reasons:
1. We still want those pages to be paginated
2. It's recommended (the one possible) approach with [gatsby pagination] (https://www.gatsbyjs.com/docs/adding-pagination/)

## Alternative approaches

1. exclude pages with `/blog/x` paths from sitemap and(or) mark them with `noindex`
2. change the pagination logic, make it not via `/blog/x` but via `/blog?page=x` (via parameters)
3. mark paginated pages as not indexed

**Why none of those solutions was chosen?**

First of all because of next reasons:
1. The 2nd solution can't be done with [Gatsby](https://www.gatsbyjs.com/docs/adding-pagination/)
2. The 1st variant is the worst option according to the [Google documentation](https://developers.google.com/search/docs/specialty/ecommerce/pagination-and-incremental-page-loading#use-urls-correctly) here is the quote from it:
>Don't use the first page of a paginated sequence as the canonical page. Instead, give each page in its own canonical URL.
3. And 3rd variant is not good, according to the following quote from [Google documentation](https://developers.google.com/search/docs/specialty/ecommerce/pagination-and-incremental-page-loading#use-urls-correctly):
> We don't recommend using noindex to prevent selection of a canonical page within a single site, because it will completely block the page from Search. rel="canonical" link annotations are the preferred solution.

Sources, used in this document:
1. https://developers.google.com/search/docs/crawling-indexing/canonicalization.
2. https://www.searchenginejournal.com/what-is-a-canonical-url/469636/ 
3. https://developers.google.com/search/docs/specialty/ecommerce/pagination-and-incremental-page-loading#use-urls-correctly
4. https://www.gatsbyjs.com/docs/adding-pagination/

