import React from 'react'
import { graphql, Link } from 'gatsby'
import { getImage } from 'gatsby-plugin-image'

import Layout from '../../templates/layout'
import TonedDownEstimateProject from '../../components/TonedDownEstimateProject'
import CaseStudyBar from '../../components/CaseStudyBar'
import PictureListItem from '../../components/PictureListItem'

const NativeDevService = (props) => {
  const {
    heroImage,
    experienceImage,
    mobileFocusImage,
    reliabilityImage,
  } = props.data

  return (
    <Layout
      headerTitle="Get the mobile app that your business deserves"
      headerSub="Native development is the gold standard of quality for mobile applications. And we are all about quality."
      headerImage={getImage(heroImage)}
      headerColumns
      simpleNavbar
    >
      <div className="service-description">
        <div className="content narrow-column">
          <h3>
            Why choose us to deliver
            <br />
            your next project?
          </h3>
          <ul className="picture-list">
            <PictureListItem
              image={getImage(mobileFocusImage)}
              title="Focus on mobile"
            >
              <p>
                When you have simple car trouble, like changing a light bulb or
                oil, you might be happy going to any car mechanic. However, for
                anything more sophisticated than that, you'll need a specialist
                for your type or brand of the car. It's similar with software.
              </p>
              <p>
                Our advantage is that we're all specialists that have been
                focused on creating great mobile apps for years. It gives our
                experience the depth that "full-stack developers" usually lack.
              </p>
            </PictureListItem>

            <PictureListItem
              image={getImage(experienceImage)}
              title="Experience"
            >
              <p>
                One of the benefits of running a small company is the freedom to
                work only with the best people. Choosing not to grow like crazy
                lets us keep the hiring bar high.
              </p>
              <p>
                On average, we have more than eight years of experience in our
                team. That's something unheard of in all bigger agencies, which
                have to hire a lot of fresh graduates to keep up with their
                growth.
              </p>
            </PictureListItem>

            <PictureListItem
              image={getImage(reliabilityImage)}
              title="Reliability"
            >
              <p>
                We have delivered multiple projects before and with every single
                one of them we tune our processes and work even better together.
              </p>
              <p>
                Hiring our team you not only get our singular skills and
                experience, but also a shared history of successfully delivering
                projects and all the knowledge, workflows and processes that
                came out of that.
              </p>
            </PictureListItem>
          </ul>

          <h3>Should my mobile app go native?</h3>
          <p>
            Nowadays, there's plenty of cross-platform solutions that promise
            you can write an application with no effort, in barely no time, and
            basically for free. Of course, such promises are never true.
            Building a quality application that is a joy to use takes time,
            thought, experience and A LOT of effort, no matter the technology
            used. The old adage: you get what you pay for, is still true.
          </p>
          <p>
            So, with all those different options available - should I still
            build my app as a native one? There's a simple answer: it depends.
            If your app fits one of the below criteria, then probably going
            native is the right choice:
          </p>
          <ul>
            <li>
              <strong>UX is the single most important factor</strong>.
              Applications written using native technologies are still the
              gold-standard of quality in mobile apps. No other technology will
              give you the amount of control and possibilites that native code
              will.
            </li>
            <li>
              <strong>
                Application performance on low-end devices is critical
              </strong>
              . With native code it's easier to eliminate any unnecessary
              overhead, keep application size small and maintain low-level
              control of its behaviour.
            </li>
            <li>
              <strong>Application performs multiple background tasks</strong>.
              Those need to be run as native code anyway, so if they form a big
              part of your application it might make sense to build the whole
              project this way.
            </li>
            <li>
              <strong>Using newest available features on the platform</strong>.
              It usually takes time to see those available (reliably) in
              cross-platform solutions.
            </li>
          </ul>

          <p>
            If not, it might be a better choice to go with{' '}
            <Link to="/services/cross-platform">React Native</Link> instead.
          </p>
        </div>

        <TonedDownEstimateProject
          title="Contact us to find<br/>the best solution for your case"
          buttonText="Tell us about your project"
        />
        <div className="content row">
          <div className="narrow-column">
            <p className="set-out">
              Programming is often an art of balancing the tradeoffs and all
              solutions have their own advantages. That's why it's best to be
              guided by an expert.
            </p>
            <h3 className="center">How about an example?</h3>
            <p className="caption center case-study-teaser">
              You can check a detailed case study of a native mobile project
              that we delivered in a small team for a huge Japanese client.
            </p>
            <CaseStudyBar
              image={require('../../assets/case-studies/rakuten-team.jpg')}
              header="Timely delivery of a premium shopping app for a market leading enterprise"
              url="/projects/rakuten/"
              full
              small
              flip
              top
              pageType="services"
            />
          </div>
        </div>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query ServiceNativePage {
    heroImage: file(relativePath: { regex: "/services-native-hero/" }) {
      ...headerHeroImageFragment
    }
    mobileFocusImage: file(
      relativePath: { regex: "/services-native-mobile-focus/" }
    ) {
      ...illustrationIconImageFragment
    }
    experienceImage: file(
      relativePath: { regex: "/services-native-experience/" }
    ) {
      ...illustrationIconImageFragment
    }
    reliabilityImage: file(
      relativePath: { regex: "/services-native-reliability/" }
    ) {
      ...illustrationIconImageFragment
    }
  }
`

export default NativeDevService
