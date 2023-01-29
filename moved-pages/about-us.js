import React, { Component } from 'react'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'

import Layout from '../templates/layout'
import PictureListItem from '../components/PictureListItem'
import PortfolioForm from '../components/forms/PortfolioForm'

class About extends Component {
  render() {
    const {
      heroImage,
      teamIcon,
      workflowIcon,
      brainsIcon,
      beardsIcon,
      handsIcon,
    } = this.props.data

    return (
      <Layout
        headerTitle="Our story"
        headerSub="Read on to learn what drives us and what's the vision behind our company."
      >
        <div className="content-page">
          <div className="big-part-yellow">
            <Img
              className="our-story-header"
              fluid={heroImage.childImageSharp.fluid}
              alt="Wojciech and Patryk with motorbikes"
            />
          </div>

          <div className="narrow-column">
            <div className="text-format">
              <h3 className="center"> Why did we start Brains & Beards? </h3>
              <p>
                The company was started by two developers: Patryk and Wojtek.
                They've met years ago working for a big German professional
                networking site. As it happens pretty often, at some point in
                our careers they grew tired by the restraints of working in
                structured organisations and decided to become more independent.
                After some conversations they've decided they share a lot of
                ideas and principles, so they teamed up and started Brains &
                Beards together.
              </p>
              <p>
                One of those ideas was that we want to help others build better
                digital products faster. Over the years of working with
                different organisations on different products, we saw a lot of
                different teams and gather plenty of experience what works well.
                We want to share this knowledge by helping our clients not only
                by delivering great software, but also showing how effective a
                good team can be.
              </p>
              <section>
                <p className="quote center narrow">
                  That's why Brains & Beards is a consultancy.
                  <br /> It lets us focus on constant improvement in the two
                  most important areas.
                </p>
              </section>
              <ul className="picture-list">
                <PictureListItem
                  image={teamIcon.childImageSharp.fixed}
                  title="Building a great team"
                >
                  Our employees are our greatest asset, so we do our best to
                  help them become even better versions of themselves. We treat
                  everybody individually, because every person brings their own
                  perspective and you can never see the full picture without
                  many points of view.
                </PictureListItem>
                <PictureListItem
                  image={workflowIcon.childImageSharp.fixed}
                  title="Finding the best workflow"
                >
                  As there are no silver bullets, similarly there are no perfect
                  workflows. Instead, every team figures out their own way of
                  working and that's what we're trying to do - find the best
                  possible way that works for us. We document our processes,
                  standardise common tasks, and define our own way of working.
                  That gives us a possibility of iterative improvement of our
                  ways."
                </PictureListItem>
              </ul>
              <p>
                We understand that when building a product it's difficult to
                decide on tradeoffs between time spent on improving your product
                and time spent improving your development speed, or smoothing
                the processes. That's why we want to come and help you with an
                experienced team that already works great together. This way we
                can focus 100% on improving your business.
              </p>
              <section>
                <h3 className="center small-margin"> Why remote? </h3>
                <p className="quote inset center">
                  Because remote work is the future
                  <br />
                  and we like living in the future 🚀
                </p>
                <p>
                  Of course, living in the future is not all unicorns and
                  rainbows and it's often painful. It's like getting an electric
                  car, or a laptop with only USB-C ports. It takes some getting
                  used to and the transition is often annoying, but once you get
                  past the initial pains, you can feel all the benefits.
                </p>
                <p>
                  For people who work remotely the benefits are clear: avoiding
                  the commute to the office leads to lower stress levels, being
                  able to cook your own meal at home and go to the gym (when
                  it's not completely full!) improves overall health, and being
                  able to setup our own perfect work environment allows for
                  maximum productivity. It also allows us as parents to fully
                  enjoy the time with young kids, observing as they grow and
                  learn.
                </p>
                <p>
                  Of course, like everything else in software development, it's
                  a tradeoff. Pair-programming is more difficult, meetings are
                  harder to organise, and you can't just drop by somebody's desk
                  for a quick question. But all of those are just growing pains,
                  they can all be tackled. Remote teams work in asynchronous
                  manner and that means you need to put extra effort to remove
                  any potential roadblocks before they occur and keep clear
                  communication on what we're trying to achieve. As a side
                  effect, this usually results in work that goes smoother and
                  much fewer surprises.
                </p>
                <p>
                  Last thing that makes us excited about the remote work is that
                  it makes it much easier to do <i>deep work</i>. A lot of
                  times, teams which are co-located in an office aren't really
                  more productive, they just <i>seem</i> more productive,
                  because it's much easier to be engaged in so-called{' '}
                  <i>shallow work</i> (discussing unimportant details, having
                  meetings, etc.). However, to deliver milestones that actually
                  push the project forward you need deep work: uninterrupted
                  periods of time when you can focus on a single (hard!) problem
                  and get it solved.
                </p>
              </section>
            </div>
          </div>

          <PortfolioForm />

          <div className="narrow-column">
            <div className="text-format">
              <h3>PS. Where does the name come from?</h3>
              <p className="sub2 center">
                When organisations decide to outsource a project (or parts of
                it), they're usually looking for one of three things:
              </p>
              <section className="center">
                <div className="row">
                  <div className="serviceContainer">
                    <Img
                      className="image-wrapper"
                      fluid={brainsIcon.childImageSharp.fixed}
                      alt="Brains"
                    />
                    <p className="sub1">Brains</p>
                    <p>
                      This means trying to find a creative solution from outside
                      of their own culture. For us, it stands for creativity,
                      innovation, and problem-solving.
                    </p>
                  </div>
                  <div className="serviceContainer">
                    <Img
                      className="image-wrapper"
                      fluid={beardsIcon.childImageSharp.fixed}
                      alt="Beards"
                    />
                    <p className="sub1">Beards</p>
                    <p>
                      A symbol of experience and wisdom. Like Gandalf, or a
                      Shaolin <i>sensei</i> with their stereotypical grey
                      beards, we want to share the knowledge we gained working
                      on many different projects to help deliver the best
                      solution to client's needs.
                    </p>
                  </div>
                  <div className="serviceContainer">
                    <Img
                      className="image-wrapper"
                      fluid={handsIcon.childImageSharp.fixed}
                      alt="Hands"
                    />
                    <p className="sub1">Hands</p>
                    <p>
                      This means that an organisation knows what they're doing,
                      knows how to build it, they just need some extra hands to
                      assemble the parts.
                    </p>
                  </div>
                </div>
                <p className="text-left">
                  We pride ourselves on our intellectual curiosity, so only the
                  first two categories are interesting for us. When you look at
                  Apple's products you'll always find
                  <em> Designed in California. Assembled in China. </em>
                  written somewhere on the back. Apple doesn't consider their
                  products as
                  <em> made in China </em>, because it's only where the hands
                  are. But it's where the brains and the beards are, that
                  matters.
                </p>
                <p className="text-left">
                  That's how Brains & Beards got its name.
                </p>
              </section>
            </div>
          </div>
        </div>
      </Layout>
    )
  }
}

export const query = graphql`
  query aboutPageQuery {
    heroImage: file(relativePath: { regex: "/patryk-and-wojtek/" }) {
      ...headingImageProps
    }
    teamIcon: file(relativePath: { regex: "/about-team-icon/" }) {
      ...illustrationIconImageProps
    }
    workflowIcon: file(relativePath: { regex: "/about-workflow-icon/" }) {
      ...illustrationIconImageProps
    }
    brainsIcon: file(relativePath: { regex: "/about-brains-icon/" }) {
      ...illustrationIconImageProps
    }
    beardsIcon: file(relativePath: { regex: "/about-beards-icon/" }) {
      ...illustrationIconImageProps
    }
    handsIcon: file(relativePath: { regex: "/about-hands-icon/" }) {
      ...illustrationIconImageProps
    }
  }
`

export default About
