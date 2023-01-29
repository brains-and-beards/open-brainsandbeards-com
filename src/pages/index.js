import React, { useMemo } from 'react'
import { graphql, Link } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image';

import ContactForm from '../components/forms/ContactForm'
import Layout from '../templates/layout'
import TrustBar from '../components/TrustBar'
import EstimateProjectBar from '../components/EstimateProjectBar'
// import ClientLogos from '../components/ClientLogos'
// import CaseStudyBar from '../components/CaseStudyBar'
import ReferenceSwiper from '../components/ReferenceSwiper'
import ReadMore from '../components/ReadMore'

import RotatingBadge from '../assets/illustrations/also-in.svg';
import RNBadge from '../assets/illustrations/rn.svg';

const title = (
  <h1 className="text-center-mobile">We deliver great mobile applications</h1>
)

const RNSticker = () => (
  <div className="badge-container">
    <RotatingBadge className="rotating badge" />
    <RNBadge className="badge" />
  </div>
)

const useRandomHeroImage = () => {
  const heroImage = useMemo(() => {
    const heroImages = ['heroBicycle', 'heroJogin', 'heroSkateboard']
    const index = Math.floor(Math.random() * heroImages.length)
    return heroImages[index]
  }, [])

  return heroImage
}

const MainPage = (props) => {
  const { data } = props
  const {
    serviceIconCrossPlatform,
    serviceIconNative,
    serviceIconStaff,
  } = data

  const heroImage = useRandomHeroImage();

  const subtitle = (image) => (
    <>
      {!!image && (
        <GatsbyImage
          className={'mobile-only hero-image'}
          image={getImage(image)}
          alt="Mobile phone user"
        />
      )}
      <p className="about-us">
        Brains & Beards is an unpretentious mobile studio that solves business
        problems through a mix of design and technology.
      </p>
      <p className="about-us">
        We are a remote team of experienced developers spread all over Europe
        who know how to get a great product shipped.
      </p>
    </>
  )

  const rightHeader = (image) => {
    return (
      <>
        {<RNSticker />}
        {!!image && (
          <GatsbyImage
            className={`hero-image ${heroImage}`}
            image={getImage(image)}
            alt="Mobile phone user"
            objectFit="contain"
          />
        )}
      </>
    )
  }

  return (
    <Layout
      headerTitle={title}
      headerSub={subtitle(data[heroImage])}
      headerColumns="skewed"
      rightContent={rightHeader(data[heroImage])}
    >
      <div className="half-yellow mobile-only">{<RNSticker />}</div>

      <section className="center homepage-services">
        <h2> What can we help you with? </h2>
        <p> Pick a category to learn more: </p>
        <div className="row">
          <div className="serviceContainer">
            <Link to="/services/cross-platform">
              <GatsbyImage
                image={getImage(serviceIconCrossPlatform)}
                alt="Cross platform"
              />
              <p className="quote">Cross-platform</p>
              <p className="service-info">
                Mobile apps in React Native and Flutter focused on fast
                delivery
              </p>
              <ReadMore text="Read more" />
            </Link>
          </div>
          <div className="serviceContainer">
            <Link to="/services/native-development">
              <GatsbyImage
                image={getImage(serviceIconNative)}
                alt="Native mobile development"
              />
              <p className="quote">iOS and Android</p>
              <p className="service-info">
                State-of-the-art applications built using native frameworks
                from Apple and Google
              </p>
              <ReadMore text="Read more" />
            </Link>
          </div>
          <div className="serviceContainer">
            <Link to="/services/team-augmentation/">
              <GatsbyImage
                image={getImage(serviceIconStaff)}
                alt="Staff augmentation"
              />
              <p className="quote">Staff Augmentation</p>
              <p className="service-info">
                Additional developers for your existing team to help
                dynamically scale your efforts
              </p>
              <ReadMore text="Read more" />
            </Link>
          </div>
        </div>
      </section>
      <TrustBar />
      <EstimateProjectBar title="Build your product <br/>with Brains & Beards" />
      <section className="clients">
      <div className="content">
          {/*   <h2> Our clients </h2>
          <p className="sub2">
            We help technology-driven organizations – from start-ups to large
            enterprises – develop software more efficiently.
          </p>
          <CaseStudyBar
            image={require('../assets/case-studies/sharoo/sharoo-hero.jpg')}
            logo={require('../assets/case-studies/sharoo/sharoo-logo.png')}
            header="We helped sharoo team conquering carsharing economy in Switzerland"
            desc="How we implemented unique mobile applications supporting renting and interacting with rented vehicles."
            url="/projects/sharoo"
            pageType="home"
          />

          <ClientLogos short /> */}
          <ReferenceSwiper />
        </div>
      </section>
      <ContactForm />
      </Layout>
  )
}


export const _homepageHeroImageProps = graphql`
  fragment homepageHeroImageProps on File {
    childImageSharp {
      gatsbyImageData(
        height: 710
        width: 819
        quality: 90
      )
    }
  }
`

export const _imageProps = graphql`
  fragment illustrationIconImageProps on File {
    childImageSharp {
      gatsbyImageData(
        layout: FIXED
        height: 192
        quality: 90
        placeholder: BLURRED
      )
    }
  }
`

export const query = graphql`
  query {
    heroBicycle: file(relativePath: { regex: "/hero-bicycle/" }) {
      ...homepageHeroImageProps
    }
    heroSkateboard: file(relativePath: { regex: "/hero-skateboard/" }) {
      ...homepageHeroImageProps
    }
    heroJogin: file(relativePath: { regex: "/hero-jogin/" }) {
      ...homepageHeroImageProps
    }
    serviceIconCrossPlatform: file(
      relativePath: { regex: "/services-cross-platform-icon/" }
    ) {
      ...illustrationIconImageProps
    }
    serviceIconNative: file(relativePath: { regex: "/services-native-icon/" }) {
      ...illustrationIconImageProps
    }
    serviceIconStaff: file(relativePath: { regex: "/services-staff-icon/" }) {
      ...illustrationIconImageProps
    }
  }
`

export default MainPage
