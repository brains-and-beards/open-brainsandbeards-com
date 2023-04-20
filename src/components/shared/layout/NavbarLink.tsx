import React, { useState } from 'react'
import { Link } from 'gatsby'

const isExternal = (link: string) => link.match(/^https?:\/\//)

const renderInternalLink = (url: string, label: string) => <Link to={url}> {label} </Link>

const renderAsPureHTML = (url: string, label: string, onClick: (() => void) | undefined) => (
  // If we have both `url` and `onClick`, the app will trigger both
  <a href={onClick ? undefined : url} onClick={onClick}>
    {label}
  </a>
)

interface NavbarLinkProps {
  url: string
  label: string
  klass: string
  onClick?: () => void
  isMobile?: boolean
}

const NavbarLink: React.FC<NavbarLinkProps> = ({ url, label, klass, onClick, isMobile }) => {
  // Elements that trigger onClick need to be rendered as <a>
  // If a link (ultimately) leads outside, it needs to use <a>
  const shouldRenderAsPureHTML = isExternal(url) || onClick

  return (
    <li className={klass} key={isMobile ? `mobile-menu-link-${label}` : `menu-link-${label}`}>
      {shouldRenderAsPureHTML
        ? renderAsPureHTML(url, label, onClick)
        : renderInternalLink(url, label)}
    </li>
  )
}

export default NavbarLink
