import React, { Component } from 'react'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'

import Layout from '../../templates/layout'
import EstimateProjectBar from '../../components/EstimateProjectBar'
import TrustBar from '../../components/TrustBar'
import Testimonial from '../../components/Testimonial'

class SharooCaseStudy extends Component {
  render = () => {
    const { heroImage, sharooIOS, sharooAndroid, sharooAward } = this.props.data

    return (
      <Layout
        headerTitle="Case study: sharoo"
        headerSub="We've implemented native iOS and Android applications for sharoo and helped them conquering carsharing economy in Switzerland."
        simpleNavbar
      >
        <div id="case-study">
          <div className="big-part-yellow">
            <Img
              fluid={heroImage.childImageSharp.fluid}
              className="heading-pic"
              alt="Sharoo ad"
            />
          </div>

          <div className="narrow-column text-format">
            <p>
              Zurich based sharoo AG has a great mission to create flexible
              carsharing and a new mobility model. sharoo allows both companies
              and individuals to share their cars, which reduces the fix costs
              for the vehicle owner and gives a real, environmentally friendly
              alternative to owning a vehicle to the renters.
            </p>
            <h3>Challenges</h3>
            <p>
              Such a service can only succeed if it feels natural and seamless
              to the users. The renter should be able to rent and open the car
              without any contact with the owner. For that to happen, a vehicle
              needs to be equipped with a special sharoo box, and the rest of
              the magic is in the mobile app. This app should securely
              communicate with the box and unlock the car without a need for a
              physical key. And this where our help was required.
            </p>
            <p>
              We were contacted by sharoo in February 2016 to develop the mobile
              application from scratch. The application should run on iOS and
              Android, deliver great and seamless UX for the users, and be
              secure for the car owners and renters alike. We've done that, and
              then we stayed
              <strong className="highlight">
                working together with the sharoo team for four years
              </strong>
              , until the company got fully integrated into their main
              shareholder, AMAG. You will find below a few stories from this
              journey.
            </p>
          </div>

          <Testimonial
            quote="“We started working with Brains & Beards back in 2016 and have been a customer ever since. 
            They are a reliable partner to work with and have helped us bring many solutions to life both on desktop and mobile. 
            Their expertise and experience shows in many different facets such as project planning, 
            suggesting solutions and efficient problem solving. We can recommend Brains & Beards 
            to companies that need skilled developers who are not scared of technical challenges.”"
            photo={require('../../assets/testimonials/sharoo-feyyaz.jpg')}
            name="Feyyaz Alingan"
            position="Head of Product & Development"
            company="sharoo AG"
          />

          <div className="narrow-column text-format">
            <h3>Process</h3>
            <p>
              We have been working for most of the time as three developers
              strong team, building both the iOS and Android applications. We
              were building something new, a greenfield app, a unique experience
              for the sharing economy. Back in the day, there were not many
              established best practices in the world for this kind of
              application, so everything had to be done in a very flexible and
              agile way. We had to observe users, and learn from them how to
              improve the app. To achieve this we worked closely with the
              designers and product owners, running weekly scrum sprints.
            </p>
            <h4 className="">Solid architecture as app foundation</h4>
            <p>
              As we described in{' '}
              <a href="https://brainsandbeards.com/projects/lokalportal">
                Lokalportal Case Study
              </a>
              , we believe that if your app has to change often to rapidly
              evolving requirements, you will need a robust architecture. You
              need to delegate as much work as possible to the computer, so you
              can focus on implementing the business logic. Both apps were
              developed in their native languages and frameworks, Swift for iOS
              and Kotlin for Android app. We used{' '}
              <a
                href="https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93viewmodel"
                target="_blank"
              >
                MVVM
              </a>
              , declarative programming and{' '}
              <a href="http://reactivex.io/" target="_blank">
                Rx
              </a>{' '}
              to help us keep the project clean and improve state management of
              the controllers.
            </p>
            <p>
              Combination of MVVM and Rx gives a unique opportunity to separate
              UI from the business logic. UI is usually much more challenging
              (and much slower!) to test via automated tests, so you want to
              have the most important logic contained in easily testable Models
              and ViewModels. Rx allows us to reduce and control the typical
              callback infestations as now we can drive the UI using sleek
              observables. Additionally, it helps in keeping data immutability
              inside the app. All that significantly reduces the number of
              potential bugs in the code, which of course saves our client's
              time and money.
            </p>
            <div>
              <Img
                fluid={sharooIOS.childImageSharp.fluid}
                title="sharoo iOS app is rated 4.6 stars"
                alt="Sharoo rankings"
              />
              <figcaption>sharoo iOS app is rated 4.6 stars</figcaption>
            </div>
            {/* <div className="mobileScreenshots">
              <Img fluid={lokalportalIos.childImageSharp.fluid} />
            </div> */}
            <h4>Designed with offline capabilities in mind</h4>
            <p>
              Cars waiting for renters can be parked anywhere, so odds are some
              parking spots don't have great network coverage. Limited
              connectivity in underground parking lots in particular poses a
              challenge for the mobile application. That's why the app was built
              with offline use in mind. There are various aspects of offline
              friendly apps, like data request queueing, or optimistic UI, just
              to mention a couple of them.
            </p>
            <p>
              Without going into too much detail, we wanted to share our
              solution for local data availability in poor / no network
              connection scenarios. The conventional way of storing data is
              using Core Data for iOS, and on Android, you would probably choose
              Room as an abstraction for SQLite. However, we've decided to go
              with Realm DB as our solution for storing data and it worked
              perfectly. It not only tremendously reduces the amount of the
              boilerplate you have to write for your models, but also makes
              possible that both platforms use the same DB schemes. That means
              it's much easier to compare the implementations and do DB
              migrations in the same way. Another advantage is the easiness of
              refreshing views with new data, driven by{' '}
              <a
                href="https://github.com/RxSwiftCommunity/RxRealm"
                target="_blank"
              >
                RxRealm.
              </a>
            </p>
            <div>
              <Img
                fluid={sharooAndroid.childImageSharp.fluid}
                title="sharoo Android app is rated 4.1 stars"
                alt="Sharoo ranking - android"
              />
              <figcaption>sharoo Android app is rated 4.1 stars</figcaption>
            </div>
            <h4>Security as the key component</h4>
            <p>
              When you are managing a big fleet of expensive vehicles, security
              can't be an afterthought. Also, we are working 99% remotely, but
              the sharoo project has a substantial amount of hardware components
              which the mobile app has to communicate with. However, this was
              not a show stopper at all. We've simply received a developer kit
              sharoo box so we could use it to implement a secure communication
              protocol. The whole implementation was evaluated as safe by an
              independent security audit. The communication between the app and
              car hardware was implemented with a deep dive into Bluetooth
              framework stack and low-level package programming. We are talking
              here about good, old-fashioned bit operations.
            </p>
            <h4>Debugging remote hardware</h4>
            <p>
              Even if we had sharoo box sitting next to our computers, sometimes
              there was still a need to debug application inside sharoo offices
              where it could be tested with actual cars. For these particular
              cases, we used{' '}
              <a
                href="https://github.com/SwiftyBeaver/SwiftyBeaver"
                target="_blank"
              >
                SwiftyBeaver
              </a>
              . This allowed us to "see" in real-time the interaction between
              the mobile app, sharoo box, and the car. It's great to have an
              experienced pair of eyes which can tell an engineer what is
              happening with the app, the vehicle, how far away is the mobile to
              the box, etc. But those eyes can only see the surface. If the
              engineer has to move fast and solve an issue quickly, they have to
              "see" how the code works. The standard way of gathering the logs
              on the device, downloading them to the computer and sending over
              the internet is just too cumbersome and too slow. SwiftyBeaver
              gives you the ability to see the logs in real time, as fast as
              they are generated. This way, a mobile engineer can provide
              instant feedback to the testing person, like "move closer to the
              car", etc. This is a massive quality of life improvement for
              everyone involved. It's like sending a chat message instead of
              posting a letter.
            </p>
            <div>
              <Img
                fluid={sharooAward.childImageSharp.fluid}
                title="sharoo European P2P Carsharing Price/Performance Value
                Leadership Award from Frost & Sullivan"
                alt="award"
              />
              <figcaption>
                sharoo European P2P Carsharing Price/Performance Value
                Leadership Award from Frost & Sullivan
              </figcaption>
            </div>
            <h3>Results</h3>
            <p>
              We were delighted with the results of the collaboration with
              sharoo. And turns out so were the users. The&nbsp;
              <strong className="highlight">
                app was rated 4,6 stars in the iOS AppStore, and 4,1 on the
                Android PlayStore
              </strong>
              . We are really proud of those numbers.
            </p>
            <p>
              But not only the users praised the product. Business analysts were
              pleased as well. Deloitte in the{' '}
              <a
                href="https://www2.deloitte.com/content/dam/Deloitte/ch/Documents/consumer-business/ch-de-cb-sharing-economy-teile-und-verdiene.pdf"
                target="_blank"
              >
                Sharing Economy report
              </a>
              &nbsp;named sharoo a{' '}
              <strong className="highlight">
                pioneer in software development in the area of car sharing
              </strong>
              .
            </p>
            <p>
              In 2016 sharoo received a European P2P Carsharing
              Price/Performance Value Leadership Award from Frost & Sullivan.
            </p>
            <p className="effect">
              Everyone has learned a lot from this project, and so have
              we&nbsp;💪 A&nbsp;mutual growth opportunity and partnership is
              what Brains&nbsp;&amp;&nbsp;Beards is all about 🙇‍♂️
            </p>
          </div>
        </div>
        <TrustBar />
        <EstimateProjectBar
          title="Let us craft a custom solution<br/>for your product"
          buttonText="Estimate project"
        />
      </Layout>
    )
  }
}

export const query = graphql`
  query sharooCaseStudyPageQuery {
    heroImage: file(relativePath: { regex: "/sharoo-hero/" }) {
      ...headingImageProps
    }
    sharooIOS: file(relativePath: { regex: "/sharoo-ios/" }) {
      ...embeddedImageProps
    }
    sharooAndroid: file(relativePath: { regex: "/sharoo-android/" }) {
      ...embeddedImageProps
    }
    sharooAward: file(relativePath: { regex: "/sharoo-award/" }) {
      ...embeddedImageProps
    }
  }
`

export default SharooCaseStudy
