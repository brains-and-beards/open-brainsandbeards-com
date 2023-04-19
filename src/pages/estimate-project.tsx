import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../templates/layout'
import EstimateProjectForm from '../components/Contact/forms/EstimateProjectForm'
import SEO from '../components/shared/layout/SEO'

const EstimateProject = props => {
  const { heroImage } = props.data

  return (
    <Layout
      headerTitle="Get an estimate"
      headerSub="Let us know what you need, we'll contact you promptly to discuss how we can help with your project."
      headerImage={heroImage}
      headerColumns
      simpleNavbar
    >
      <div className="estimate-project-form">
        <div className="content">
          <EstimateProjectForm imageData={props.data} />
        </div>
      </div>
    </Layout>
  )
}

export const _fluidIllustration = graphql`
  fragment fluidIllustration on File {
    childImageSharp {
      gatsbyImageData(height: 192)
    }
  }
`

export const query = graphql`
  query estimatePageQuery {
    heroImage: file(relativePath: { regex: "/estimate-hero/" }) {
      ...headerHeroImage
    }
    androidIcon: file(relativePath: { regex: "/estimate-android-icon/" }) {
      ...fluidIllustration
    }
    iosIcon: file(relativePath: { regex: "/estimate-ios-icon/" }) {
      ...fluidIllustration
    }
    bothIcon: file(relativePath: { regex: "/estimate-both-icon/" }) {
      ...fluidIllustration
    }
    scratchIcon: file(relativePath: { regex: "/estimate-scratch-icon/" }) {
      ...fluidIllustration
    }
    legacyIcon: file(relativePath: { regex: "/estimate-legacy-icon/" }) {
      ...fluidIllustration
    }
  }
`

export default EstimateProject

const title = 'Request estimate'
const description =
  "Let us know what you need, we'll contact you promptly to discuss how we can help with your project."

export const Head = ({ location }) => (
  <SEO title={title} description={description} pathname={location.pathname} />
)
