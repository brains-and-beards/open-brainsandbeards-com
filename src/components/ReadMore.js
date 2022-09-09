import React from 'react'

const ReadMore = ({ text }) => (
  <p className="read-more">
    <span className="inner-text">{text}</span>{' '}
    <img
      src={require('../assets/images/chevron-bold.svg')}
      height="10px"
      alt="arrow"
    />
  </p>
)

export default ReadMore
