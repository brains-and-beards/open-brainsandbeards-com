import React from 'react'

import Header from '../components/Header'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Location } from '@reach/router'

import '../assets/stylesheets/main.scss'
import { graphql } from 'gatsby'

export const _headerHeroImage = graphql`
  fragment headerHeroImage on File {
    childImageSharp {
      gatsbyImageData(
        width: 504
      )
    }
  }
`

const Layout = (props) => {
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
      simpleNavbar,
    } = props

    return (
      <>
        <Location>
        {(locationProps) => (
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
