import React from 'react'
import { graphql, Link } from 'gatsby'
import { Helmet } from 'react-helmet-async'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'

import Layout from './layout'
import PostLink from '../components/PostLink'
import FirstPostLink from '../components/FirstPostLink'
import ContactForm from '../components/forms/ContactForm'

const IndexPage = ({
  data: {
    allMarkdownRemark: { edges },
    firstElement,
    technologyImage,
    shippingImage,
    teamsImage,
  },
  pageContext: { page, numPages },
}) => {
  const posts = edges.filter((edge) => !!edge.node.frontmatter.date)
  const firstPost = firstElement.edges[0]

  const firstPageLink = Math.max(page - 2, 1)
  const lastPageLink = Math.min(firstPageLink + 4, numPages)
  const pageLinks = []
  for (let p = firstPageLink; p <= lastPageLink; p++) {
    const path = p === 1 ? '/blog' : `/blog/${p}`
    pageLinks.push(
      <Link
        to={`${path}#posts-list`}
        className={`page-link right sub2 ${p === page ? 'current' : ''}`}
      >
        <span>{p}</span>
      </Link>
    )
  }

  const subtitle = (
    <div className="row header-subtitle">
      <div className="one-third">
        <GatsbyImage
          image={getImage(technologyImage)}
          className="small-image"
          alt="Technology"
        />
        <p className="sub2">Technology</p>
      </div>
      <div className="one-third">
        <GatsbyImage
          image={getImage(shippingImage)}
          className="small-image"
          alt="Shipping products"
        />
        <p className="sub2">Shipping great products</p>
      </div>
      <div className="one-third">
        <GatsbyImage
          image={getImage(teamsImage)}
          className="small-image"
          alt="Building teams"
        />
        <p className="sub2">Building successful teams</p>
      </div>
    </div>
  )

  if (process.env.SHOW_BLOG !== 'true')
    return <Layout headerTitle="Read our insights" headerSub={subtitle} />

  return (
    <Layout headerTitle="Read our insights" headerSub={subtitle}>
      <Helmet>
        <link
          rel="alternate"
          type="application/rss+xml"
          title="Brains & Beards - all posts"
          href="https://brainsandbeards.com/blog/feed.xml"
        />
      </Helmet>
      <div className="content-page">
        <div className="top-part-yellow">
          <div className="content">
            <div className="first-post-big">
              <FirstPostLink key={firstPost.node.id} post={firstPost.node} />
            </div>
            <div className="mobile-only">
              <PostLink
                key={firstPost.node.id}
                post={firstPost.node}
                showExcerpt
              />
            </div>

            <div id="posts-list">
              {posts.map((edge) => (
                <PostLink key={edge.node.id} post={edge.node} />
              ))}
            </div>
          </div>
        </div>

        <div className="row" id="load-more">
          <Link
            to={page <= 2 ? '/blog#posts-list' : `/blog/${page - 1}#posts-list`}
            className={`button left sub2 big ${page <= 1 ? 'disabled' : ''}`}
          >
            <span>
              <img
                src={require('../assets/images/chevron-bold.svg')}
                height="14px"
                className="reverse"
                alt="Newer posts"
              />{' '}
              Newer posts
            </span>
          </Link>

          <div className="page-links mobile-hide">{pageLinks}</div>

          <Link
            to={`/blog/${page + 1}#posts-list`}
            className={`button right sub2 big ${
              page >= numPages ? 'disabled' : ''
            }`}
          >
            <span>
              Older posts{' '}
              <img
                src={require('../assets/images/chevron-bold.svg')}
                height="14px"
                alt="Older posts"
              />
            </span>
          </Link>
        </div>
      </div>
      <ContactForm
        title="Get in touch"
        subtitle=" If you'd like to get in touch with us about something we wrote on our blog, please do!"
      />
    </Layout>
  )
}

export default IndexPage

export const pageQuery = graphql`
  query IndexQuery($limit: Int, $skip: Int) {
    firstElement: allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      limit: 1
      skip: 0
    ) {
      edges {
        node {
          id
          excerpt(pruneLength: 250)
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            path
            title
            image {
              relativePath
              childImageSharp {
                gatsbyImageData(width: 672, quality: 90, layout: CONSTRAINED)
              }
            }
            imagePosition
            author
          }
        }
      }
    }
    allMarkdownRemark: allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          id
          excerpt(pruneLength: 250)
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            path
            title
            image {
              relativePath
              childImageSharp {
                gatsbyImageData(
                  height: 200
                  width: 280
                  quality: 90
                  transformOptions: { cropFocus: ATTENTION }
                  layout: CONSTRAINED
                )
              }
            }
            imagePosition
            author
          }
        }
      }
    }
    technologyImage: file(relativePath: { regex: "/technology/" }) {
      ...smallIllustrationIconImageFragment
    }
    shippingImage: file(relativePath: { regex: "/shipping/" }) {
      ...smallIllustrationIconImageFragment
    }
    teamsImage: file(relativePath: { regex: "/building-teams/" }) {
      ...smallIllustrationIconImageFragment
    }
  }
`
