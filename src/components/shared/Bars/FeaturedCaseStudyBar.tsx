import { StaticImage } from 'gatsby-plugin-image'
import React from 'react'

import CaseStudyBar from './CaseStudyBar'
import { manomanoHeroImage, manomanoLogoImage } from '../../CaseStudies/images'

const FeaturedCaseStudyBar = () => {
  return (
    <CaseStudyBar
      heroImage={manomanoHeroImage}
      logoImage={manomanoLogoImage}
      header="Ecommerce app for a French unicorn"
      desc="Turning a quick prototype into a fully-fledged ecommerce app for several European markets."
      url="/projects/manomano"
      pageType="home"
    />
  )
}

export default FeaturedCaseStudyBar
