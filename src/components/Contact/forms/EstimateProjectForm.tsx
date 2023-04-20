import React, { Component } from 'react'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'

import { validateEmail } from './utils'

class EstimateProjectForm extends Component {
  state = {
    submitEnabled: false
  }

  handleInputChange = event => {
    const validationResult = validateEmail(event.target.value)
    this.setState({ submitEnabled: validationResult })
  }

  render = () => {
    const { submitEnabled } = this.state
    const {
      imageData: { androidIcon, iosIcon, bothIcon, scratchIcon, legacyIcon }
    } = this.props

    return (
      <form method="post" data-netlify="true" name="estimate" action="/estimate-requested">
        <input type="hidden" name="form-name" value="estimate" />
        <ol className="estimate-list">
          <li className="radio">
            <legend className="sub1">
              <span className="mobile-only">1. </span>
              Which mobile platform do you want to target?
            </legend>
            <div className="row">
              <input type="radio" id="android" name="system" value="android" />
              <label htmlFor="android">
                <GatsbyImage
                  className="image-wrapper"
                  image={getImage(androidIcon)!}
                  alt="Android platform"
                />
                <p className="image-label">Android</p>
              </label>
              <input type="radio" id="ios" name="system" value="ios" />
              <label htmlFor="ios">
                <GatsbyImage
                  className="image-wrapper"
                  image={getImage(iosIcon)!}
                  alt="iOS platform"
                />
                <p className="image-label">iOS</p>
              </label>
              <input type="radio" id="both" name="system" value="both" />
              <label htmlFor="both">
                <GatsbyImage
                  className="image-wrapper"
                  image={getImage(bothIcon)!}
                  alt="Android & iOS platforms"
                />
                <p className="image-label">Both</p>
              </label>
            </div>
          </li>
          <li className="radio">
            <legend className="sub1">
              <span className="mobile-only">2. </span>
              What's the state of the project?
            </legend>
            <div className="row">
              <div>
                <input type="radio" id="greenfield" name="state" value="greenfield" />
                <label htmlFor="greenfield">
                  <GatsbyImage
                    className="image-wrapper"
                    image={getImage(scratchIcon)!}
                    alt="From scratch"
                  />
                  <p className="image-label">Starting from scratch</p>
                </label>
              </div>
              <div>
                <input type="radio" id="legacy" name="state" value="legacy" />
                <label htmlFor="legacy">
                  <GatsbyImage
                    className="image-wrapper"
                    image={getImage(legacyIcon)!}
                    alt="Legacy project"
                  />
                  <p className="image-label">There's an app already</p>
                </label>
              </div>
            </div>
          </li>
          <li>
            <legend className="sub1">
              <span className="mobile-only">3. </span>
              Tell us a bit about the project
            </legend>
            <div className="row">
              <div className="column-400">
                <div>
                  <label htmlFor="name"> Your name </label>
                  <input type="text" name="name" />
                </div>
                <div>
                  <label htmlFor="email"> Email address </label>
                  <input type="text" name="email" onChange={this.handleInputChange} />
                </div>
                <div>
                  <label htmlFor="phone">Phone (only if you prefer us to call)</label>
                  <input type="text" name="phone" />
                </div>
              </div>

              <div className="column-400">
                <label htmlFor="text">Tell us about your idea</label>
                <textarea name="text" />
              </div>
            </div>
            <p>
              Need NDA first? E-mail us at
              <br />
              <a href="mailto:urgent-nda@brainsandbeards.com">urgent-nda@brainsandbeards.com</a>
            </p>
            <button disabled={!submitEnabled} className="cta-action">
              Estimate project
            </button>
          </li>
        </ol>
      </form>
    )
  }
}

export default EstimateProjectForm
