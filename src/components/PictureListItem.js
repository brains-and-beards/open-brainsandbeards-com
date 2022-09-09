import React from 'react'
import Img from 'gatsby-image'

const PictureListItem = ({ image, title, children }) => (
  <li>
    <Img className="image-wrapper" fixed={image} alt={title} />
    <div className="pic-description">
      <p className="title">{title}</p>
      {children}
    </div>
  </li>
)

export default PictureListItem
