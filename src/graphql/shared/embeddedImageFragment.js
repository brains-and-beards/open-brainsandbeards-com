import { graphql } from 'gatsby'

export const embeddedImageFragment = graphql`
  fragment embeddedImageFragment on File {
    childImageSharp {
      gatsbyImageData(
        width: 600
        quality: 80
        placeholder: TRACED_SVG
        layout: CONSTRAINED
      )
    }
  }
`
