import React, { Component } from 'react'
import { graphql } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'

import Layout from '../../templates/layout'
import EstimateProjectBar from '../../components/EstimateProjectBar'
import TrustBar from '../../components/TrustBar'
import Testimonial from '../../components/Testimonial'

class RakutenCaseStudy extends Component {
  render = () => {
    const { heroImage } = this.props.data

    return (
      <Layout
        headerTitle="Case study: Shibuya"
        headerSub="Timely delivery of a premium shopping app for a market-leading enterprise."
        simpleNavbar
        projects
      >
        <div id="case-study">
          <div className="big-part-yellow">
            <GatsbyImage
              image={getImage(heroImage)}
              className="heading-pic"
              alt="Rakuten team"
            />
          </div>
          <div className="narrow-column">
            <div className="text-format">
              <h3>Challenge</h3>

              <p>
                Rakuten is a huge company that is best known in Europe for their
                sponsorship of the famous FC Barcelona, not necessarily for
                their business. So let me quote Wikipedia to give you a bit of
                context:
              </p>

              <div className="inset">
                <p>
                  Rakuten, Inc. (楽天株式会社) is a Japanese electronic commerce
                  and Internet company based in Tokyo and founded in 1997 by
                  Hiroshi Mikitani. Its B2B2C e-commerce platform Rakuten Ichiba
                  is the largest e-commerce site in Japan and among the world’s
                  largest by sales. The company operates Japan's biggest
                  Internet bank and third-largest credit card company (by
                  transaction value). It also offers e-commerce, fintech,
                  digital content and communications services to over 1 billion
                  members around the world, and operates in 29 countries and
                  regions.
                </p>
                <p>
                  It is often referred to as <em>the Amazon of Japan</em>.
                </p>
              </div>
              <p>
                We were asked to help Rakuten build a new native iOS application
                to test out in the European market. The project was on a tight,
                business-driven deadline that was even more difficult due to
                backend APIs still being developed and designs were still being
                finalised.
              </p>
            </div>
          </div>

          <Testimonial
            quote="The result was a product which is
          not only easy to maintain and robust, but as well great-looking and
          simple to understand for Rakuten users. Their years-long expertise
          helped us get rid of many problems before they even appeared."
            photo={require('./../../assets/testimonials/rakuten-sergio.jpg')}
            name="Sergio Gago"
            position="Technical director"
            company="Rakuten SL"
          />

          <div className="narrow-column">
            <h3>Process</h3>
            <p>
              Although the project's scope was pretty straightforward, there was
              a bunch of challenges in our daily work that we had to face.
            </p>
            <h4>Mocking requirements</h4>
            <p>
              For one, we had to start developing against mock APIs and then
              fluently switch as the real ones were being made available.
              Design-wise we faced a similar challenge. Fortunately, we're used
              to working in such environments and it wasn't a problem for us to
              start developing against original wireframes and polish it later,
              as soon as the final design got accepted.
            </p>
            <h4>Distributed team</h4>
            <p>
              The team we worked in was as distributed as possible, ranging from
              mobile and part of the API development was done in Spain, design
              in Germany and there was even a team in Japan that owned some of
              the dependencies that we were using. With such language, culture,
              and timezone barriers this was definitely the most distributed
              project that we were a part of!
            </p>
            <h4>Handling both platforms</h4>
            <p>
              Finally, as we were approaching completion with the iOS
              application, it became apparent we'll have to help out with the
              Android version as well. Fortunately, the iOS development was
              ahead of schedule, so we could easily move some of our resources
              to help get the other platform up to speed.
            </p>
            <h3>Results</h3>
            <p>
              As a result, we managed to not only deliver the iOS application on
              schedule, with no compromise on quality, but also significantly
              help with the development of the Android version.
            </p>

            <p className="effect">
              In 13 weeks we managed not only to create a completely custom
              native iOS application, but also delivered a significant part of
              functionality for the Android platform.
            </p>
          </div>
        </div>

        <TrustBar
          items={[
            { value: '2', label: 'developers' },
            { value: '13', label: 'weeks' },
            {
              value: '2',
              label: 'native platforms',
            },
          ]}
        />

        <EstimateProjectBar
          title="Let us craft a custom solution<br/>for your product"
          buttonText="Estimate project"
        />
      </Layout>
    )
  }
}

export const query = graphql`
  query rakutenCaseStudyPageQuery {
    heroImage: file(relativePath: { regex: "/rakuten-team/" }) {
      ...headingImageFragment
    }
  }
`

export default RakutenCaseStudy
