import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { blogAuthorsImages } from '../configs/consts'
import { AnchorLink } from 'gatsby-plugin-anchor-links'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'

const query = graphql`
query {
  allFile(filter:{
    sourceInstanceName: { eq: "blogAuthorsAssets" }
  }) {
    nodes {
      relativePath
      childImageSharp {
        gatsbyImageData(
          width: 80
          height: 80
        )
      }
    }
    
  }
}`

const AuthorWithPictureAndText = ({ author, text }) => {
  const data = useStaticQuery(query)

  if (!blogAuthorsImages[author]) return <div />

  const image = data
    .allFile
    .nodes
    .find(it => it.relativePath === blogAuthorsImages[author].imageName)


  return (
    <AnchorLink to={`/team#${author.split(' ')[0]}`}>
      <div className="written-by-container">
        <div className="author-container">
          <div className="author-content">
            <GatsbyImage
              image={getImage(image)}
              alt={`Blog author: ${author}`}
              imgClassName="circular-image"
              className="circular-image"
            />
          </div>
          <div>
            <h5 className="written-by">{text}</h5>
            <p className="written-by-author-name">{author}</p>
            <p className="written-by-author-title">
              {blogAuthorsImages[author].title}
            </p>
          </div>
        </div>
      </div>
    </AnchorLink>
  )
}

export default AuthorWithPictureAndText
