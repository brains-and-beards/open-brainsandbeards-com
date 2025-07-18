import React, { Component } from 'react'

import SEO from '../components/shared/layout/SEO'
import Layout from '../templates/layout'

const title = '404 Not found'
const description = "You just hit a route that doesn't exist... the sadness."

class NotFound extends Component {
  render() {
    return <Layout headerTitle={title} headerSub={description} />
  }
}

export default NotFound

export const Head = ({ location }) => (
  <SEO pathname={location.pathname} title={title} description={description}>
    <script>
      {
        "document.addEventListener('DOMContentLoaded', function () { plausible('404', { props: { path: document.location.pathname } }); });"
      }
    </script>
  </SEO>
)
