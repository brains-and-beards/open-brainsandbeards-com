import { GatsbyImage, getImage, StaticImage } from 'gatsby-plugin-image'
import React from 'react'

const SwiperItem = ({
  photo,
  image,
  quote,
  name,
  position,
  company,
  onPrev,
  onNext,
}) => {
  return (
    <div className="swiper">
      <div className="row photo">
        <a href="#" onClick={onPrev} className="reference back">
          <StaticImage
            src="../assets/images/chevron.svg"
            className="reverse"
            height="24px"
            alt="arrow"
          />
        </a>
        <GatsbyImage
          image={getImage(image)}
          imgClassName="round"
          loading="eager"
        />
        <a href="#" onClick={onNext} className="reference next">
          <StaticImage
            src="../assets/images/chevron.svg"
            height="24px"
            alt="arrow"
          />
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
