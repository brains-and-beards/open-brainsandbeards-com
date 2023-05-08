# **Canonical URLs strategy for blogposts list page**

## What is Canonical URL and why do we need it? 

The easiest way to explain what is canonical URL is to quote Google documentation (1st link in the Sources list)

> Canonicalization is the process of selecting the representative **–canonical–** URL of a piece of content.  Consequently, a canonical URL is the URL of a page that Google chose as the most representative from a set of duplicate pages. Often called deduplication, this process helps Google show only one version of the otherwise duplicate content in its search results.

And why do we need it? - As it mentioned in quote we need it to improve search result in Google


## The problem we faced

Google is not indexing automatically paginated pages of blogposts with link structure `blog/x/`, where x - is a page number 

## How we do it now?  

On each page we have `Header` component, which contains the `SEO` component with the following code

```tsx

import { graphql, useStaticQuery } from 'gatsby'
import PropTypes from 'prop-types'
import React from 'react'

import CanonicalLink from './CanonicalLink'

const query = graphql`
  query {
    site {
      siteMetadata {
        defaultTitle: title
        titleTemplate
        defaultDescription: description
        siteUrl
        defaultImage: image
        twitterUsername
      }
    }
  }
`
export const useSiteMetadata = () => {
  const data = useStaticQuery(query)
  return data.site.siteMetadata
}

const SEO = ({ title, description, image, article, pathname, children }) => {
  const {
    defaultTitle,
    titleTemplate,
    defaultDescription,
    siteUrl,
    defaultImage,
    twitterUsername
  } = useSiteMetadata()

  const seo = {
    title: (typeof title === 'string' && title) || defaultTitle,
    description: description || defaultDescription,
    image: `${siteUrl}/${image || defaultImage}`,
    url: `${siteUrl}${pathname || ``}`,
    twitterUsername
  }

  return (
    <>
      <title>{titleTemplate.replace('%s', seo.title)}</title>
      <meta name="description" content={seo.description} />
      <meta name="image" content={seo.image} />

      {/* twitter */}
      {!!seo.title && <meta name="twitter:title" content={seo.title} />}
      {!!seo.description && <meta name="twitter:description" content={seo.description} />}
      <meta name="twitter:card" content="summary_large_image" />
      {!!seo.twitterUsername && <meta name="twitter:creator" content={seo.twitterUsername} />}
      {!!seo.image && <meta name="twitter:image" content={seo.image} />}
      {!!seo.url && <meta name="twitter:url" content={seo.url} />}

      {/* open graph */}
      {!!seo.title && <meta name="og:title" content={seo.title} />}
      {!!seo.description && <meta name="og:description" content={seo.description} />}
      {!!seo.url && <meta name="og:url" content={seo.url} />}
      {!!seo.image && <meta name="og:image" content={seo.image} />}
      {!!article && <meta property="og:type" content="article" />}

      <meta name="google-site-verification" content="BcbkPGxOMtXOUPAOFSU3DxA3gb_51mPzyidC4VE_mXg" />

      {!!pathname && <CanonicalLink path={pathname} />}
      {children}
    </>
  )
}

SEO.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
  article: PropTypes.bool,
  children: PropTypes.element
}

SEO.defaultProps = {
  title: null,
  description: null,
  image: null,
  article: false,
  children: null
}

export default SEO
```

For now we are interested only in this line: 

```tsx
 {!!pathname && <CanonicalLink path={pathname} />}
```

This is our component to set canonical URL for pages, here it's code: 

```tsx
import React from 'react'

// import { useContext } from 'react'
// import { TranslationContext } from '../configs/i18n'
// import { findBasePath } from '../configs/paths'
import { host } from '../../../configs/consts'
import { slashify } from '../../../helpers/path_helpers'

// TODO Find the actual path for the base language when merging this with the i18n branch
const findBasePath = (/*locale,*/ path) => slashify(path)

const CanonicalLink = ({ path }) => {
  // const { locale } = useContext(TranslationContext)
  // const locale = 'en'

  return <link rel="canonical" href={`${host}${findBasePath(/*locale,*/ path)}`} />
}

export default CanonicalLink
```

## The solution

After investigation, I found few possible solutions: 
1. exclude pages with `/blog/x` paths from sitemap and(or) mark them with `noindex` 
2. change the pagination logic, make it not via `/blog/x` but via `/blog?page=x` (via parameters)
3. stay with the current variant
4. mark paginated pages as not indexed

I recommend the 3rd variant to use. And ask Google to index pages, Google will say is not indexed 

**Why?**

According to the sources I think that this could be the best solution. 
First of all because of next reasons:
1. The 2nd solution can't be done with Gatsby (4th link in Sources is the link to the Gatsby docs, and if we will try we won't succeed (I have tried))
2. The 1st variant is the worst option according to the 3rd item in the Sources list (Google documentation) here is the quote from it:
>Don't use the first page of a paginated sequence as the canonical page. Instead, give each page in its own canonical URL.
3. And 4th variant is not good, according to the following quote from Google documentation: 
> We don't recommend using noindex to prevent selection of a canonical page within a single site, because it will completely block the page from Search. rel="canonical" link annotations are the preferred solution.


Sources, used in this document:
1. https://developers.google.com/search/docs/crawling-indexing/canonicalization.
2. https://www.searchenginejournal.com/what-is-a-canonical-url/469636/ 
3. https://developers.google.com/search/docs/specialty/ecommerce/pagination-and-incremental-page-loading#use-urls-correctly
4. https://www.gatsbyjs.com/docs/adding-pagination/

