import { StaticImage } from 'gatsby-plugin-image'
import React from 'react'

import ConvertKitMRNCourseForm from './ConvertKitMRNCourseForm'

const CourseEnrollBanner = () => {
  return (
    <section className="estimateProject">
      <div className="content row">
        <StaticImage
          className="center-mobile cta-bar-image desktop-only"
          height={400}
          src="../../assets/illustrations/estimate-project-bar-left.png"
          alt="Happy puzzle phone"
        />
        <div className="center newsletter-content">
          <h2>Maintainable React Native</h2>
          <p className="sub2">
            This course is aimed at advanced React Native developers who already know how to make
            things work, but are looking for ways to make their apps stand the test of time.
          </p>

          <p className="sub2">
            We'll help you put all the pieces together for a successful app. Get to know the best
            practises we use in Brains & Beards to deliver successful React Native apps since 2016.
            Enroll directly below or learn more on{' '}
            <a href="https://brains-beards.ck.page/maintainable-react-native">a dedicated page</a>.
          </p>

          <div className="narrow-column ">
            <div className="center">
              <ConvertKitMRNCourseForm />
            </div>
          </div>
        </div>
        <StaticImage
          className="cta-bar-image desktop-only newsletter-image-right"
          height={400}
          src="../../assets/illustrations/estimate-project-bar-right.png"
          alt="Happy puzzle phone"
        />
      </div>

      {/* TODO: Is it really needed? */}
      {/* <div className="blog-micro"> 
        <p className=" micro">
          Clicking "I want to know more" you consent to processing your data by Brains & Beards sp.
          z o.o. for marketing purposes, including sending emails.
        </p> 
      </div> */}

      {/* <Modal onClose={handleModalClose} show={showModal} title={'Error'} mainText={modalText} /> */}
    </section>
  )
}

export default CourseEnrollBanner
