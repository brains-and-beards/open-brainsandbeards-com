import { graphql } from 'gatsby'

export const fluidIllustration = graphql`
  fragment fluidIllustration on File {
    childImageSharp {
      gatsbyImageData(quality: 90, placeholder: TRACED_SVG, layout: FULL_WIDTH)
    }
  }
`
