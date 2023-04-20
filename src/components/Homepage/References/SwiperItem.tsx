import { StaticImage } from 'gatsby-plugin-image'
import React from 'react'

const SwiperItem = ({ image, quote, name, position, company, onPrev, onNext }) => {
  return (
    <div className="swiper">
      <div className="row photo">
        <a href="#" onClick={onPrev} className="reference back">
          <StaticImage
            src="../../../assets/images/chevron.svg"
            className="reverse"
            alt="arrow"
            placeholder="blurred"
          />
        </a>
        {image}
        <a href="#" onClick={onNext} className="reference next">
          <StaticImage src="../../../assets/images/chevron.svg" alt="arrow" placeholder="blurred" />
        </a>
      </div>
      <p className="quote">{quote}</p>
      <p className="who">
        <b>{name}</b>,<br />
        {position},<br />
        {company}
      </p>
    </div>
  )
}

export default SwiperItem
