import React, { PureComponent } from 'react'
import { Link } from 'gatsby'

import ReadMore from './ReadMore'

class CaseStudyBar extends PureComponent {
  renderContent(isServices) {
    const {
      image,
      header,
      desc,
      full,
      logo,
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
            <img src={image} />
          </div>

          <div className="our-clients-left-col">
            <div className={`left-col ${top ? 'align-top' : ''}`}>
              {logo && <img src={logo} height={16} alt={header} />}
              {small ? <p className="quote">{header}</p> : <h3>{header}</h3>}
              {desc && desc.length > 0 && <p>{desc}</p>}
              <ReadMore text={full ? 'Read full story' : 'Read more'} />
            </div>
          </div>
          <div className={`${isServices ? 'services-clients-pic' : ''}`}>
            <div className="our-clients-pic">
              <div className="right-col clients-pic">
                <img src={image} />
              </div>
            </div>
          </div>
        </div>
      </Link>
    )
  }

  renderCaseStudyElement(isFirst) {
    const { image, header, desc, logo, url, small, flip } = this.props

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
            <img src={image} alt="Company picture" />
          </div>
          <div
            className={`our-clients-left-col ${
              isFirst ? 'our-clients-first-element' : 'our-clients-any-element'
            }`}
          >
            <div className={`left-col`}>
              {logo && <img src={logo} height={22} alt="Company picture" />}
              {small ? <p className="quote">{header}</p> : <h3>{header}</h3>}
              <p>{desc}</p>
              <ReadMore text={'Read full story'} />
            </div>
          </div>

          <div className="our-clients-pic-first">
            <div className="right-col clients-pic">
              <img src={image} alt="Company picture" />
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
