import { graphql } from 'gatsby'

export const illustrationIconImageFragment = graphql`
  fragment illustrationIconImageFragment on File {
    childImageSharp {
      gatsbyImageData(height: 192, quality: 90, layout: FIXED)
    }
  }
`
