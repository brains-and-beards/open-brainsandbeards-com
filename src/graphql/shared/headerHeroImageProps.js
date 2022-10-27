import { graphql } from 'gatsby'

export const headerHeroImage = graphql`
  fragment headerHeroImage on File {
    childImageSharp {
      gatsbyImageData(width: 504, placeholder: TRACED_SVG, layout: CONSTRAINED)
    }
  }
`
