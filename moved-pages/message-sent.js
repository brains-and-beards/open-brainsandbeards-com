import React, { Component } from 'react'
import { graphql } from 'gatsby'
import Layout from '../templates/layout'

class MessageSent extends Component {
  render() {
    const { heroImage } = this.props.data

    return (
      <Layout
        headerTitle="Thanks!"
        headerSub="Thanks for contacting us. We'll get back to you soon!"
        headerImage={heroImage.childImageSharp.fluid}
        headerColumns
        simpleNavbar
      />
    )
  }
}

export const query = graphql`
  query messageSentPageQuery {
    heroImage: file(relativePath: { regex: "/estimate-requested-hero/" }) {
      ...headerHeroImage
    }
  }
`

export default MessageSent
