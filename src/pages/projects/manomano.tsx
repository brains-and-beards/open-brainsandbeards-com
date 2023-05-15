import { graphql } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import React, { Component } from 'react'

import Testimonial from '../../components/CaseStudies/Testimonial'
import EstimateProjectBar from '../../components/shared/Bars/EstimateProjectBar'
import SEO from '../../components/shared/layout/SEO'
import Layout from '../../templates/layout'
import TrustBar from '../../components/shared/Bars/TrustBar'

const title = 'Case study: ManoMano'
const description =
  'Turning a quick prototype into a fully-fledged ecommerce app for several European markets.'

class ManoManoCaseStudy extends Component {
  render = () => {
    const { storeB2cImage, storeB2bImage, eliasImage, gregoireImage, linaImage } = this.props.data

    return (
      <Layout headerTitle={title} headerSub={description} simpleNavbar projects>
        <div id="case-study">
          <div className="big-part-yellow">
            <GatsbyImage
              image={getImage(storeB2cImage)!}
              alt="ManoMano screens"
              className="heading-pic"
            />
          </div>

          <div className="narrow-column text-format">
            <p>
              <a href="https://www.manomano.fr/" target="_blank" rel="noreferrer">
                ManoMano
              </a>{' '}
              is a startup valuated at $2.6 billion on their latest funding round in 2021. They are
              the largest marketplace for products and services in the DIY, gardening and Home
              Improvement sector in Europe.
            </p>
            <p>
              While originally French, ManoMano expanded beyond their home country's borders into
              Belgium (2014), Spain and Italy (2015), and then Germany and the UK (2016). In 2019
              they launched a B2B platform with the goal of revolutionising the purchasing process
              for smaller companies that traditional distribution models don’t cater for.
            </p>
            <p>
              It's only natural that they also had to meet their clients on the devices that each of
              us uses most often - phones.
            </p>
          </div>

          <Testimonial
            quote="Thanks to Brains & Beards, we have been able to consolidate two great teams and turn our app into a cornerstone of the company's strategy."
            image={eliasImage}
            name="Jose Maria Elias"
            position="Engineering Manager"
            company="ManoMano - Colibri SAS"
          />

          <div className="narrow-column text-format">
            <h3>Challenges</h3>
            ManoMano came to us in 2020 to help them untangle the initial mobile app prototype and
            turn it into a maintainable, long-term codebase that can be efficiently extended with
            new features and used to deploy multiple flavours of the application for different
            markets and users.
            <ul>
              <li>
                The original code base was difficult to work with and showed significant
                architectural issues that manifested in performance problems. Those issues had to be
                gradually addressed without stopping the work on extending the app's functionality.
              </li>
              <li>
                The scope quickly grew to two core developer teams (and multiple contributors from
                other teams within the company) that work together to release different flavours of
                the app for two distinct customer segments across five European markets.
              </li>
            </ul>
            <p>
              All of this while building an in-house mobile team from scratch and setting up the
              ways of working.
            </p>
          </div>

          <Testimonial
            quote="I genuinely value their efficiency, accuracy and clear communication, which are keys to a great collaboration between Tech and Product. I would sincerely recommend working with Brains & Beards to product teams as it’s a huge asset to have them onboard!"
            image={gregoireImage}
            name="Gregoire Bois"
            position="Lead Product Manager"
            company="ManoMano - Colibri SAS"
          />

          <div className="narrow-column text-format">
            <h3>Process</h3>
            <p>
              First step to get the codebase under control was to introduce TypeScript everywhere
              and improve the static code analysis and unit test setups. This allowed us to move
              faster and make changes more confidently. Next steps involved cleaning up the app's
              information structure and dividing code responsibilities that also fixed a lot of the
              most annoying UX bugs.
            </p>

            <p>
              The original codebase was created by an external company and when we joined we started
              working alongside a newly forming in-house mobile team. During this early phase we
              were able to contribute a lot of knowledge that we gained working on other projects
              and on other teams to help them get a head start into an agile workflow that helped
              them manage the team's workload efficiently.
            </p>

            <p>
              Another bigger initiative that went smooth thanks to the experience we gained on tens
              of other React Native projects we worked on previously was engineering a smooth
              release process. The workflow for releasing four different flavours of the application
              from a single codebase needs a lot of tuning and we ended up with a pipeline where
              we'd use the AWS (ARM-only, to save energy and meet the company's sustainability
              goals) infrastructure to build the app and run the E2E tests in Detox. Once the tests
              are green we had an automatic deployment pipeline either through the app store for
              scheduled release, or directly pushed to the users when fixing critical bugs.
            </p>

            <p>
              E2E tests are a necessary part of any bigger application, but they are notoriously
              time-consuming to maintain. Fortunately, we had a{' '}
              <a href="/blog/mocking-network-requests-in-detox-e2e-tests/">
                custom in-house tool to handle network traffic
              </a>{' '}
              that let our infrastructure stay independent from other parts of the platform.
            </p>

            <p>
              In general, Mobile DevOps is a part of the job where your team's experience has a huge
              payoff. We could leverage it to introduce a multi-branch testing solution that allowed
              Product Managers and QA engineers to quickly test many different code branches, by
              easily downloading new app bundles to their devices.
            </p>

            <p>
              Finally, one of the signs of trust ManoMano had in our developers was when one of our
              colleagues was appointed the role of leading one of the two core mobile teams when the
              previous leader went on maternity leave.
            </p>
          </div>

          <Testimonial
            quote="Brains & Beards team is made up of highly skilled professionals who are dedicated to delivering results. They are truly experts in their field and I would highly recommend them!"
            image={linaImage}
            name="Lina Astier"
            position="Product Manager - B2B Mobile App"
            company="ManoMano - Colibri SAS"
          />

          <div className="narrow-column text-format">
            <h3>Outcome</h3>
            <GatsbyImage image={getImage(storeB2bImage)!} alt="Femtasy reviews" />
            <p>
              And here we are, almost three years later. We touched virtually every part of the
              codebase and contributed to delivery of most of the features, including initiatives
              such as experimental migration to GraphQL, complete checkout process overhaul, and
              countless others.
            </p>

            <p>
              While initially cautious about the relationship between the in-house team and an
              external company, ManoMano saw the value of having experts with an outside perspective
              among the development team for one of their crucial sales channels.
            </p>
            <p>
              {' '}
              We're still working with ManoMano to help them deliver the features their users need
              and the outcomes that the business side expects. One deploy at a time.
            </p>
          </div>
        </div>

        <Testimonial
          quote="I would recommend working with Brains & Beards 200% if you are looking for professional people who know what they are doing and who are wonderful people who will do everything possible to help you."
          image={eliasImage}
          name="Jose Maria Elias"
          position="Engineering Manager"
          company="ManoMano - Colibri SAS"
        />
        <EstimateProjectBar
          title="Let us craft a custom solution<br/>for your product"
          buttonText="Estimate project"
        />
      </Layout>
    )
  }
}

export const _headingImageProps = graphql`
  fragment headingImageProps on File {
    childImageSharp {
      gatsbyImageData(layout: CONSTRAINED, formats: [PNG])
    }
  }
`

export const query = graphql`
  query manomanoCaseStudyPageQuery {
    storeB2cImage: file(
      relativePath: { regex: "/manomano-store-screens/" }
      sourceInstanceName: { eq: "caseStudiesAssets" }
    ) {
      ...headingImageProps
    }
    storeB2bImage: file(relativePath: { regex: "/manomano-pro-store-screens/" }) {
      childImageSharp {
        gatsbyImageData(formats: [PNG], width: 740)
      }
    }
    eliasImage: file(relativePath: { regex: "/elias-manomano/" }) {
      ...testimonialImageFragment
    }
    linaImage: file(relativePath: { regex: "/lina-manomano/" }) {
      ...testimonialImageFragment
    }
    gregoireImage: file(relativePath: { regex: "/gregoire-manomano/" }) {
      ...testimonialImageFragment
    }
  }
`

export default ManoManoCaseStudy

export const Head = ({ location }) => (
  <SEO title={title} description={description} pathname={location.pathname} />
)
