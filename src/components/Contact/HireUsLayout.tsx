import { Location } from '@reach/router'
import { Link, graphql } from 'gatsby'
import React from 'react'

import '../../assets/stylesheets/main.scss'
import Footer from '../shared/layout/Footer'
import Header from '../shared/layout/Header'
import Navbar from '../shared/layout/Navbar'

export const _headerHeroImage = graphql`
  fragment headerHeroImage on File {
    childImageSharp {
      gatsbyImageData(width: 504)
    }
  }
`

const HeaderSubtitle = ({ text }) => {
  return (
    <>
      <div className="sub2">{text}</div>
      <div className="button estimate-link header-cta">
        <Link className="center" to="/free-consultation">
          Book a free consultation
        </Link>
      </div>
    </>
  )
}

const Layout = props => {
  const { children, headerTitle, headerSub, headerImage } = props

  return (
    <div className="hire-us">
      <Location>
        {locationProps => (
          <Navbar simple currentLocation={locationProps.location.pathname} projects />
        )}
      </Location>
      <div className="yellow">
        <div className="content row header">
          <Header
            title={headerTitle}
            subtitle={<HeaderSubtitle text={headerSub} />}
            image={headerImage}
            columns
            rightContent={undefined}
          />
        </div>
      </div>
      {children}
      <Footer />
    </div>
  )
}

export default Layout
