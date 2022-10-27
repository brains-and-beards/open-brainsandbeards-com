import { graphql } from 'gatsby'

export const teamOutsourcingIconImageProps = graphql`
  fragment teamOutsourcingIconImageProps on File {
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
