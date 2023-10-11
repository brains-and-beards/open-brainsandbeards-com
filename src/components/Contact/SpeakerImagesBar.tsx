import { StaticImage } from 'gatsby-plugin-image'
import React from 'react'

const SpeakerImagesBar = () => {
  return (
    <section>
      <h3 className="small-headline center">Some of our speaking engagements</h3>
      <div className="content row speaker-images-bar">
        <div className="speaker-image">
          <StaticImage
            src="../../assets/images/contact-page/wojtek-react-berlin.jpg"
            className="center-mobile"
            alt="Speaking at React Day Berlin"
            placeholder="blurred"
            height={250}
          />
          <figcaption className="center">React Day Berlin</figcaption>
        </div>
        <div className="speaker-image">
          <StaticImage
            src="../../assets/images/contact-page/wojtek-react-alicante.jpg"
            className=" desktop-only"
            alt="Speaking at React Alicante"
            placeholder="blurred"
            height={250}
          />
          <figcaption className="center">React Alicante</figcaption>
        </div>
      </div>
    </section>
  )
}

export default SpeakerImagesBar
