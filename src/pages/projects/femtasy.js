import React, { Component } from 'react'
import { graphql } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'

import Layout from '../../templates/layout'
import EstimateProjectBar from '../../components/EstimateProjectBar'
import Testimonial from '../../components/Testimonial'

class FemtasyCaseStudy extends Component {
  render = () => {
    const { heroImage, reviewsImage } = this.props.data

    return (
      <Layout
        headerTitle="Case study: femtasy"
        headerSub="Story of a successful launch of a mobile app for an award-winning streaming platform."
        simpleNavbar
        projects
      >
        <div id="case-study">
          <div className="big-part-yellow">
            <GatsbyImage
              image={getImage(heroImage)}
              className="heading-pic"
              alt="LokalPortal main page"
            />
          </div>

          <div className="narrow-column text-format">
            <p>
              <a href="https://www.femtasy.com" target="_blank">
                Femtasy
              </a>{' '}
              is a streaming platform for erotic audio stories for women (and
              everybody else!). Launched in 2018, the project has been voted a
              digital startup of the year 2020 and received an award from the
              German <em>Bundesministerium für Wirtschaft und Energie</em> (The
              Federal Ministry for Economic Affairs and Energy).
            </p>
            <p>
              They've already built a solid user base on their web platform.
              However, as we all know, the future is mobile, so they've decided
              to explore what this platform could bring to their business.
            </p>
          </div>

          <Testimonial
            quote="Together with the team of Brains & Beards we developed and successfully published our first app prototype at femtasy for iOS and Android. We truly valued the flexible, hands-on and effective collaboration with Patryk and Natalia."
            photo={require('./../../assets/testimonials/femtasy-michael.jpg')}
            name="Michael Holzner"
            position="co-founder"
            company="Pink Internet GmbH"
          />

          <div className="narrow-column text-format">
            <h3>Challenges</h3>
            <p>
              We were hired to build a prototype (or MVP, depending on how you
              call it) of a player app for Femtasy's content in the summer of
              2020. The scope was intentionally small, because apart from the
              obvious outcome of releasing an app for their audience, they
              wanted to get answers to the following questions:
            </p>
            <ul>
              <li>
                How many users would be interested in accessing content over
                mobile rather than web? Is it going to bring in new users in
                numbers that would justify the effort spent maintaining the two
                platforms?
              </li>
              <li>
                Would Apple and Google even allow a Femtasy's application in
                their stores? App reviews are subjective and guidelines around
                erotic content are very vague and open to different
                interpretations. It's best to validate that as soon as possible.
              </li>
              <li>
                How would a new platform fit into the current team's development
                process? Femtasy already have a productive in-house team of
                experienced developers handling backend and web. The web
                frontend is in React, so the idea was to build the app in React
                Native hoping that would allow the current team to take over the
                ownership of the code easily.
              </li>
            </ul>
            <p>
              Finally, as with all startups, there's always an important
              question of time. On one hand we want to have high code quality
              with good documentation to allow for easy project handover at the
              end, but on the other hand we want the app done fast, so we can
              get answers to out questions as soon as possible. In a true agile
              way.
            </p>
          </div>
          <Testimonial
            quote="During the whole process the communication was fantastic and the process was kept simple and lean allowing us to focus on what really mattered for the success of our project."
            photo={require('./../../assets/testimonials/femtasy-ale.png')}
            name="Alejandro Dev."
            position="Head of Engineering"
            company="Pink Internet GmbH"
          />
          <div className="narrow-column text-format">
            <h3>Process</h3>
            <p>
              As mentioned previously, it's been decided upfront to build the
              app in React Native to take advantage of the React skills that the
              in-house team's beed honing on their web frontend. However, as the
              app's main purpose is playback of audio content, we knew we'll
              have to pull in some heavy native dependencies. Managing audio
              playback (especially when the app is in the background) is very
              platform-specific functionality, but we managed to isolate it in a
              single component and keep native configuration manageable.
            </p>
            <p>
              Of course, making sure such a device-specific functionality works
              well requires rigorous testing. Fortunately, we already had access
              to the most common user devices due to traffic information on the
              mobile website and we knew how to prioritise devices for user
              testing. Especially those which usually reveal problems (yes, I
              mean Samsung Galaxy…).
            </p>
            <p>
              The app was built using the typical React Native stack. Redux for
              state management, redux-saga for side-effects (in particular, data
              fetching over a REST API), TypeScript and eslint as the first
              safety net against typos and simple errors.
            </p>
            <p>
              In order to prepare the app for a smooth handover to the in-house
              team, we've also created a detox E2E test suite that handles the
              user happy paths, a unit test suite (using Jest) that tests
              implementation details, and also covered more complicated
              components with hand-crafted unit tests (
              <a href="https://brainsandbeards.com/blog/snapshot-testing">
                no snapshot testing here
              </a>
              ). We've also automated the process of building the app and
              releasing it for user testing. These steps should give the new
              team more confidence when taking over and limit the amount of
              native mobile knowledge they'll need.
            </p>
          </div>

          <Testimonial
            quote="Brains & Beards have helped us achieve our ambitious goal through their professionalism, expertise and great communication. I felt in good hands throughout the whole process and was always sure that they would point out if there was a problem or a better way of doing something."
            photo={require('./../../assets/testimonials/femtasy-peter.jpg')}
            name="Peter Fessel"
            position="Product Manager"
            company="Pink Internet GmbH"
          />

          <div className="narrow-column text-format">
            <h3>Outcome</h3>
            <p>
              The result was even better than expected. Not only we managed to
              release a working version of the app on time, but even this first
              prototype version gathered great feedback from the users. We got a
              straight 5,0 score on App Store on the first 20 app reviews 🎉
            </p>
            <div>
              <GatsbyImage
                image={getImage(reviewsImage)}
                alt="Femtasy reviews"
              />
              <figcaption>
                Overwhelmingly positive app reviews since Day 1
              </figcaption>
            </div>
            <p>
              Users also reached out directly and we were able to use their
              feedback to prioritise what features should be built next and
              iteratively improved the app. It was clear from the engagement the
              users showed that they care a lot about the mobile platform and
              it'll stay an important part of the Femtasy product.
            </p>
            <p>
              Of course, such a success was only possible due to intuitive
              designs, efficient product planning and great community management
              and outreach on the Femtasy side. This, combined with great
              communication with us on the implementation side, resulted in
              smooth delivery of a great product.
            </p>
            <p>
              We're still sticking around, assisting with an API transition to
              GraphQL and React Native specific knowledge transfer to help with
              onboarding of the in-house team. However, it's just a matter of
              time before they'll able to take full ownership of the codebase.
            </p>
            <p>
              PS. If this project sounds interesting to you, you should
              definitely check{' '}
              <a
                href="https://www.linkedin.com/company/femtasy/jobs/"
                target="_blank"
              >
                open positions in Femtasy
              </a>
              . They're hiring!
            </p>
          </div>
        </div>

        <Testimonial
          quote="If you're looking for experienced, pragmatic and highly communicative team, these are the guys!"
          photo={require('./../../assets/testimonials/femtasy-ale.png')}
          name="Alejandro Dev."
          position="Head of Engineering"
          company="Pink Internet GmbH"
        />
        <EstimateProjectBar
          title="Let us craft a custom solution<br/>for your product"
          buttonText="Estimate project"
        />
      </Layout>
    )
  }
}

export const mobileScreenshots = graphql`
  fragment mobileScreenshots on File {
    childImageSharp {
      gatsbyImageData(width: 500, placeholder: TRACED_SVG, layout: CONSTRAINED)
    }
  }
`

export const query = graphql`
  query femtasyCaseStudyPageQuery {
    heroImage: file(relativePath: { regex: "/femtasy-header/" }) {
      ...headingImageProps
    }
    reviewsImage: file(relativePath: { regex: "/femtasy-reviews/" }) {
      ...mobileScreenshots
    }
  }
`

export default FemtasyCaseStudy
