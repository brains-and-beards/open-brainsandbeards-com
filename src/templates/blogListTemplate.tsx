import { Link, graphql } from 'gatsby'
import { StaticImage } from 'gatsby-plugin-image'
import React from 'react'

import ChevronSvg from '../assets/images/chevron-bold.svg'
import FirstPostLink from '../components/Blog/FirstPostLink'
import PostLink from '../components/Blog/PostLink'
import ContactForm from '../components/Contact/forms/ContactForm'
import SEO from '../components/shared/layout/SEO'
import Layout from './layout'

const title = 'Read our insights'
const description = 'Technology, Shipping great products, Building successful teams'

const BlogListTemplate = ({
  data: { allMdx, firstElement },
  pageContext: { currentPage, numPages }
}) => {
  const posts = allMdx.nodes.filter(node => !!node.frontmatter.date)
  const firstPost = firstElement.nodes[0]

  const firstPageLink = Math.max(currentPage - 2, 1)
  const lastPageLink = Math.min(firstPageLink + 4, numPages)
  const pageLinks = []
  for (let p = firstPageLink; p <= lastPageLink; p++) {
    const path = p === 1 ? '/blog' : `/blog/${p}`
    pageLinks.push(
      <Link
        key={path}
        to={`${path}#posts-list`}
        className={`page-link right sub2 ${p === currentPage ? 'current' : ''}`}
      >
        <span>{p}</span>
      </Link>
    )
  }

  const SubtitleRow = (
    <div className="row header-subtitle">
      <div className="one-third">
        <StaticImage
          height={80}
          width={80}
          src="../assets/images/technology.png"
          imgClassName="small-image"
          alt="Technology"
        />
        <p className="sub2">Technology</p>
      </div>
      <div className="one-third">
        <StaticImage
          height={80}
          width={80}
          src="../assets/images/shipping.png"
          imgClassName="small-image"
          alt="Shipping products"
        />
        <p className="sub2">Shipping great products</p>
      </div>
      <div className="one-third">
        <StaticImage
          height={80}
          width={80}
          src="../assets/images/building-teams.png"
          imgClassName="small-image"
          alt="Building teams"
        />
        <p className="sub2">Building successful teams</p>
      </div>
    </div>
  )

  return (
    <Layout headerTitle={title} headerSub={SubtitleRow}>
      <div className="content-page">
        <div className="top-part-yellow">
          <div className="content">
            <div className="first-post-big">
              <FirstPostLink key={firstPost.id} post={firstPost} />
            </div>
            <div className="mobile-only">
              <PostLink key={firstPost.id} post={firstPost} isFirst showExcerpt />
            </div>

            <div id="posts-list">
              {posts.map(node => (
                <PostLink key={node.id} post={node} />
              ))}
            </div>
          </div>
        </div>

        <div className="row" id="load-more">
          <Link
            to={currentPage <= 2 ? '/blog#posts-list' : `/blog/${currentPage - 1}#posts-list`}
            className={`button left sub2 big ${currentPage <= 1 ? 'disabled' : ''}`}
          >
            <span>
              <ChevronSvg height="14px" className="reverse" alt="Newer posts" /> Newer posts
            </span>
          </Link>

          <div className="page-links mobile-hide">{pageLinks}</div>

          <Link
            to={`/blog/${currentPage + 1}#posts-list`}
            className={`button right sub2 big ${currentPage >= numPages ? 'disabled' : ''}`}
          >
            <span>
              Older posts <ChevronSvg height="14px" alt="Older posts" />
            </span>
          </Link>
        </div>
      </div>
      <ContactForm
        title="Get in touch"
        subtitle="If you'd like to get in touch with us about something we wrote on our blog, please do!"
      />
    </Layout>
  )
}

export default BlogListTemplate

export const _blogPostListItemFragment = graphql`
  fragment BlogPostListItem on Mdx {
    id
    excerpt(pruneLength: 250)
    frontmatter {
      date(formatString: "MMMM DD, YYYY")
      path
      title
      image {
        relativePath
        childImageSharp {
          gatsbyImageData(width: 280, height: 200, transformOptions: { cropFocus: CENTER })
        }
      }
      imagePosition
      author
    }
  }
`

export const _blogPostFirstItemFragment = graphql`
  fragment BlogPostFirstItem on Mdx {
    ...BlogPostListItem
    firstItemFrontmatter: frontmatter {
      image {
        relativePath
        childImageSharp {
          gatsbyImageData(width: 672)
        }
      }
    }
  }
`

export const query = graphql`
  query ($limit: Int, $skip: Int) {
    firstElement: allMdx(limit: 1, sort: { frontmatter: { date: DESC } }) {
      nodes {
        ...BlogPostFirstItem
      }
    }

    allMdx(sort: { frontmatter: { date: DESC } }, limit: $limit, skip: $skip) {
      nodes {
        ...BlogPostListItem
      }
    }
  }
`
// Explanation on SEO links on this page:
// According to this sources:
// 1: https://developers.google.com/search/docs/crawling-indexing/canonicalization
// 2: https://www.searchenginejournal.com/what-is-a-canonical-url/469636/
// Best way -- to do nothing

export const Head = ({ location }) => (
  <>
    <SEO title={title} description={description} pathname={location.pathname} />
    <link
      rel="alternate"
      type="application/rss+xml"
      title="Brains & Beards - all posts"
      href="https://brainsandbeards.com/blog/feed.xml"
    />
  </>
)
