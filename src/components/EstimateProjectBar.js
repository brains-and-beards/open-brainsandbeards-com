import React from 'react'
import { graphql, Link, useStaticQuery } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'

export const imageProps = graphql`
  fragment imageProps on File {
    childImageSharp {
      gatsbyImageData(quality: 90, layout: FULL_WIDTH)
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
          image={getImage(leftImage)}
          className="center-mobile cta-bar-image"
          alt="Happy phone"
        />
        <div className="center">
          <h2 dangerouslySetInnerHTML={{ __html: title }} />

          <div className="button estimate-link">
            <Link to="/estimate-project/">{buttonText}</Link>
          </div>
        </div>
        <GatsbyImage
          image={getImage(rightImage)}
          className="cta-bar-image desktop-only"
          alt="Happy phone"
        />
      </div>
    </section>
  )
}

export default EstimateProjectBar
