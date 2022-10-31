import { graphql } from 'gatsby'

export const mobileScreenshotsFragment = graphql`
  fragment mobileScreenshotsFragment on File {
    childImageSharp {
      gatsbyImageData(quality: 90, layout: FULL_WIDTH)
    }
  }
`
