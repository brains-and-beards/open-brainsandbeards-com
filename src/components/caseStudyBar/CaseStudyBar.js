import React, { PureComponent } from 'react'
import { Link } from 'gatsby'

import ReadMore from '../ReadMore'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'

class CaseStudyBar extends PureComponent {
  renderContent(isServices) {
    const {
      heroImage,
      header,
      desc,
      full,
      logoImage,
      url,
      flip,
      small,
      top,
    } = this.props

    return (
      <Link to={url}>
        <div
          className={`row client-details ${flip ? 'flip' : ''} ${
            isServices ? 'clients-details-services' : ''
          }`}
        >
          <div className={'clients-pic mobile-only'}>
            {!!heroImage && (
              <GatsbyImage
                image={getImage(heroImage)}
                alt="Case study client image"
              />
            )}
          </div>

          <div className="our-clients-left-col">
            <div className={`left-col ${top ? 'align-top' : ''}`}>
              {!!logoImage && (
                <GatsbyImage
                  image={getImage(logoImage)}
                  alt={header}
                />
              )}
              {small ? <p className="quote">{header}</p> : <h3>{header}</h3>}
              {desc && desc.length > 0 && <p>{desc}</p>}
              <ReadMore text={full ? 'Read full story' : 'Read more'} />
            </div>
          </div>
          <div className={`${isServices ? 'services-clients-pic' : ''}`}>
            <div className="our-clients-pic">
              <div className="right-col clients-pic">
              {!!heroImage ? (
                <GatsbyImage
                  image={getImage(heroImage)}
                  alt="Case study client image"
                />
              ) : (
                <img src={image} />
              )}
              </div>
            </div>
          </div>
        </div>
      </Link>
    )
  }

  renderCaseStudyElement(isFirst) {
    const { heroImage, header, desc, logoImage, url, small, flip } = this.props

    return (
      <Link to={url}>
        <div
          className={`row client-details client-details-case-study  ${
            flip ? 'flip' : ''
          } ${isFirst ? '' : 'client-details-case-study-elements'}`}
        >
          <div
            className={`${
              isFirst ? 'clients-pic-first' : 'clients-pic'
            } mobile-only`}
          >
            {!!heroImage && (
              <GatsbyImage
                image={getImage(heroImage)}
                alt="Company picture"
              />
            )}
          </div>
          <div
            className={`our-clients-left-col ${
              isFirst ? 'our-clients-first-element' : 'our-clients-any-element'
            }`}
          >
            <div className={`left-col`}>
              {!!logoImage && (
                <GatsbyImage
                  image={getImage(logoImage)}
                  alt="Company picture"
                />
              )}
              {small ? <p className="quote">{header}</p> : <h3>{header}</h3>}
              <p>{desc}</p>
              <ReadMore text={'Read full story'} />
            </div>
          </div>

          <div className="our-clients-pic-first">
            <div className="right-col clients-pic">
              {!!heroImage && (
                <GatsbyImage
                  image={getImage(heroImage)}
                  alt="Company picture"
                />
              )}
            </div>
          </div>
        </div>
      </Link>
    )
  }

  render() {
    const { pageType, yellowish } = this.props

    if (pageType === 'projects' && yellowish) {
      return (
        <div className="top-part-yellow">
          <div className="content">{this.renderCaseStudyElement(true)}</div>
        </div>
      )
    } else if (pageType === 'projects') {
      return this.renderCaseStudyElement(false)
    } else if (pageType === 'home') {
      return this.renderCaseStudyElement(false)
    } else if (pageType === 'services') {
      return this.renderContent(true)
    }
  }
}

export default CaseStudyBar
