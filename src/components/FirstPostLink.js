import React from 'react'
import { Link } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'

import ReadMore from './ReadMore'
import AuthorWithPicture from './AuthorWithPicture'

const FirstPostLink = ({ post }) => {
  const {
    frontmatter: { author, path, title, date, image },
  } = post
  const { childImageSharp, relativePath } = image

  return (
    <div className="content">
      <Link to={path}>
        <div className="first-post">
          {childImageSharp ? (
            <GatsbyImage
              image={childImageSharp.gatsbyImageData}
              className="blog-image"
              alt={title}
            />
          ) : (
            <img
              src={require(`../pages/markdown/${relativePath}`)}
              className="blog-image"
              alt={title}
            />
          )}
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
