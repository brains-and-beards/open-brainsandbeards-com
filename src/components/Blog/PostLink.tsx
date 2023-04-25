import { Link } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import React from 'react'

import AuthorWithPicture from './AuthorWithPicture'

const PostLink = ({ post, showExcerpt, isFirst }) => {
  const {
    frontmatter: { author, path, title, date, image },
    firstItemFrontmatter,
    excerpt
  } = post

  const imageToUse = isFirst ? firstItemFrontmatter.image : image

  return (
    <div className="blogpost-preview">
      <Link to={path}>
        <div className="post-container">
          <GatsbyImage image={getImage(imageToUse)} alt={`Miniature for post: ${title}`} />
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
