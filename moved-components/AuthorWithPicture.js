import React from 'react'
import { blogAuthorsImages } from '../configs/consts'

const AuthorWithPicture = ({ author, firstPost }) => {
  if (!blogAuthorsImages[author]) return <div />
  const suffix = firstPost ? '' : '-list'

  return (
    <div>
      <div className={`author-container${suffix}`}>
        <div className="author-content">
          <div className="circular-image">
            <img
              src={blogAuthorsImages[author].image}
              alt={`Blog author: ${author}`}
            />
          </div>
        </div>
        <div>
          <p className="author-name">{author}</p>
          <p className="author-title">{blogAuthorsImages[author].title}</p>
        </div>
      </div>
    </div>
  )
}

export default AuthorWithPicture
