import React from 'react'
import { Link } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'

import AuthorWithPicture from './AuthorWithPicture'

const PostLink = ({ post, showExcerpt }) => {
  const {
    frontmatter: { author, path, title, date, image, imagePosition },
    excerpt,
  } = post

  const { childImageSharp, relativePath } = image

  const style = imagePosition ? { 'object-position': imagePosition } : {}

  return (
    <div className="blogpost-preview">
      <Link to={path}>
        <div className="post-container">
          {childImageSharp ? (
            <GatsbyImage
              image={childImageSharp.gatsbyImageData}
              className="post-link"
              alt={title}
            />
          ) : (
            <img
              src={require(`../pages/markdown/${relativePath}`)}
              style={style}
              alt={title}
            />
          )}
          <p className="quote blog-list-item-title">{title}</p>
          <h3 className="mobile-only text-center-mobile">{title}</h3>
        </div>

        {showExcerpt && <p className="mobile-only text-left">{excerpt}</p>}
        <AuthorWithPicture author={author} />

        <p className="caption blog-list-item-date">{date}</p>
      </Link>
    </div>
  )
}

export default PostLink
