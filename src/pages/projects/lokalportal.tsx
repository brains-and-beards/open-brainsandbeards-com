import { graphql } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import React, { Component } from 'react'

import Testimonial from '../../components/CaseStudies/Testimonial'
import EstimateProjectBar from '../../components/shared/Bars/EstimateProjectBar'
import TrustBar from '../../components/shared/Bars/TrustBar'
import SEO from '../../components/shared/layout/SEO'
import Layout from '../../templates/layout'

class LokalportalCaseStudy extends Component {
  render = () => {
    const { heroImage, lokalportalIos, lokalportalAndroid, lokalportalLogo } = this.props.data

    return (
      <Layout
        headerTitle="Case study: Lokalportal"
        headerSub="We joined the Lokalportal mobile team and helped them reshape local journalism in Germany."
        simpleNavbar
        projects
      >
        <div id="case-study">
          <div className="big-part-yellow">
            <GatsbyImage
              image={getImage(heroImage)!}
              alt="LokalPortal main page"
              className="heading-pic"
            />
          </div>

          <div className="narrow-column text-format">
            <p>
              Lokalportal was born with a mission to be the future of local journalism in Germany.
              If you haven’t lived there you might not know how strongly people are connected to
              their neighbourhoods and activities like weekly food markets, theatres, flea markets
              etc. Most of the neighbourhoods have their small newspapers, keeping them updated on
              what is going on around and as well providing a platform where officials like the
              police can communicate with residents.
            </p>
            <p className="effect">
              Lokalportal raises those old newspapers to a new level preparing them for the digital
              future. For the first time, residents can connect in their neighbourhoods, talk to
              each other, organize events, share news and pictures. A friendly local social network.
            </p>
            <h3>Challenges</h3>
            <p>
              Lokalportal has a big mission, which is reflected in the number of features their app
              has to support. They were looking for helping hands with experience in React Native to
              support their team. The app was developed by full-time employees and some, frequently
              changing, freelancers. The main challenges were:
            </p>
            <ul>
              <li>a rapidly evolving app which needed many new features</li>
              <li>
                constantly changing team where freelancers don’t get enough time to get a deep
                knowledge of how the app is built
              </li>
              <li>
                additionally, we quickly noticed that the company was losing precious development
                time and money in some inefficiently implemented agile processes
              </li>
            </ul>
          </div>

          <Testimonial
            quote="Brains & Beards were recommended to us, since we needed experienced support for a huge and growing backlog.
            We are more than satisfied with Patryk's communication,
            the quick ramp up and the team gained significantly from his experience and skills.
            A flexible extension of resources at any time was done in a wink.
            We recommend Brains & Beards to everyone who wants to deliver mobile products as expected."
            image={lokalportalLogo}
            name="Marc Leuthardt"
            position="CTO"
            company="Lokalportal GmbH"
          />

          <div className="narrow-column text-format">
            <h3>Process</h3>
            <p>
              We were working together for 18 months, so it is impossible to mention everything
              we’ve done during this time, but I would like to point out some bigger changes.
            </p>
            <h4 className="">Agile process</h4>
            <p>
              We started with the lengthy agile processes. The first thing to do when you optimize
              performance is to measure. So we did measure. Every team meeting was accounted for.
              Once we had those numbers we hijacked (a tad 😇) the role of the scrum master for the
              team. We applied time limits for the meetings’ length, made sure they start on time,
              and that everybody was coming prepared. Everything possible to prevent wasting each
              other's and the client's company time.
            </p>
            <p>
              One of the very positive changes that we've introduced was a daily practice of writing
              down notes for the retrospective. This has replaced the previous, mostly failing,
              hectic attempts to remember what happened in the last 2 weeks during the actual
              retrospective meeting.
            </p>
            <p>
              This allowed us to efficiently capture team's existing issues in order to improve
              them. Of course, sparkling everything with a big dose of positivity to enhance
              productivity and team bonding.
            </p>
            <p>
              Once our goals were achieved and the processes became self-sustained we withdraw from
              the role and took off the Scrum Master hat. Now everybody is in charge of keeping the
              work process nice, smooth, and efficient.
            </p>
            <div className="mobileScreenshots">
              <GatsbyImage image={getImage(lokalportalIos)!} alt="iOS screenshot" />
            </div>
            <h4>Put compiler to work for us</h4>
            <p>
              How did we address the architecture problem? If you have people joining and leaving
              the team regularly how do you keep your app resilient to unwanted changes? How do you
              add features quickly?
            </p>
            <p>
              If a developer wants to understand quickly how the app works and what to change to
              implement a new feature, they have to know the flow of the data and state in the app.
              We went an extra mile to make sure there is only one source of truth for the app
              state, and that every change of state happens exactly the same way. To achieve this
              the app got a new redux setup, with very strict types. It's not possible anymore to
              dispatch an unknown action with an unsupported payload. The developers get instant
              feedback on what payload has to be handled for which action type in reducers and the
              resulting state is always as described in the store branch. And the best of all is
              that all that is enforced by the tireless compiler. This way while reviewing code we
              can focus on business logic and leave code coherence to the best-suited coding
              partner, the compiler.
            </p>
            <h4>Asynchronous architecture</h4>
            <p>
              Another place where we introduced strict patterns and types were asynchronous actions.
              Previously, a bit confusing combination of promises and action dispatching, where
              without reading code you were not sure how your code would get a successful or failure
              response delivered, was transferred into{' '}
              <a href="https://redux-observable.js.org/">redux-observable</a>, with strictly defined
              inputs and outputs. Redux-observable may not be for every team, so it can be easily
              transformed into <a href="https://redux-saga.js.org/">redux-sagas</a>, if you wish to
              do so.
            </p>
            <h4>Code review best practice</h4>
            <p>
              Code changes can only become part of the application if they are reviewed and
              accepted. So we have improved the review process as well. We made it easy to follow
              which merge requests are stuck, which need attention, and who is the person
              responsible for moving the process forward. These things are easily handled if you
              have a small team, but a bigger team, especially with often changing personnel, needs
              stricter rules to keep the forward pace. We've also managed to remove any code styling
              discussions out of the scope of the reviews altogether by handling it over to{' '}
              <a href="https://prettier.io/">prettier</a> and{' '}
              <a href="https://eslint.org/">eslint</a>.
            </p>
            <div className="mobileScreenshots">
              <GatsbyImage image={getImage(lokalportalAndroid)!} alt="Android screenshot" />
            </div>
            <h4>Improving testing setup</h4>
            <p>
              Having a setup where the compiler can save you a lot of time is one thing, but
              empowering the team to be able to focus on the most important things, like business
              logic, and not lose time on things which can be automated is another thing altogether.
              At the end of the review process, somebody has to test the app if everything works
              fine. In Lokalportal the team was responsible for doing that. We wanted to have as
              many automated tests as possible, so that every merge request can be approved swiftly.
            </p>
            <p>
              But the quality of the software doesn’t scale linearly with the number of tests and
              it’s really easy to slow down the development process by writing the wrong tests. We
              shared as much as possible of our knowledge based on years-long experience and
              certifications like ISTQB. We’ve also refactored pre-existing tests to make them more
              resilient and easier to understand, as well as separated unit tests from functional
              and integration ones, so the most important tests can be run as often and quickly as
              possible.
            </p>
            <h3>Results</h3>
            <p>
              It was an exciting year and a half of working together. We’ve managed to create a
              flexible and yet fail-proof architecture, which was put to test when more junior
              developers joined the team. Even a junior developer was able to understand,{' '}
              <strong className="highlight">
                be productive and independently work on new features in a matter of weeks.
              </strong>
            </p>
            <p>
              The improved agile process was{' '}
              <strong className="highlight">
                saving around 10-20 developer-hours every two-week sprint
              </strong>{' '}
              when the team was small and it would consistently save even more when the team grew.
            </p>
            <p>
              And as a cherry on top, by improving tests set up, we've{' '}
              <strong className="highlight">cut down detox running time by half</strong>, from ~40
              down to ~15 minutes. 🍒🎂
            </p>
            <p className="effect">
              Everyone has learned a lot from this project, and so have we&nbsp;💪 A&nbsp;mutual
              growth opportunity and partnership is what Brains&nbsp;&amp;&nbsp;Beards is all about
              🙇‍♂️
            </p>
          </div>
        </div>
        <TrustBar />
        <EstimateProjectBar title="Let us craft a custom solution<br/>for your product" />
      </Layout>
    )
  }
}

export const mobileScreenshots = graphql`
  fragment mobileScreenshots on File {
    childImageSharp {
      gatsbyImageData(layout: CONSTRAINED)
    }
  }
`

export const query = graphql`
  query lokalportalCaseStudyPageQuery {
    heroImage: file(relativePath: { regex: "/lokalportal-web/" }) {
      ...headingImageProps
    }
    lokalportalIos: file(relativePath: { regex: "/lokalportal-ios/" }) {
      ...mobileScreenshots
    }
    lokalportalAndroid: file(relativePath: { regex: "/lokalportal-android/" }) {
      ...mobileScreenshots
    }
    lokalportalLogo: file(relativePath: { regex: "/lokalportal-logo/" }) {
      ...testimonialImageFragment
    }
  }
`

export default LokalportalCaseStudy

const title = 'Case study: Lokalportal'
const description =
  'We joined the Lokalportal mobile team and helped them reshape local journalism in Germany.'

export const Head = ({ location }) => (
  <SEO title={title} description={description} pathname={location.pathname} />
)
