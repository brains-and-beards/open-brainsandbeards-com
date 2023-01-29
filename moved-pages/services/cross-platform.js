import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../../templates/layout'
import PictureListItem from '../../components/PictureListItem'
import TrustBar from '../../components/TrustBar'
import EstimateProjectBar from '../../components/EstimateProjectBar'
import CaseStudyBar from '../../components/CaseStudyBar'

const ReactNativeService = (props) => {
  const {
    heroImage,
    fasterImage,
    teamImage,
    reuseImage,
    codebaseImage,
  } = props.data

  return (
    <Layout
      headerTitle="Build your product faster using cross-platform tools"
      headerSub="We have already delivered successful React Native applications for our clients back in 2016. You can't beat experience."
      headerImage={heroImage.childImageSharp.fluid}
      headerColumns
      simpleNavbar
    >
      <div className="service-description">
        <div className="narrow-column">
          <h3>What does cross-platform mean?</h3>
          <p>
            This term is used a lot, so let's define what we're talking about.
            When we say cross-platform we talk about solutions that offer:
          </p>
          <h4>Native quality</h4>
          <p>
            Modern cross-platform solutions offer quality and polish that are
            indistinguishable from their native counterparts. We're not talking
            about "mobile web apps", "progressive websites", or "hybrid
            applications". Those are half-solutions of the past.
          </p>
          <p>
            We talk about modern frameworks like React Native and Flutter that
            allow an easy way to target multiple platforms while still
            maintaining the level of control that leads to apps with great user
            experience.
          </p>
          <h4>Mobile focus</h4>
          <p>
            We're not looking for the Holy Grail that will have you covered all
            across the web, mobile and virtual reality headsets.
          </p>
          <p>
            By cross-platform we mean a mobile-focused solution that will let
            you easily target the two most popular mobile platforms: iOS and
            Android.
          </p>
          <h3>Pros of modern cross platform solutions</h3>
          <ul className="picture-list">
            <PictureListItem
              image={fasterImage.childImageSharp.fixed}
              title="Faster development"
            >
              <p>
                The development experience when working with Flutter, or React
                Native is significantly better than using native tooling. From
                much faster compilation times and hot-reloading, to reactive
                approach to creating UI, both of those frameworks let us create
                beautiful applications faster than natively.
              </p>
            </PictureListItem>

            <PictureListItem
              image={reuseImage.childImageSharp.fixed}
              title="Code reuse"
            >
              <p>
                Cross-platform frameworks let us reuse more and more code
                between iOS and Android. Currently, for React Native
                applications it's common to see 90% of the code shared between
                the two platforms.
              </p>
            </PictureListItem>
            <PictureListItem
              image={teamImage.childImageSharp.fixed}
              title="Single team"
            >
              <p>
                Using a cross-platform framework lets us form a single team that
                works on both applications. This has numerous benefits: from
                consistency of the features available and user experience
                between the platforms, to solving each problem only once, not
                twice.
              </p>
            </PictureListItem>
            <PictureListItem
              image={codebaseImage.childImageSharp.fixed}
              title="Accessible codebase"
            >
              <p>
                According to recent surveys, 70% of developers nowadays are
                comfortable with JavaScript and React is the third most popular
                programming library.
              </p>
              <p>
                Of course, those two things are not enough to create a good
                mobile app, but they definitely let you contribute to one. Using
                React Native lets more developers in your organisation be
                included in the development process.
              </p>
            </PictureListItem>
          </ul>
          <p className="effect effect-big-margins">
            If you read between the lines, it basically boils down to one thing
            - lower costs.
          </p>
        </div>

        <TrustBar
          items={[
            { value: '3', label: 'years of experience<br/>with React Native' },
            { value: '8', label: 'cross-platform projects<br/>we worked on' },
            {
              value: '29',
              label: 'articles we wrote about<br/>cross-platform development',
            },
          ]}
        />
        <EstimateProjectBar title="Build your product faster<br/>with Brains & Beards" />
        <div className="content row">
          <div className="narrow-column">
            <h3 className="center">How about an example?</h3>
            <p className="caption center case-study-teaser">
              You can check a detailed case study how we worked with one of our
              clients on a React Native project.
            </p>
            <CaseStudyBar
              image={require('./../../assets/case-studies/clincase/epro-logo.jpg')}
              header="How we've recently helped a German company from the medical sector"
              url="/projects/clincase/"
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

export const _headerHeroImage = graphql`
  fragment headerHeroImage on File {
    childImageSharp {
      fluid(maxWidth: 504, traceSVG: { color: "#333" }) {
        ...GatsbyImageSharpFluid_tracedSVG
      }
    }
  }
`

export const query = graphql`
  query ServiceCrossPlatformPage {
    heroImage: file(relativePath: { regex: "/services-cross-platform-hero/" }) {
      ...headerHeroImage
    }
    fasterImage: file(
      relativePath: { regex: "/services-cross-platform-faster/" }
    ) {
      ...illustrationIconImageProps
    }
    reuseImage: file(
      relativePath: { regex: "/services-cross-platform-reuse/" }
    ) {
      ...illustrationIconImageProps
    }
    teamImage: file(relativePath: { regex: "/services-cross-platform-team/" }) {
      ...illustrationIconImageProps
    }
    codebaseImage: file(
      relativePath: { regex: "/services-cross-platform-codebase/" }
    ) {
      ...illustrationIconImageProps
    }
  }
`

export default ReactNativeService
