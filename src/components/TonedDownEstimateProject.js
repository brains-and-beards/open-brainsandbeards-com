import React, { Component } from 'react'
import { Link } from 'gatsby'

class TonedDownEstimateProject extends Component {
  static defaultProps = {
    title: 'Want to start<br/>a great project?',
    buttonText: 'Get an estimate',
  }

  render() {
    const { title, buttonText } = this.props

    return (
      <section className="toned-down estimateProject">
        <div className="narrow-column">
          <div className="center">
            <h3 dangerouslySetInnerHTML={{ __html: title }} />
            <div className="button estimate-link yellow">
              <Link to="/estimate-project/">{buttonText}</Link>
            </div>
          </div>
        </div>
      </section>
    )
  }
}

export default TonedDownEstimateProject
