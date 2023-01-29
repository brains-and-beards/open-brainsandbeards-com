import React from 'react'
import { graphql, Link, useStaticQuery } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'

export const imageProps = graphql`
  fragment imageProps on File {
    childImageSharp {
      gatsbyImageData(
        layout: FIXED
        height: 400
        quality: 90
      )
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
        <GatsbyImage
          className="center-mobile cta-bar-image"
          image={getImage(leftImage)}
          alt="Happy phone"
        />
        <div className="center">
          <h2 dangerouslySetInnerHTML={{ __html: title }} />

          <div className="button estimate-link">
            <Link to="/estimate-project/">{buttonText}</Link>
          </div>
        </div>
        <GatsbyImage
          className="cta-bar-image desktop-only"
          image={getImage(rightImage)}
          alt="Happy phone"
        />
      </div>
    </section>
  )
}

export default EstimateProjectBar
