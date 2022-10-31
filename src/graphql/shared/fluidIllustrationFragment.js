import { graphql } from 'gatsby'

export const fluidIllustrationFragment = graphql`
  fragment fluidIllustrationFragment on File {
    childImageSharp {
      gatsbyImageData(quality: 90, layout: FULL_WIDTH)
    }
  }
`
