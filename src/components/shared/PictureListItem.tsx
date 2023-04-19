import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import React from 'react'

const PictureListItem = ({ image, title, children }) => (
  <li>
    <GatsbyImage className="image-wrapper" image={getImage(image)} alt={title} />
    <div className="pic-description">
      <p className="title">{title}</p>
      {children}
    </div>
  </li>
)

export default PictureListItem
