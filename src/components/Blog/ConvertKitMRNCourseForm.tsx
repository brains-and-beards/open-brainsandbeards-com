import * as React from 'react'
import { Component } from 'react'

class ConvertKitMRNCourseForm extends Component {
  componentDidMount() {
    const script = document.createElement('script')
    script.src = 'https://brains-beards.ck.page/a54204fd58/index.js'
    script.async = true
    script.setAttribute('data-uid', 'a54204fd58')
    this.instance.appendChild(script)
  }

  render() {
    return <div className="convertkit-form" ref={el => (this.instance = el)}></div>
  }
}

export default ConvertKitMRNCourseForm
