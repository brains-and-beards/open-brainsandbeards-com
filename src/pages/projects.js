import React, { Component } from 'react'

import Layout from '../templates/layout'
import ClientLogos from '../components/ClientLogos'
import CaseStudyBar from '../components/CaseStudyBar'
import TrustBar from '../components/TrustBar'
import EstimateProjectBar from '../components/EstimateProjectBar'

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
            image={require('../assets/case-studies/femtasy/femtasy-header.png')}
            logo={require('../assets/case-studies/femtasy/femtasy-logo.png')}
            header="We built a streaming audio player for femtasy"
            desc="Story of a successful launch of a mobile app for an award-winning streaming platform."
            url="/projects/femtasy"
            flip
            full
            pageType="projects"
          />
          <div className="content">
            <CaseStudyBar
              image={require('../assets/case-studies/lokalportal/lokalportal-web.jpg')}
              logo={require('../assets/case-studies/lokalportal/logo_lokal_full.png')}
              header="We helped Lokalportal team reshape local journalism in Germany"
              desc="How we helped speed up development by improving agile processes and setting up a resilient application architecture."
              url="/projects/lokalportal"
              full
              pageType="projects"
            />
            <CaseStudyBar
              image={require('../assets/case-studies/sharoo/sharoo-hero.jpg')}
              logo={require('../assets/case-studies/sharoo/sharoo-logo.png')}
              header="We helped sharoo team conquering carsharing economy in Switzerland"
              desc="How we implemented unique mobile applications supporting renting and interacting with rented vehicles."
              url="/projects/sharoo"
              flip
              full
              pageType="projects"
            />
            <CaseStudyBar
              image={require('./../assets/case-studies/clincase/epro-logo.jpg')}
              logo={require('../assets/client-logos/clincase.png')}
              header="How we've recently helped a German company from the medical sector"
              desc="Clincase is a long-standing company that has been handling medical data for their customers for fifteen years. We built for them a mobile application that expanded their business to a whole new market."
              url="/projects/clincase/"
              full
              pageType="projects"
            />
            <CaseStudyBar
              image={require('../assets/case-studies/rakuten-team.jpg')}
              logo={require('../assets/client-logos/rakuten-alt.png')}
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
    )
  }
}

export default Projects
