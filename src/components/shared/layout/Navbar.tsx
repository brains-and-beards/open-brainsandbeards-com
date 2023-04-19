import React, { useState } from 'react'
import { Link } from 'gatsby'
import LogoSvg from '../../../assets/images/logo-draft.svg'
import HamburgerSvg from '../../../assets/images/hamburger.svg'
import ChevronBackSvg from '../../../assets/images/chevron-bold.svg'
import CloseSvg from '../../../assets/images/close.svg'

const renderLink = (url, label, klass = 'menu-link') => (
  <li className={klass} key={`menu-link-${label}`}>
    <Link to={url}> {label} </Link>
  </li>
)

const useOverlay = () => {
  const [isShown, setIsShown] = useState(false)

  const hide = () => setIsShown(false)
  const show = () => setIsShown(true)

  return { isShown, hide, show }
}

const Navbar = props => {
  const { simple, grey, currentLocation, projects } = props

  const overlay = useOverlay()

  const renderMobileLink = (url, label, klass = 'menu-link mobile-menu-link') => {
    if (url === currentLocation)
      return (
        <li className={klass} key={`mobile-menu-link-${label}`}>
          <a onClick={overlay.hide}> {label} </a>
        </li>
      )

    return (
      <li className={klass} key={`mobile-menu-link-${label}`}>
        <Link to={url}> {label} </Link>
      </li>
    )
  }

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
              ? renderLink('/projects', navbarBackButtonText)
              : renderLink('/', navbarBackButtonText)}
          </div>
        </div>
      ) : (
        <div className="menu">
          <Link to="/">
            <LogoSvg alt="Brains and Beards logo" />
          </Link>

          <ul className="menu-links desktop-only">
            {[
              { url: '/', label: 'Home' },
              { url: '/projects', label: 'Projects' },
              { url: '/about-us', label: 'About us' },
              { url: '/team', label: 'Team' },
              { url: '/jobs', label: 'Careers' },
              { url: '/blog', label: 'Blog' }
            ].map(link => renderLink(link.url, link.label))}
            <li className="menu-link">
              <a href="https://podcast.brainsandbeards.com"> Podcast </a>
            </li>
          </ul>
          <ul className="menu-estimate-link desktop-only">
            {renderLink(
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
            <ul>
              {[
                { url: '/', label: 'Home' },
                { url: '/projects', label: 'Projects' },
                { url: '/about-us', label: 'About us' },
                { url: '/team', label: 'Team' },
                { url: '/jobs', label: 'Careers' },
                { url: '/blog', label: 'Blog' }
              ].map(link => renderMobileLink(link.url, link.label))}
              <li className="menu-link mobile-menu-link">
                <a href="https://podcast.brainsandbeards.com"> Podcast </a>
              </li>
            </ul>
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
