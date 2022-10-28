import { graphql } from 'gatsby'

export const illustrationIconImageProps = graphql`
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
