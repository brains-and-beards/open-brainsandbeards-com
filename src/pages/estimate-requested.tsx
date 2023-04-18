import React, { Component } from "react";
import { graphql } from "gatsby";

import Layout from "../templates/layout";
import SEO from "../components/shared/layout/SEO";

class EstimateRequested extends Component {
  render() {
    const { heroImage } = this.props.data;

    return (
      <Layout
        headerTitle="Thanks!"
        headerSub="Thanks for considering us for your project. We'll get back to you soon!"
        headerImage={heroImage}
        headerColumns
        simpleNavbar
      />
    );
  }
}

export const query = graphql`
  query estimateRequestedPageQuery {
    heroImage: file(relativePath: { regex: "/estimate-requested-hero/" }) {
      ...headerHeroImage
    }
  }
`;

export default EstimateRequested;

const title = "Estimate requested";
const description = "Thanks for considering us for your project.";

export const Head = ({ location }) => (
  <SEO title={title} description={description} pathname={location.pathname} />
);
