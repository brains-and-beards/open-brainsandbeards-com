import React, { Component } from 'react'
import Layout from '../templates/layout'

class NotFound extends Component {
  render() {
    return (
      <Layout
        headerTitle="404 Not found"
        headerSub="You just hit a route that doesn't exist... the sadness."
      />
    )
  }
}

export default NotFound
