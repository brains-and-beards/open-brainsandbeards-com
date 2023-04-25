import { Link } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import React from 'react'

import ReadMore from '../shared/ReadMore'
import AuthorWithPicture from './AuthorWithPicture'

const FirstPostLink = ({ post }) => {
  const {
    frontmatter: { author, path, title, date },
    firstItemFrontmatter: { image }
  } = post

  return (
    <div className="content">
      <Link to={path}>
        <div className="first-post">
          <GatsbyImage
            image={getImage(image)!}
            alt={`Miniature for post titled "${title}"`}
            imgClassName="blog-image"
          />
          <div className="blurb">
            <p className="first-post-date">{date}</p>
            <h3>{title}</h3>
            <AuthorWithPicture author={author} firstPost={true} />
            <ReadMore text={'Read full story'} url={path} />
          </div>
        </div>
      </Link>
    </div>
  )
}

export default FirstPostLink
