import { Link } from 'gatsby'
import { StaticImage } from 'gatsby-plugin-image'
import React from 'react'

const Footer = () => {
  return (
    <div id="footer">
      <div className="content row">
        <div className="col">
          <p className="sub2"> Contact </p>
          <p className="caption"> Brains & Beards sp. z o.o.</p>
          <p className="caption"> VAT ID: PL9721298520 </p>
          <p className="caption">
            <a href="mailto:smile@brainsandbeards.com">smile@brainsandbeards.com</a>
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
            <Link to="/services/native-development">Native iOS and Android</Link>
            <Link to="/services/cross-platform">Cross-platform apps</Link>
            <Link to="/services/team-augmentation">Staff augmentation</Link>
          </div>
        </div>

        <div className="col">
          <StaticImage
            className="binoculars"
            src="../../../assets/illustrations/footer-binoculars.png"
            alt="peeping computer"
            width={88}
          />
          <p className="nerd-text">
            If you're a bit of a technical nerd (like us!) you can keep on reading. This site has
            been built in React, using GatsbyJS. The data layer is managed through GraphQL. The
            whole thing is hosted using Netlify. All of those products are great and we're so happy
            to be able to use them 💯❤️🚀
          </p>
        </div>
      </div>
    </div>
  )
}

export default Footer
