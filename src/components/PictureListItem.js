import React from 'react'
import { GatsbyImage } from 'gatsby-plugin-image'

const PictureListItem = ({ image, title, children }) => (
  <li>
    <GatsbyImage alt={title} image={image} className="image-wrapper" />
    <div className="pic-description">
      <p className="title">{title}</p>
      {children}
    </div>
  </li>
)

export default PictureListItem
