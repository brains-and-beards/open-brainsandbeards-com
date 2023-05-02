import React from 'react'

import ChevronSvg from '../../assets/images/chevron-bold.svg'

const ReadMore = ({ text }: { text: string }) => (
  <div className="read-more-container">
    <p className="read-more">
      <span className="inner-text">{text}</span>
    </p>
    <ChevronSvg height="10px" alt="" />{' '}
  </div>
)

export default ReadMore
