import { StaticImage } from 'gatsby-plugin-image'
import React from 'react'

const ReadMore = ({ text }) => (
  <p className="read-more">
    <span className="inner-text">{text}</span>{' '}
    <StaticImage
      src={'../assets/images/chevron-bold.svg'}
      alt="arrow"
      height={10}
    />
  </p>
)

export default ReadMore
