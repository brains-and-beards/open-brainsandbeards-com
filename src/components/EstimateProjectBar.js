import React from 'react'
import { graphql, Link, useStaticQuery } from 'gatsby'
import Img from 'gatsby-image'

export const imageProps = graphql`
  fragment imageProps on File {
    childImageSharp {
      fluid(maxHeight: 400, quality: 90, traceSVG: { color: "#333" }) {
        ...GatsbyImageSharpFluid_tracedSVG
      }
    }
  }
`

const EstimateProjectBar = (props) => {
  const title = props.title || 'Want to start<br/>a great project?'
  const buttonText = props.buttonText || 'Get an estimate'
  const { leftImage, rightImage } = useStaticQuery(graphql`
    query imageQuery {
      leftImage: file(relativePath: { regex: "/estimate-project-bar-left/" }) {
        ...imageProps
      }
      rightImage: file(
        relativePath: { regex: "/estimate-project-bar-right/" }
      ) {
        ...imageProps
      }
    }
  `)

  return (
    <section className="estimateProject">
      <div className="content row">
        <Img
          className="center-mobile cta-bar-image"
          fluid={leftImage.childImageSharp.fluid}
          alt="Happy phone"
        />
        <div className="center">
          <h2 dangerouslySetInnerHTML={{ __html: title }} />

          <div className="button estimate-link">
            <Link to="/estimate-project/">{buttonText}</Link>
          </div>
        </div>
        <Img
          className="cta-bar-image desktop-only"
          fluid={rightImage.childImageSharp.fluid}
          alt="Happy phone"
        />
      </div>
    </section>
  )
}

export default EstimateProjectBar
