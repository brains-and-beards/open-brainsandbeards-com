import React from 'react'
import { graphql } from 'gatsby'
import Header from '../components/shared/layout/Header'
import Navbar from '../components/shared/layout/Navbar'
import Footer from '../components/shared/layout/Footer'
import { Location } from '@reach/router'
import '../assets/stylesheets/main.scss'

export const _headerHeroImage = graphql`
  fragment headerHeroImage on File {
    childImageSharp {
      gatsbyImageData(width: 504)
    }
  }
`

const Layout = props => {
  const {
    children,
    header,
    headerTitle,
    headerSub,
    headerImage,
    headerColumns,
    navbarBackButtonText,
    projects,
    rightContent,
    simpleNavbar
  } = props

  return (
    <>
      <Location>
        {locationProps => (
          <Navbar
            simple={simpleNavbar}
            currentLocation={locationProps.location.pathname}
            navbarBackButtonText={navbarBackButtonText}
            projects={projects}
          />
        )}
      </Location>
      <div className="yellow">
        <div className="content row header">
          {header ? (
            header
          ) : (
            <Header
              title={headerTitle}
              subtitle={headerSub}
              image={headerImage}
              columns={headerColumns}
              rightContent={rightContent}
            />
          )}
        </div>
      </div>
      {children}
      <Footer />
    </>
  )
}

export default Layout
