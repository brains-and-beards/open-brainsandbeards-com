import React, { Component } from "react";
import { graphql } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

import Layout from "../../templates/layout";
import EstimateProjectBar from "../../components/shared/Bars/EstimateProjectBar";
import TrustBar from "../../components/shared/Bars/TrustBar";
import SEO from "../../components/shared/layout/SEO";

class ClincaseCaseStudy extends Component {
  render = () => {
    const { heroImage, signInError, tutorialBack } = this.props.data;

    return (
      <Layout
        headerTitle="Case study: ePRO"
        headerSub="We helped a long-standing business in the health tech industry to expand their offering to a new market - mobile."
        simpleNavbar
        projects
      >
        <div id="case-study">
          <div className="big-part-yellow">
            <GatsbyImage
              image={getImage(heroImage)!}
              alt="ePRO logo"
              className="heading-pic"
            />
          </div>

          <div className="narrow-column">
            <div className="text-format">
              <p className="effect">
                We were contacted by Clincase to work on a new kind of project
                for them - we were to build a mobile application that would
                expand their business to a new market.
              </p>

              <h3>Challenge</h3>
              <p>
                Clincase is a long-standing company that has been handling
                medical data for their customers already for fifteen years.
                Until now, they've been mostly focused on their EDC (electronic
                data capture) software. However, they've noticed the trend to
                offer more patient-oriented approach to data from clinical
                studies and decided to expand their client offering by giving
                them a complex system that would take care of the whole process:
                from gathering data from subjects during a clinical trial,
                through data validation up to storing it in the EDC software for
                easy access later on.
              </p>
              <p>
                However, that meant a completely new set of technical
                challenges: they needed to provide both devices and software for
                the subjects to use during their 2-year trials. As this was a
                new platform for them and there is a lot of strict requirements
                over the software quality and reliability they needed someone
                with the right experience to help. That's where we came in.
              </p>

              <GatsbyImage
                image={getImage(signInError)!}
                alt="ePRO screenshot"
                className="screenshot"
              />

              <p>
                There were various requirements in this project that made it
                particularly challenging:
              </p>
              <ul>
                <li>
                  To satisfy the strict data correctness requirements, the
                  subjects needed to be able to enter data wherever they are -
                  even when offline. That means we needed to build an
                  offline-first solution with client-side data validation,
                  submission queues and graceful handling of any connectivity
                  problems.
                </li>
                <li>
                  Of course, medical data is highly sensitive and its storage is
                  covered by strict regulations. That means we needed to make
                  sure it's encrypted at all times and protected from any
                  unauthorized access.
                </li>
                <li>
                  There was a series of requirementes that related not only to
                  the app that we were about to build, but also to the device
                  itself. For example, it needed to be locked down to only allow
                  this particular app to be used by the subject.
                </li>
                <li>
                  Reliability is paramount, the release process for medical
                  software is complicated and we can't really "push a quick
                  fix". On top of that, any mistakes connected with data entry
                  or storage could invalidate the whole medical study, so the
                  price to pay for bugs was extremely high.
                </li>
                <li>
                  Lastly, the solution needed to give a smooth user experience
                  even in the tightly resource-constrained environment of a
                  low-end Android device that it was run on.
                </li>
              </ul>

              <GatsbyImage
                image={getImage(tutorialBack)!}
                alt="ePRO screenshot"
                className="screenshot"
              />

              <h3>Process</h3>
              <p>
                We built the application as a React Native Android application,
                running inside a MDM solution that provided kiosk-mode
                functionality. It was tricky to get a smooth navigation
                experience with the low-end device that was to be used for the
                trials, but we managed to get satisfying application
                performance.
              </p>
              <h4>Offline processing</h4>
              <p>
                The offline requirement was another difficult one to handle, but
                with clever use of cryptography we managed to offer even a
                completely offline identity verification, which along with data
                encryption and implementing a request queue for data entry
                allowed the application to work completely offline.
              </p>
              <h4>Updating kiosk software</h4>
              <p>
                Another aspect that usually proves to be difficult for
                kiosk-mode applications is updates. We can't rely on the user to
                perform any update actions, nor can the device be regularly
                accessed by maintenance staff. Fortunately, basing the
                application on React Native helped us in that case, allowing us
                to use Code Push to provide smooth update experience with
                version reporting and verification.
              </p>
              <h4>Reliability</h4>
              <p>
                We followed all the industry best practices to ensure software
                correctness. We used TypeScript throughout the whole application
                to get compiler checks, not a single line of code could be added
                without a detailed code review, we wrote automatic tests and
                performed rigorous manual testing (both by the development team
                themselves, as well as outside testers).
              </p>
              <p>However, our service wasn't limited only to writing code.</p>
              <p className="effect">
                We worked closely with Clincase on every step of the way: from
                advising on the design, through choices of hardware and software
                to use, up till the final stages when we were assisting during
                the training calls with medical staff that will be overseeing
                the studies.
              </p>

              <h3>Results</h3>
              <p>
                The application is currently used in a 2-year long clinical
                trial that spans five countries and hundreds of subjects. Also,
                we're adjusting the application to become more configurable and
                able to easily handle different types of studies in more of a
                SaaS style.
              </p>
              <p className="effect">
                Throughout the project Clincase gathered a lot of experience
                connected with launching a new type of service and handling new
                types of technical challenges.
              </p>
            </div>
          </div>
        </div>
        <TrustBar />
        <EstimateProjectBar
          title="Let us craft a custom solution<br/>for your product"
          buttonText="Estimate project"
        />
      </Layout>
    );
  };
}

export const query = graphql`
  query clincaseCaseStudyPageQuery {
    heroImage: file(relativePath: { regex: "/clincase-warning-modal/" }) {
      ...headingImageProps
    }
    signInError: file(relativePath: { regex: "/clincase-sign-in-error/" }) {
      ...embeddedImageProps
    }
    tutorialBack: file(relativePath: { regex: "/clincase-tutorial-back/" }) {
      ...embeddedImageProps
    }
  }
`;

export default ClincaseCaseStudy;

const title = "Case study: Clincase ePRO";
const description =
  "We helped a long-standing business in the health tech industry to expand their offering to a new market - mobile.";

export const Head = ({ location }) => (
  <SEO title={title} description={description} pathname={location.pathname} />
);
