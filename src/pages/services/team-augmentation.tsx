import React from "react";
import { graphql } from "gatsby";

import Layout from "../../templates/layout";
import TonedDownEstimateProject from "../../components/shared/Bars/TonedDownEstimateProject";
import CaseStudyBar from "../../components/shared/Bars/CaseStudyBar";
import PictureListItem from "../../components/shared/PictureListItem";
import { lokalportalHeroImage } from "../../components/CaseStudies/images";
import SEO from "../../components/shared/layout/SEO";

const TeamAugmentationService = (props) => {
  const { heroImage, fasterImage, learningImage, scalingImage } = props.data;

  return (
    <Layout
      headerTitle="Bring your team to the next level"
      headerSub="We're happy to work hand-in-hand with your existing team to give them the support they need to deliver great apps."
      headerImage={heroImage}
      headerColumns
      simpleNavbar
    >
      <div className="service-description">
        <div className="content narrow-column">
          <h3>
            Why you might want to
            <br />
            augment your staff?
          </h3>

          <ul className="picture-list">
            <PictureListItem
              image={fasterImage}
              title="Getting work done faster"
            >
              <p>
                When the plans that you have for your applications are growing
                faster than your current team can deliver, one of the obvious
                solutions is to get a bigger team. Unfortunately, hiring new
                developers is neither an easy, nor a quick process.
              </p>
            </PictureListItem>

            <PictureListItem image={learningImage} title="Learning new skills">
              <p>
                Working alongside your team we make sure to share the best
                processes and tricks in our workflow, so that after the whole
                experience your team leaves with valuable experience.
              </p>
            </PictureListItem>

            <PictureListItem
              image={scalingImage}
              title="Quickly scaling your team"
            >
              <p>
                Sometimes you just need a short push to help out with some
                particular features. In such case it doesn't make much sense to
                go through the costly hiring process and it's easier to bring on
                a team of experienced contractors instead.
              </p>
            </PictureListItem>
          </ul>

          <h3>How we work</h3>
          <p>
            We’re no strangers to clients coming to us with “legacy” projects.
            Ranging from rescue missions where we're brought in to help untangle
            the mess that the project has grown into, to helping successful
            teams deliver even faster, where we hit the ground running and fit
            into the already established processes.
          </p>
          <p>
            Every project is a unique snowflake and we treat is as such. Contact
            us to learn more about how we can help with yours.
          </p>
        </div>
        <TonedDownEstimateProject
          title="We'd be happy to help and steer you towards the best solution"
          buttonText="Estimate project"
        />
        <div className="content row">
          <div className="narrow-column">
            <h3 className="center set-out">How about an example?</h3>
            <p className="caption center case-study-teaser">
              If you want to learn more about how we work and what we can
              achieve, check a detailed case study of a native mobile project
              that we delivered in a small team for a huge Japanese client.
            </p>
            <CaseStudyBar
              heroImage={lokalportalHeroImage}
              header="We helped Lokalportal team reshape local journalism in Germany"
              desc="How we helped speed up development by improving agile processes and setting up a resilient application architecture."
              url="/projects/lokalportal"
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
  );
};

export const query = graphql`
  query ServiceTeamAugmentationPage {
    heroImage: file(
      relativePath: { regex: "/services-team-augmentation-hero/" }
    ) {
      childImageSharp {
        gatsbyImageData(width: 600)
      }
    }
    fasterImage: file(
      relativePath: { regex: "/services-team-augmentation-faster/" }
    ) {
      ...illustrationIconImageProps
    }
    learningImage: file(
      relativePath: { regex: "/services-team-augmentation-learning/" }
    ) {
      ...illustrationIconImageProps
    }
    scalingImage: file(
      relativePath: { regex: "/services-team-augmentation-scaling/" }
    ) {
      ...illustrationIconImageProps
    }
  }
`;

export default TeamAugmentationService;

const title = "Bring your team to the next level";
const description =
  "We're happy to work hand-in-hand with your existing team to give them the support they need to deliver great apps.";

export const Head = ({ location }) => (
  <SEO title={title} description={description} pathname={location.pathname} />
);
