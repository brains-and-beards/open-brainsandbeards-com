import { Link } from 'gatsby'
import React, { useState } from 'react'

import ChevronBackSvg from '../../../assets/images/chevron-bold.svg'
import CloseSvg from '../../../assets/images/close.svg'
import HamburgerSvg from '../../../assets/images/hamburger.svg'
import LogoSvg from '../../../assets/images/logo-draft.svg'
import NavbarLink from './NavbarLink'

const useOverlay = () => {
  const [isShown, setIsShown] = useState(false)

  const hide = () => setIsShown(false)
  const show = () => setIsShown(true)

  return { isShown, hide, show }
}
const menuLinks = [
  { url: '/', label: 'Home' },
  { url: '/projects/', label: 'Projects' },
  { url: '/about-us/', label: 'About us' },
  { url: '/team/', label: 'Team' },
  { url: 'https://brainsandbeards.com/jobs', label: 'Careers' },
  { url: '/blog/', label: 'Blog' },
  { url: 'https://podcast.brainsandbeards.com', label: 'Podcast' }
]

const Navbar = props => {
  const { simple, grey, currentLocation, projects } = props

  const overlay = useOverlay()

  const renderMobileLink = (url: string, label: string, klass = 'menu-link mobile-menu-link') => (
    <NavbarLink
      url={url}
      label={label}
      klass={klass}
      onClick={url === currentLocation ? overlay.hide : undefined}
    />
  )

  const renderDesktopLink = (url: string, label: string, klass = 'menu-link') => (
    <NavbarLink url={url} label={label} klass={klass} />
  )

  const navbarBackButtonText = `Back to ${projects ? 'projects' : 'homepage'}`

  return (
    <div className={`menu-container ${grey ? 'grey' : ''}`}>
      {simple ? (
        <div className="menu">
          <Link to="/">
            <LogoSvg alt="Brains and Beards logo" />
          </Link>
          <div className="back-to-homepage">
            <ChevronBackSvg className="reverse" alt="Back arrow" />
            {projects
              ? renderDesktopLink('/projects', navbarBackButtonText)
              : renderDesktopLink('/', navbarBackButtonText)}
          </div>
        </div>
      ) : (
        <div className="menu">
          <Link to="/">
            <LogoSvg alt="Brains and Beards logo" />
          </Link>

          <ul className="menu-links desktop-only">
            {menuLinks.map(link => renderDesktopLink(link.url, link.label))}
          </ul>
          <ul className="menu-estimate-link desktop-only">
            {renderDesktopLink(
              '/estimate-project',
              'Estimate project',
              'menu-link button menu-estimate-button'
            )}
          </ul>
          <div onClick={overlay.show}>
            <HamburgerSvg className="mobile-only" alt="menu" />
          </div>
        </div>
      )}

      {overlay.isShown && (
        <div className="mobile-only menu-overlay">
          <div className="mobile-menu-content">
            <div className="menu">
              <LogoSvg alt="Brains and Beards logo" />
              <div onClick={overlay.hide}>
                <CloseSvg className="mobile-only" alt="close" />
              </div>
            </div>
            <ul>{menuLinks.map(link => renderMobileLink(link.url, link.label))}</ul>
            <ul>{renderMobileLink('/estimate-project', 'Estimate project', 'menu-link button')}</ul>
            {false && (
              <ul className="horizontal">
                {renderMobileLink('#', 'En', 'menu-link light')}
                {' | '}
                {renderMobileLink('#', 'De', 'menu-link light')}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default Navbar
