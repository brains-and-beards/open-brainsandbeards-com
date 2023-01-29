import React from 'react'
import { graphql } from 'gatsby'
import { ArticleJsonLd } from 'gatsby-plugin-next-seo'

import Layout from './layout'
import PostLink from '../components/PostLink'
import AuthorWithPictureAndText from '../components/AuthorWithPictureAndText'
import BlogNewsletter from '../components/BlogNewsletter'
import ReactNativeAnimatedCodeInput from '../components/ReactNativeAnimatedCodeInput'
import SubscribeFootnote from '../components/blog/SubscribeFootnote'
import HiringFootnote from '../components/blog/HiringFootnote'

const renderDate = (date) => <p className="date">{date}</p>

export default function Template({
  data, // this prop will be injected by the GraphQL query below.
}) {
  const {
    markdownRemark,
    smallPic,
    allMarkdownRemark: { edges },
  } = data // data.markdownRemark holds our post data
  const {
    frontmatter: { title, path, date, image, author, imageCaption, demo },
    id,
    excerpt,
    html,
  } = markdownRemark

  const related = relatedStories(edges, id).map((post) => {
    const { node } = post
    return <PostLink key={node.id} post={node} />
  })

  const { childImageSharp } = smallPic.frontmatter.image
  const gatsbySmallSrc = childImageSharp?.fixed?.src

  const thumbnailUrl =
    'https://brainsandbeards.com' +
    (gatsbySmallSrc
      ? gatsbySmallSrc
      : require(`../pages/markdown/${image.relativePath}`))

  return (
    <Layout headerTitle={title} headerSub={renderDate(date)}>
      <ArticleJsonLd
        url={`https://brainsandbeards.com${path}`}
        headline={title}
        images={[thumbnailUrl]}
        datePublished={date}
        dateModified={date}
        authorName={author}
        publisherName="Brains & Beards"
        publisherLogo="https://brainsandbeards.com/bb.png"
        publisherUrl="https://brainsandbeards.com"
        description={excerpt}
        overrides={{
          '@type': 'BlogPosting',
        }}
      />
      <div className="blog-body">
        {image && (
          <div className="top-part-yellow">
            <div className="content">
              {image.childImageSharp ? (
                <img
                  srcSet={image.childImageSharp.fluid.srcSet}
                  src={image.childImageSharp.fluid.src}
                  alt={imageCaption}
                  className="main-blog-image webfeedsFeaturedVisual"
                />
              ) : (
                <img
                  src={require(`../pages/markdown/${image.relativePath}`)}
                  alt={imageCaption}
                  className="main-blog-image webfeedsFeaturedVisual"
                />
              )}
              {imageCaption ? (
                <figcaption
                  className="main-blog-image-caption"
                  dangerouslySetInnerHTML={{ __html: imageCaption }}
                />
              ) : null}
            </div>
          </div>
        )}
        <div className="narrow-column">
          <div dangerouslySetInnerHTML={{ __html: html }} />
          {demo === 'AnimatedInput' && <ReactNativeAnimatedCodeInput />}
          <SubscribeFootnote />
          <HiringFootnote />
          <AuthorWithPictureAndText author={author} text={'WRITTEN BY'} />
        </div>
        <BlogNewsletter />
        <div className="narrow-column">
          <section>
            <h3>More Brains and Beards stories</h3>
            <div className="more-stories">{related}</div>
          </section>
        </div>
      </div>
    </Layout>
  )
}

const relatedStories = (edges, id) => {
  const myIndex = edges.findIndex((s) => s.node.id === id)
  const count = edges.length

  const previous = myIndex === 0 ? count - 1 : myIndex - 1
  const next = myIndex === count - 1 ? 0 : myIndex + 1

  return [edges[previous], edges[next]]
}

export const pageQuery = graphql`
  query BlogPostByPath($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      id
      excerpt
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        image {
          relativePath
          childImageSharp {
            fluid(
              maxHeight: 1400
              quality: 92
              srcSetBreakpoints: [350, 500, 700, 1400]
            ) {
              src
              srcSet
            }
          }
        }
        path
        author
        imageCaption
        demo
      }
    }
    smallPic: markdownRemark(frontmatter: { path: { eq: $path } }) {
      frontmatter {
        image {
          childImageSharp {
            fixed(
              height: 300
              width: 300
              quality: 90
              fit: CONTAIN
              cropFocus: CENTER
            ) {
              src
            }
          }
        }
        path
        author
        imageCaption
        demo
      }
    }
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          id
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            path
            title
            image {
              childImageSharp {
                fluid(
                  maxWidth: 280
                  maxHeight: 200
                  quality: 90
                  cropFocus: CENTER
                  traceSVG: { color: "#333" }
                ) {
                  ...GatsbyImageSharpFluid_tracedSVG
                  src
                }
              }
              relativePath
            }
            author
            imageCaption
          }
        }
      }
    }
  }
`
