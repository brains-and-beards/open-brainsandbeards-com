import { graphql } from 'gatsby'
import React, { Component } from 'react'

import SEO from '../components/shared/layout/SEO'
import Layout from '../templates/layout'

class MessageSent extends Component {
  render() {
    const { heroImage } = this.props.data

    return (
      <Layout
        headerTitle="Thanks!"
        headerSub="Thanks for contacting us. We'll get back to you soon!"
        headerImage={heroImage}
        headerColumns
        simpleNavbar
      />
    )
  }
}

export const query = graphql`
  query messageSentPageQuery {
    heroImage: file(relativePath: { regex: "/estimate-requested-hero/" }) {
      childImageSharp {
        gatsbyImageData(width: 650)
      }
    }
  }
`

export default MessageSent

const title = 'Message sent'
const description = "We'll get back to you soon!"

export const Head = ({ location }) => (
  <SEO title={title} description={description} pathname={location.pathname} />
)
