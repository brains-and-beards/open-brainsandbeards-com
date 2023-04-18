import { graphql } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import React from "react";

const Testimonial = ({ image, quote, name, position, company }) => (
  <div className="testimonial">
    <div className="content">
      <div className="row photo">
        <GatsbyImage
          image={getImage(image)}
          imgClassName="round"
          alt="testimonial"
        />
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
);

export const _testimonialImageFragment = graphql`
  fragment testimonialImageFragment on File {
    childImageSharp {
      gatsbyImageData(height: 152, transformOptions: { fit: CONTAIN })
    }
  }
`;

export default Testimonial;
