import { graphql } from 'gatsby'

export const smallIllustrationIconImageFragment = graphql`
  fragment smallIllustrationIconImageFragment on File {
    childImageSharp {
      gatsbyImageData(height: 80, width: 80, quality: 90, layout: FIXED)
    }
  }
`
