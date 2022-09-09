import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../templates/layout'
import EstimateProjectForm from '../components/forms/EstimateProjectForm'

const EstimateProject = (props) => {
  const { heroImage } = props.data

  return (
    <Layout
      headerTitle="Get an estimate"
      headerSub="Let us know what you need, we'll contact you promptly to discuss how we can help with your project."
      headerImage={heroImage.childImageSharp.fixed}
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

export const _imageProps = graphql`
  fragment illustrationIconImageProps on File {
    childImageSharp {
      fixed(height: 192, quality: 90, traceSVG: { color: "#333" }) {
        ...GatsbyImageSharpFixed_tracedSVG
      }
    }
  }
`

export const _fluidIllustration = graphql`
  fragment fluidIllustration on File {
    childImageSharp {
      fluid(maxHeight: 192, quality: 90, traceSVG: { color: "#333" }) {
        ...GatsbyImageSharpFluid_tracedSVG
      }
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
