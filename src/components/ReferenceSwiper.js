import React from 'react'
import Swiper from './Swiper'
import SwiperItem from './SwiperItem'

import references from '../assets/testimonials'
import { graphql, useStaticQuery } from 'gatsby'

export const query = graphql`
query {
  allFile(
    filter: { 
      sourceInstanceName: { eq: "testimonialsAssets" },
      relativePath: {
        in: ["rakuten-sergio.jpg", "sharoo-feyyaz.jpg", "xing-sebastian.jpg"]
      }
    }
  ) {
    nodes {
      relativePath
      childImageSharp {
        gatsbyImageData(
          height: 152
        )
      }
    }
  }
}
`

const ReferenceSwiper = () => {
  const { nodes: images } = useStaticQuery(query).allFile

  const referencesWithImages = references.map(it => {
    const image = images.find(file => file.relativePath === it.photo)
    return ({
      ...it,
      image
    })
  })

  return (
    <div className="references">
      <Swiper ContentClass={SwiperItem} items={referencesWithImages} />
    </div>
  )
}

export default ReferenceSwiper
