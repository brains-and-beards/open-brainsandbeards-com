import React, { Component } from "react";
import { graphql } from "gatsby";
import Layout from "../templates/layout";
import SEO from "../components/shared/layout/SEO";

class NewsletterSubscribed extends Component {
  render() {
    const { heroImage } = this.props.data;

    return (
      <Layout
        headerTitle="Thank you for subscribing!"
        headerSub="Almost finished... We need to confirm your email address. To complete the subscription process, please click the link in the email we just sent you. And see you soon!"
        headerImage={heroImage}
        headerColumns
        simpleNavbar
      />
    );
  }
}

export const query = graphql`
  query newsletterSubscribedPageQuery {
    heroImage: file(relativePath: { regex: "/estimate-requested-hero/" }) {
      ...headerHeroImage
    }
  }
`;

export default NewsletterSubscribed;

const title = "Newsletter subscribed";
const description = "We'll visit your mailbox soon enough!";

export const Head = ({ location }) => (
  <SEO title={title} description={description} pathname={location.pathname} />
);
