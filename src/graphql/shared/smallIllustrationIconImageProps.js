import { graphql } from 'gatsby'

export const smallIllustrationIconImageProps = graphql`
  fragment smallIllustrationIconImageProps on File {
    childImageSharp {
      gatsbyImageData(
        height: 80
        width: 80
        quality: 90
        placeholder: TRACED_SVG
        layout: FIXED
      )
    }
  }
`
