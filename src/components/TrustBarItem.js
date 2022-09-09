import React, { Component } from 'react'

class TrustBarItem extends Component {
  render() {
    const { number, caption } = this.props

    return (
      <li className="trustBarItem">
        <h2> {number} </h2>
        <p className="sub2" dangerouslySetInnerHTML={{ __html: caption }} />
      </li>
    )
  }
}

export default TrustBarItem
