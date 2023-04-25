import { graphql, useStaticQuery } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import React from 'react'

import { blogAuthorsImages } from '../../configs/consts'

const query = graphql`
  query {
    allFile(filter: { sourceInstanceName: { eq: "blogAuthorsAssets" } }) {
      nodes {
        relativePath
        childImageSharp {
          gatsbyImageData(width: 80, height: 80)
        }
      }
    }
  }
`

const AuthorWithPicture = ({ author, firstPost }) => {
  const data = useStaticQuery(query)

  if (!blogAuthorsImages[author]) return <div /> // Author not defined

  const suffix = firstPost ? '' : '-list'

  const image = data.allFile.nodes.find(
    it => it.relativePath === blogAuthorsImages[author].imageName
  )

  return (
    <div>
      <div className={`author-container${suffix}`}>
        <div className="author-content">
          <GatsbyImage
            image={getImage(image)}
            alt={`Blog author: ${author}`}
            imgClassName="circular-image"
            className="circular-image"
          />
        </div>
        <div>
          <p className="author-name">{author}</p>
          <p className="author-title">{blogAuthorsImages[author].title}</p>
        </div>
      </div>
    </div>
  )
}

export default AuthorWithPicture
