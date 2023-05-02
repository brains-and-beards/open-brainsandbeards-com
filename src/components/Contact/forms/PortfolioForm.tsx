import React, { Component } from 'react'

import { validateEmail } from './utils'

class PortfolioForm extends Component {
  state = {
    submitEnabled: false
  }

  handleInputChange = event => {
    const validationResult = validateEmail(event.target.value)
    this.setState({ submitEnabled: validationResult })
  }

  render = () => {
    const { submitEnabled } = this.state

    return (
      <section className="contact-form know-more">
        <div className="content center">
          <h3 className="small-headline"> Still want to know more? </h3>
          <p className="sub2">
            If you share with us your email address, we'll send you a detailed presentation on us:
            <br /> who we are, how we work, what kind of projects we recently delivered, etc.
          </p>
          <div className="know-more narrow-column">
            <form method="post" data-netlify="true" action="/message-sent" name="know_more">
              <input type="hidden" name="form-name" value="know_more" />
              <label htmlFor="email">Email address</label>

              <div className="row form">
                <input type="text" name="email" onChange={this.handleInputChange} />
                <button disabled={!submitEnabled}>I want to know more</button>
              </div>
            </form>
          </div>
          <div className="narrow-column">
            <p className=" micro">
              Clicking "I want to know more" you consent to processing your data by
              Brains&nbsp;&amp;&nbsp;Beards&nbsp;sp.&nbsp;zo.o. for marketing purposes, including
              sending emails.
            </p>
          </div>
        </div>
      </section>
    )
  }
}

export default PortfolioForm
