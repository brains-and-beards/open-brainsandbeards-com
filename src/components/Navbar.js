import React, { useState } from 'react'
import { Link } from 'gatsby'
import { StaticImage } from 'gatsby-plugin-image'

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

const Navbar = (props) => {
  const { simple, grey, currentLocation, projects } = props

  const overlay = useOverlay();


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
              <StaticImage src='../assets/images/logo-draft.svg'  alt='logo' />
            </Link>
            <div className="back-to-homepage">
              <StaticImage src='../assets/images/chevron-bold.svg'  alt='back' />
              {projects
                ? renderLink('/projects', navbarBackButtonText)
                : renderLink('/', navbarBackButtonText)}
            </div>
          </div>
        ) : (
          <div className="menu">
            <Link to="/">
              <StaticImage src='../assets/images/logo-draft.svg'  alt='logo' />
            </Link>

            <ul className="menu-links desktop-only">
              {[
                { url: '/', label: 'Home' },
                { url: '/projects', label: 'Projects' },
                { url: '/about-us', label: 'About us' },
                { url: '/team', label: 'Team' },
                { url: '/jobs', label: 'Careers' },
                { url: '/blog', label: 'Blog' },
              ].map((link) => renderLink(link.url, link.label))}
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
              <StaticImage
                src='../assets/images/hamburger.svg'
                className="mobile-only"
                alt='menu'
              />
            </div>
          </div>
        )}

        {overlay.isShown && (
          <div className="mobile-only menu-overlay">
            <div className="mobile-menu-content">
              <div className="menu">
                <StaticImage src='../assets/images/logo-draft.svg' alt='logo' />
                <div onClick={overlay.hide}>
                  <StaticImage src='../assets/images/close.svg' className="mobile-only" alt='close' />
                </div>
              </div>
              <ul>
                {[
                  { url: '/', label: 'Home' },
                  { url: '/projects', label: 'Projects' },
                  { url: '/about-us', label: 'About us' },
                  { url: '/team', label: 'Team' },
                  { url: '/jobs', label: 'Careers' },
                  { url: '/blog', label: 'Blog' },
                ].map((link) => renderMobileLink(link.url, link.label))}
                <li className="menu-link mobile-menu-link">
                  <a href="https://podcast.brainsandbeards.com"> Podcast </a>
                </li>
              </ul>
              <ul>
                {renderMobileLink(
                  '/estimate-project',
                  'Estimate project',
                  'menu-link button'
                )}
              </ul>
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
        {/* TODO: Implement it in Head of page */}
        {/* <CanonicalLink path={currentLocation} /> */}
      </div>
    )
  }

export default Navbar
