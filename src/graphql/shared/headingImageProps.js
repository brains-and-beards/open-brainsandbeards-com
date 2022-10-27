import { graphql } from 'gatsby'

export const headingImageProps = graphql`
  fragment headingImageProps on File {
    childImageSharp {
      gatsbyImageData(quality: 80, placeholder: TRACED_SVG, layout: FULL_WIDTH)
    }
  }
`
