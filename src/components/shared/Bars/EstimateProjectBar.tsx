import { Link } from 'gatsby'
import { StaticImage } from 'gatsby-plugin-image'
import React from 'react'

const EstimateProjectBar = props => {
  const title = props.title || 'Want to start<br/>a great project?'
  const buttonText = props.buttonText || 'Get an estimate'

  return (
    <section className="estimateProject">
      <div className="content row">
        <StaticImage
          src="../../../assets/illustrations/estimate-project-bar-left.png"
          className="center-mobile cta-bar-image"
          alt="Happy phone"
          placeholder="blurred"
          height={400}
        />

        <div className="center">
          <h2 dangerouslySetInnerHTML={{ __html: title }} />

          <div className="button estimate-link">
            <Link to="/estimate-project/">{buttonText}</Link>
          </div>
        </div>

        <StaticImage
          src="../../../assets/illustrations/estimate-project-bar-right.png"
          className="cta-bar-image desktop-only"
          alt="Happy phone"
          placeholder="blurred"
          height={400}
        />
      </div>
    </section>
  )
}

export default EstimateProjectBar
