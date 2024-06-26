import { StaticImage } from 'gatsby-plugin-image'
import React from 'react'

import Swiper from './Swiper'
import SwiperItem from './SwiperItem'

const references = [
  {
    image: (
      <StaticImage
        src={'../../../assets/case-studies/manomano/marc-manomano.png'}
        imgClassName="round"
        loading="eager"
        alt="Testimonial illustration"
        height={152}
        placeholder="blurred"
      />
    ),
    quote:
      '“Deep technical knowledge, human touch, high level of engagement, leadership skills, adaptability… there are many reasons for which I’m trusting completely in Brains & Beards to make the story of ManoMano apps a great success.”',
    name: 'Marc Torrent',
    position: 'Head of Engineering',
    company: 'ManoMano - Colibri SAS'
  },
  {
    image: (
      <StaticImage
        src={'../../../assets/testimonials/rakuten-sergio.jpg'}
        imgClassName="round"
        loading="eager"
        alt="Testimonial illustration"
        height={152}
        placeholder="blurred"
      />
    ),
    quote:
      "“I've approached Brains & Beards, because we needed a new mobile application for the Spanish market. The result was a product which is not only easy to maintain and robust, but as well great-looking and simple to understand for Rakuten users. Their years-long expertise helped us get rid of many problems before they even appeared.”",
    name: 'Sergio Gago',
    position: 'Technical Director',
    company: 'Rakuten SL'
  },
  {
    image: (
      <StaticImage
        src={'../../../assets/testimonials/sharoo-feyyaz.jpg'}
        imgClassName="round"
        loading="eager"
        alt="Testimonial illustration"
        height={152}
        placeholder="blurred"
      />
    ),
    quote:
      '“We started working with Brains & Beards back in 2016 and have been a customer ever since. They are a reliable partner to work with and have helped us bring many solutions to life both on desktop and mobile. Their expertise and experience shows in many different facets such as project planning, suggesting solutions and efficient problem solving. We can recommend Brains & Beards to companies that need skilled developers who are not scared of technical challenges.”',
    name: 'Feyyaz Alingan',
    position: 'Head of Product & Development',
    company: 'sharoo AG'
  },
  {
    image: (
      <StaticImage
        src={'../../../assets/case-studies/manomano/elias-manomano.jpg'}
        imgClassName="round"
        loading="eager"
        alt="Testimonial illustration"
        height={152}
        placeholder="blurred"
      />
    ),
    quote:
      '“Working with Brains & Beards is very easy. They have integrated into the teams as if they were part of our internal team and have contributed their experience and professionalism in the creation of our apps. Both technically with their great knowledge of technology and at the process level with a clear mindset of continuous learning.”',
    name: 'Jose Maria Elias',
    position: 'Engineering Manager',
    company: 'ManoMano - Colibri SAS'
  },
  {
    image: (
      <StaticImage
        src={'../../../assets/testimonials/xing-sebastian.jpg'}
        imgClassName="round"
        loading="eager"
        alt="Testimonial illustration"
        height={152}
        placeholder="blurred"
      />
    ),
    quote:
      '“Brains & Beards helped me by solving many technical impediments across various agile development teams through implementing the needed changes to the backend of those connected applications. The result was that we were able to release the product in time and scope. I would recommend Brains & Beards to people who need the profound support of experienced developers to solve technically challenging projects.”',
    name: 'Sebastian Gerdemann',
    position: 'Senior Product Manager',
    company: 'XING E-Recruiting GmbH & Co. KG'
  }
]

const ReferenceSwiper = () => {
  return (
    <div className="references">
      <Swiper ContentClass={SwiperItem} items={references} />
    </div>
  )
}

export default ReferenceSwiper
