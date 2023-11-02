import { Link } from 'gatsby'
import React, { Component } from 'react'

class TonedDownEstimateProject extends Component {
  static defaultProps = {
    title: 'Want to start<br/>a great project?',
    buttonText: 'Get in touch'
  }

  render() {
    const { title, buttonText } = this.props

    return (
      <section className="toned-down estimateProject">
        <div className="narrow-column">
          <div className="center">
            <h3 dangerouslySetInnerHTML={{ __html: title }} />
            <div className="button estimate-link yellow">
              <Link to="/hire-us">{buttonText}</Link>
            </div>
          </div>
        </div>
      </section>
    )
  }
}

export default TonedDownEstimateProject
