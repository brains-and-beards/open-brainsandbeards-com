import { graphql } from 'gatsby'

export const teamOutsourcingIconImageFragment = graphql`
  fragment teamOutsourcingIconImageFragment on File {
    childImageSharp {
      gatsbyImageData(
        height: 320
        quality: 90
        placeholder: TRACED_SVG
        layout: FIXED
      )
    }
  }
`
