import { StaticImage } from 'gatsby-plugin-image'
import React from 'react'

const ReadMore = ({ text }) => (
  <div className='read-more-container'>
    <p className="read-more">
      <span className='inner-text'>{text}</span>
    </p>
    <StaticImage
      src={'../assets/images/chevron-bold.svg'}
      alt="arrow"
      height={10}
      className="read-more-image"
    />
  </div>
)

export default ReadMore
