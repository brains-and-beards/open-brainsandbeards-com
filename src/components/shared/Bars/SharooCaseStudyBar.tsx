import { StaticImage } from "gatsby-plugin-image";
import React from "react";
import CaseStudyBar, { PageType } from "./CaseStudyBar";

const heroImage = (
  <StaticImage
    src="../../../assets/case-studies/sharoo/sharoo-hero.jpg"
    alt="Sharoo banner"
    placeholder="blurred"
    width={680}
  />
);

const logoImage = (
  <StaticImage
    src="../../../assets/case-studies/sharoo/sharoo-logo.png"
    alt="Sharoo logo"
    placeholder="blurred"
    height={22}
  />
);

const SharooCaseStudyBar = ({ pageType }: { pageType: PageType }) => {
  return (
    <CaseStudyBar
      heroImage={heroImage}
      logoImage={logoImage}
      header="We helped sharoo team conquering carsharing economy in Switzerland"
      desc="How we implemented unique mobile applications supporting renting and interacting with rented vehicles."
      url="/projects/sharoo"
      pageType={pageType || "home"}
    />
  );
};

export default SharooCaseStudyBar;
