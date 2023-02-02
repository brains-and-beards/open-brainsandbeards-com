import React from 'react'
import PropTypes from 'prop-types'
import { useLocation } from '@reach/router'
import { useStaticQuery, graphql } from 'gatsby'

const query = graphql`
  query SEO {
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

const SEO = ({ title, description, image, article, children }) => {
  const {
    defaultTitle,
    titleTemplate,
    defaultDescription,
    siteUrl,
    defaultImage,
    twitterUsername,
  } = useSiteMetadata()

  // const { pathname } = useLocation()
const pathname = 'asdasd'
  const seo = {
    title: (typeof title === 'string' && title) || defaultTitle,
    description: description || defaultDescription,
    image: `${siteUrl}/${image || defaultImage}`,
    url: `${siteUrl}${pathname || ``}`,
    twitterUsername,
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
      

      <meta
        name="google-site-verification"
        content="BcbkPGxOMtXOUPAOFSU3DxA3gb_51mPzyidC4VE_mXg"
      />
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
