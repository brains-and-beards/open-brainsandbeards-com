import React from 'react'

const Testimonial = ({ photo, quote, name, position, company }) => (
  <div className="testimonial">
    <div className="content">
      <div className="row photo">
        <img src={photo} height="152px" className="round" alt="testimonial" />
      </div>

      <div>
        <p className="quote">{quote}</p>
        <p className="who row">
          <span className="name">
            {name}
            ,&nbsp;
          </span>
          <span>
            {position}
            ,&nbsp;
          </span>
          <span>{company}</span>
        </p>
      </div>
    </div>
  </div>
)

export default Testimonial
