import React from 'react'
import { graphql } from 'gatsby'
import { getImage } from 'gatsby-plugin-image'

import Layout from '../templates/layout'
import EstimateProjectForm from '../components/forms/EstimateProjectForm'

const EstimateProject = ({ data }) => {
  return (
    <Layout
      headerTitle="Get an estimate"
      headerSub="Let us know what you need, we'll contact you promptly to discuss how we can help with your project."
      headerImage={getImage(data.heroImage)}
      headerColumns
      simpleNavbar
    >
      <div className="estimate-project-form">
        <div className="content">
          <EstimateProjectForm imageData={data} />
        </div>
      </div>
    </Layout>
  )
}

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
