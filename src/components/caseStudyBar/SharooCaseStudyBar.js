import { graphql, useStaticQuery } from 'gatsby';
import React from 'react';
import CaseStudyBar from './CaseStudyBar';

export const query = graphql`
query {
  heroImage: file(
    relativePath: { regex: "/sharoo\/sharoo-hero/" }
    sourceInstanceName: { eq: "caseStudiesAssets" }
  ) {
    childImageSharp {
      gatsbyImageData(
        width: 680
      )
    }
  }
  logoImage: file(
    relativePath: { regex: "/sharoo\/sharoo-logo/" }
    sourceInstanceName: { eq: "caseStudiesAssets" }
  ) {
    childImageSharp {
      gatsbyImageData(
        height: 22
      )
    }
  }
}
`

const SharooCaseStudyBar = ({ pageType }) => {
    const { heroImage, logoImage } = useStaticQuery(query);

    return (
      <CaseStudyBar
        heroImage={heroImage}
        logoImage={logoImage}
        header="We helped sharoo team conquering carsharing economy in Switzerland"
        desc="How we implemented unique mobile applications supporting renting and interacting with rented vehicles."
        url="/projects/sharoo"
        pageType={pageType || "home"}
    />)
}

export default SharooCaseStudyBar;
