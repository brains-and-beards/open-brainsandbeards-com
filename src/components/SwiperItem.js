import React from 'react'

const SwiperItem = ({
  photo,
  quote,
  name,
  position,
  company,
  onPrev,
  onNext,
}) => (
  <div className="swiper">
    <div className="row photo">
      <a href="#" onClick={onPrev} className="reference back">
        <img
          src={require('../assets/images/chevron.svg')}
          className="reverse"
          height="24px"
          alt="arrow"
        />
      </a>
      <img src={photo} height="152px" className="round" />
      <a href="#" onClick={onNext} className="reference next">
        <img
          src={require('../assets/images/chevron.svg')}
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

export default SwiperItem
