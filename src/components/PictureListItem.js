import React from 'react'
import { GatsbyImage } from 'gatsby-plugin-image'

const PictureListItem = ({ image, title, children }) => (
  <li>
    <GatsbyImage image={image} className="image-wrapper" alt={title} />
    <div className="pic-description">
      <p className="title">{title}</p>
      {children}
    </div>
  </li>
)

export default PictureListItem
