import { graphql } from 'gatsby'

export const embeddedImageFragment = graphql`
  fragment embeddedImageFragment on File {
    childImageSharp {
      gatsbyImageData(quality: 80, layout: FULL_WIDTH)
    }
  }
`