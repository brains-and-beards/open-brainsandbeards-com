import { graphql } from 'gatsby'

export const headerHeroImageFragment = graphql`
  fragment headerHeroImageFragment on File {
    childImageSharp {
      gatsbyImageData(width: 504, layout: CONSTRAINED)
    }
  }
`
