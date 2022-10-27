import React from 'react'
import { graphql, useStaticQuery, Link } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'

export const footerImageProps = graphql`
  fragment footerImageProps on File {
    childImageSharp {
      gatsbyImageData(
        width: 88
        quality: 90
        placeholder: TRACED_SVG
        layout: FIXED
      )
    }
  }
`

const Footer = (props) => {
  const { footerImage } = useStaticQuery(graphql`
    query footerImageQuery {
      footerImage: file(relativePath: { regex: "/footer-binoculars/" }) {
        ...footerImageProps
      }
    }
  `)

  return (
    <div id="footer">
      <div className="content row">
        <div className="col">
          <p className="sub2"> Contact </p>
          <p className="caption"> Brains & Beards sp. z o.o.</p>
          <p className="caption"> VAT ID: PL9721298520 </p>
          <p className="caption">
            <a href="mailto:smile@brainsandbeards.com">
              smile@brainsandbeards.com
            </a>
          </p>
        </div>
        <div className="col">
          <p className="sub2">Sitemap</p>
          <div className="row row-mobile sitemap">
            <div className="column">
              <Link to="/about-us">About us</Link>
              <Link to="/team">Team</Link>
              <Link to="/projects">Case studies</Link>
            </div>
            <div className="column">
              <a href="/blog">Blog</a>
              <Link to="/jobs">Careers</Link>
              <Link to="/contact-us">Contact us</Link>
            </div>
          </div>
        </div>
        <div className="col">
          <p className="sub2"> Services </p>
          <div className="column">
            <Link to="/services/native-development">
              Native iOS and Android
            </Link>
            <Link to="/services/cross-platform">Cross-platform apps</Link>
            <Link to="/services/team-augmentation">Staff augmentation</Link>
          </div>
        </div>

        <div className="col">
          <GatsbyImage
            image={getImage(footerImage)}
            className="binoculars"
            alt="peeping computer"
          />
          <p className="nerd-text">
            If you're a bit of a technical nerd (like us!) you can keep on
            reading. This site has been built in React, using GatsbyJS. The data
            layer is managed through GraphQL. The whole thing is hosted using
            Netlify. All of those products are great and we're so happy to be
            able to use them 💯❤️🚀
          </p>
        </div>
      </div>
    </div>
  )
}

export default Footer
