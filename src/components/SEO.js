import React from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet-async'
import { useLocation } from '@reach/router'
import { useStaticQuery, graphql } from 'gatsby'
import { GatsbySeo } from 'gatsby-plugin-next-seo'

const SEO = ({ title, description, image, article }) => {
  const { pathname } = useLocation()
  const { site } = useStaticQuery(query)
  const {
    defaultTitle,
    titleTemplate,
    defaultDescription,
    siteUrl,
    defaultImage,
    twitterUsername,
  } = site.siteMetadata
  const seo = {
    title: (typeof title === 'string' && title) || defaultTitle,
    description: description || defaultDescription,
    image: `${siteUrl}${image || defaultImage}`,
    url: `${siteUrl}${pathname}`,
  }

  return (
    <>
      <GatsbySeo
        title={seo.title}
        titleTemplate={titleTemplate}
        description={seo.description}
        language={'en'}
        openGraph={{
          description: seo.description,
          title: seo.title,
          image: seo.image,
          url: seo.url,
          type: article ? 'article' : null,
        }}
        twitter={{ card: 'summary_large_image' }}
      />
      <Helmet title={seo.title} titleTemplate={titleTemplate}>
        {(article ? true : null) && (
          <meta property="og:type" content="article" />
        )}
        {twitterUsername && (
          <meta name="twitter:creator" content={twitterUsername} />
        )}
        {seo.title && <meta name="twitter:title" content={seo.title} />}
        {seo.description && (
          <meta name="twitter:description" content={seo.description} />
        )}
        {seo.image && <meta name="twitter:image" content={seo.image} />}

        <meta
          name="google-site-verification"
          content="BcbkPGxOMtXOUPAOFSU3DxA3gb_51mPzyidC4VE_mXg"
        />
      </Helmet>
    </>
  )
}

export default SEO

SEO.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
  article: PropTypes.bool,
}

SEO.defaultProps = {
  title: null,
  description: null,
  image: null,
  article: false,
}

const query = graphql`
  query SEO {
    site {
      siteMetadata {
        defaultTitle: title
        titleTemplate
        defaultDescription: description
        siteUrl: url
        defaultImage: image
        twitterUsername
      }
    }
  }
`
