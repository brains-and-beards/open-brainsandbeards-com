import React from 'react'
import { blogAuthorsImages } from '../configs/consts'
import { AnchorLink } from 'gatsby-plugin-anchor-links'

const AuthorWithPictureAndText = ({ author, text }) => {
  if (!blogAuthorsImages[author]) return <div />

  return (
    <AnchorLink to={`/team#${author.split(' ')[0]}`}>
      <div className="written-by-container">
        <div className="author-container">
          <div className="author-content">
            <div className="circular-image">
              <img
                src={blogAuthorsImages[author].image}
                alt={`Blog author: ${author}`}
              />
            </div>
          </div>
          <div>
            <h5 className="written-by">{text}</h5>
            <p className="written-by-author-name">{author}</p>
            <p className="written-by-author-title">
              {blogAuthorsImages[author].title}
            </p>
          </div>
        </div>
      </div>
    </AnchorLink>
  )
}

export default AuthorWithPictureAndText
