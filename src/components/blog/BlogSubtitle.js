import React from 'react'
import { GatsbyImage } from 'gatsby-plugin-image'

const BlogSubtitle = ({ fixedImg, subtitle, alt }) => (
  <div className="one-third">
    <GatsbyImage
      image={fixedImg}
      alt={alt || subtitle}
      className="small-image"
    />
    <p className="sub2">{subtitle}</p>
  </div>
)

export default BlogSubtitle
