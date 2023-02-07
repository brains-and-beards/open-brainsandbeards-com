import React, { Component, Fragment } from 'react'
import { Location } from '@reach/router'

import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ContactForm from '../components/forms/ContactForm'
import SEO from '../components/SEO'

class ContactUs extends Component {
  render() {
    return (
      <Fragment>
        {/* TODO pathname */}
        <SEO title={'Contact Us'} />
        <Location>
          {(locationProps) => (
            <Navbar
              simple
              grey
              currentLocation={locationProps.location.pathname}
            />
          )}
        </Location>

        <ContactForm main />
        <Footer />
      </Fragment>
    )
  }
}

export default ContactUs
