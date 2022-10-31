import { graphql } from 'gatsby'

export const headingImageFragment = graphql`
  fragment headingImageFragment on File {
    childImageSharp {
      gatsbyImageData(quality: 80, layout: FULL_WIDTH)
    }
  }
`
