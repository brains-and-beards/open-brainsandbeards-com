import React, { Component } from 'react'
import Img from 'gatsby-image'

import { validateEmail } from './utils'

class ContactFormInternals extends Component {
  state = {
    submitEnabled: false,
  }

  handleInputChange = (event) => {
    const validationResult = validateEmail(event.target.value)
    this.setState({ submitEnabled: validationResult })
  }

  render = () => {
    const { submitEnabled } = this.state
    const { image, title, subtitle } = this.props

    return (
      <section className="contact-form">
        <form
          method="post"
          data-netlify="true"
          name="contact"
          action="/message-sent"
        >
          <input type="hidden" name="form-name" value="contact" />
          <div className="content">
            <div className="contact-content">
              <Img fixed={image.childImageSharp.fixed} alt="Contact us" />
              {title}
              <p className="sub2 amazing">{subtitle}</p>

              <label htmlFor="email"> Email address </label>
              <input
                type="text"
                name="email"
                onChange={this.handleInputChange}
              />
              <label htmlFor="phone">Phone number (not necessary)</label>
              <input type="text" name="phone" />
              <label htmlFor="text">How can we help you ?</label>
              <textarea name="text" />

              <button disabled={!submitEnabled} className="cta-action">
                Send
              </button>
            </div>
          </div>
        </form>
      </section>
    )
  }
}

export default ContactFormInternals
