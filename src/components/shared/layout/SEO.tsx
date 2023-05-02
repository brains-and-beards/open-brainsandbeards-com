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
