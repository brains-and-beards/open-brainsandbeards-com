import { Link, graphql } from 'gatsby'
import React from 'react'

import FreeConsultationBar from '../components/Contact/FreeConsultationBar'
import Layout from '../components/Contact/HireUsLayout'
import SpeakerImagesBar from '../components/Contact/SpeakerImagesBar'
import SEO from '../components/shared/layout/SEO'

const title = 'Hire us'
const description =
  'Book a free consultation where we can discuss your project and how we can help.'

const HireUs = props => {
  const { heroImage } = props.data

  return (
    <Layout headerTitle={title} headerSub={description} headerImage={heroImage}>
      <div className="content-page">
        <div className="big-part-yellow">
          <div className="youtube-wrapper">
            <iframe
              src="https://www.youtube.com/embed/P7saK1Egnc0"
              className="youtube"
              title="How it all started"
            />
          </div>
        </div>

        <div className="narrow-column">
          <div className="text-format">
            <h3 className="center"> Start with a free consultation </h3>
            <p>
              We believe that good communication is vital in making any project successful. That's
              why instead of filing an anonymous contact form, we encourage you to have a chat with
              us about your project instead.
            </p>
            <p>
              We'll use this time to discuss what you need and figure out together how Brains &
              Beards might fit into this picture. If all goes well, we'll identify the next steps
              towards delivering a great project together. Worst case scenario, you'll get free
              advice from industry experts.
            </p>
            <p>
              PS. Of course, if you're not into starting off with sync communication, that's cool as
              well. Just write us about your project using a{' '}
              <Link to="/estimate-project">regular contact form</Link> and we'll get back to you.
            </p>
          </div>
          <div className="button estimate-link">
            <a className="center" href="/free-consultation">
              Book a free consultation
            </a>
          </div>
        </div>
      </div>
      <SpeakerImagesBar />
      <FreeConsultationBar />
    </Layout>
  )
}

export const query = graphql`
  query hireUsQuery {
    heroImage: file(relativePath: { regex: "/estimate-hero/" }) {
      ...headerHeroImage
    }
  }
`

export default HireUs

export const Head = ({ location }) => (
  <SEO title={title} description={description} pathname={location.pathname} />
)
