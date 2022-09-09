import React from 'react'
import Img from 'gatsby-image'

const renderSubtitle = (subtitleContent, image) => {
  return typeof subtitleContent === 'string' ? (
    <div>
      {image && (
        <div>
          <Img
            fluid={image}
            className="right-header-image mobile-only"
            alt={subtitleContent}
          />
        </div>
      )}
      <p className="sub2">{subtitleContent}</p>
    </div>
  ) : (
    <div className="content">{subtitleContent}</div>
  )
}

const Header = ({ title, subtitle, columns, image, rightContent }) => {
  if (columns) {
    return (
      <div className="header">
        <div className="left-col" key="header-left">
          {typeof title === 'string' ? (
            <h1 className="text-center-mobile">{title}</h1>
          ) : (
            title
          )}
          {renderSubtitle(subtitle, image)}
        </div>
        <div className="hero-right-col center" key="header-right">
          {rightContent ||
            (image && <Img fluid={image} className="right-header-image" />)}
        </div>
      </div>
    )
  } else {
    return (
      <div className="center">
        <h1>{title}</h1>
        {renderSubtitle(subtitle)}
      </div>
    )
  }
}
export default Header
