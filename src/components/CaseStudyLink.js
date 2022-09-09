import React from 'react'
import { Link } from 'gatsby'

const CaseStudyLink = ({ post }) => (
  <div>
    <Link to={post.frontmatter.path}>{post.frontmatter.title}</Link>
  </div>
)

export default CaseStudyLink
