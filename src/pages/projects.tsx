import React, { Component } from "react";

import Layout from "../templates/layout";
import ClientLogos from "../components/CaseStudies/ClientLogos";
import CaseStudyBar from "../components/shared/Bars/CaseStudyBar";
import TrustBar from "../components/shared/Bars/TrustBar";
import EstimateProjectBar from "../components/shared/Bars/EstimateProjectBar";
import {
  clincaseHeroImage,
  clincaseLogoImage,
  femtasyHeroImage,
  femtasyLogoImage,
  lokalportalHeroImage,
  lokalportalLogoImage,
  rakutenHeroImage,
  rakutenLogoImage,
  sharooLogoImage,
  sharooHeroImage,
} from "../components/CaseStudies/images";
import SEO from "../components/shared/layout/SEO";

class Projects extends Component {
  render() {
    return (
      <Layout
        headerTitle="Case studies"
        headerSub="Read in detail about some of the applications that we've built."
      >
        <div className="case-studies-container">
          <CaseStudyBar
            yellowish
            heroImage={femtasyHeroImage}
            logoImage={femtasyLogoImage}
            header="We built a streaming audio player for femtasy"
            desc="Story of a successful launch of a mobile app for an award-winning streaming platform."
            url="/projects/femtasy"
            flip
            full
            pageType="projects"
          />
          <div className="content">
            <CaseStudyBar
              heroImage={lokalportalHeroImage}
              logoImage={lokalportalLogoImage}
              header="We helped Lokalportal team reshape local journalism in Germany"
              desc="How we helped speed up development by improving agile processes and setting up a resilient application architecture."
              url="/projects/lokalportal"
              full
              pageType="projects"
            />
            <CaseStudyBar
              heroImage={sharooHeroImage}
              logoImage={sharooLogoImage}
              header="We helped sharoo team conquering carsharing economy in Switzerland"
              desc="How we implemented unique mobile applications supporting renting and interacting with rented vehicles."
              url="/projects/sharoo"
              flip
              full
              pageType="projects"
            />
            <CaseStudyBar
              heroImage={clincaseHeroImage}
              logoImage={clincaseLogoImage}
              header="How we've recently helped a German company from the medical sector"
              desc="Clincase is a long-standing company that has been handling medical data for their customers for fifteen years. We built for them a mobile application that expanded their business to a whole new market."
              url="/projects/clincase/"
              full
              pageType="projects"
            />
            <CaseStudyBar
              heroImage={rakutenHeroImage}
              logoImage={rakutenLogoImage}
              header="Timely delivery of a premium shopping app for a market-leading enterprise"
              desc="How we built a native iOS app for FC Barcelona sponsor with enough time to spare to help with their Android version."
              url="/projects/rakuten"
              flip
              full
              pageType="projects"
            />
            <h3 className="awesome-people">
              We've helped some pretty great people at some pretty awesome
              companies:
            </h3>
            <ClientLogos />
          </div>
        </div>

        <TrustBar />
        <EstimateProjectBar />
      </Layout>
    );
  }
}

export default Projects;

const title = "Case studies";
const description =
  "Read in detail about some of the applications that we've built.";

export const Head = ({ location }) => (
  <SEO title={title} description={description} pathname={location.pathname} />
);
