import { graphql } from 'gatsby'

export const imageProps = graphql`
  fragment illustrationIconImageProps on File {
    childImageSharp {
      gatsbyImageData(
        height: 192
        quality: 90
        placeholder: TRACED_SVG
        layout: FIXED
      )
    }
  }
`
