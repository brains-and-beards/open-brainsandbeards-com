import { Location } from '@reach/router'
import React, { Component, Fragment } from 'react'

import ContactForm from '../components/Contact/forms/ContactForm'
import Footer from '../components/shared/layout/Footer'
import Navbar from '../components/shared/layout/Navbar'
import SEO from '../components/shared/layout/SEO'

class ContactUs extends Component {
  render() {
    return (
      <>
        <Location>
          {locationProps => (
            <Navbar simple grey currentLocation={locationProps.location.pathname} />
          )}
        </Location>

        <ContactForm main />
        <Footer />
      </>
    )
  }
}

export default ContactUs

const title = 'Contact Us'
const description = 'Got something amazing for us? Fill in the form below to start a new project!'

export const Head = ({ location }) => (
  <SEO title={title} description={description} pathname={location.pathname} />
)
