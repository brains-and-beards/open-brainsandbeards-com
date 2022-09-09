import React, { Component } from 'react'
import { Link } from 'gatsby'
import CanonicalLink from './CanonicalLink'

const renderLink = (url, label, klass = 'menu-link') => (
  <li className={klass} key={`menu-link-${label}`}>
    <Link to={url}> {label} </Link>
  </li>
)

class Navbar extends Component {
  state = {
    showMobileOverlay: false,
  }

  showOverlay = () => {
    this.setState({ showMobileOverlay: true })
  }

  hideOverlay = () => {
    this.setState({ showMobileOverlay: false })
  }

  renderLocaleSwitch = () => (
    <ul className="menu-links desktop-only">
      {renderLink('#', 'En')}
      {' | '}
      {renderLink('#', 'De')}
    </ul>
  )

  renderMobileLink = (url, label, klass = 'menu-link mobile-menu-link') => {
    if (url === this.props.currentLocation)
      return (
        <li className={klass} key={`mobile-menu-link-${label}`}>
          <a onClick={this.hideOverlay}> {label} </a>
        </li>
      )

    return (
      <li className={klass} key={`mobile-menu-link-${label}`}>
        <Link to={url}> {label} </Link>
      </li>
    )
  }

  render() {
    const { simple, grey, currentLocation, projects } = this.props
    const { showMobileOverlay } = this.state
    const navbarBackButtonText = `Back to ${projects ? 'projects' : 'homepage'}`

    return (
      <div className={`menu-container ${grey ? 'grey' : ''}`}>
        {simple ? (
          <div className="menu">
            <Link to="/">
              <img
                id="logo"
                src={require('../assets/images/logo-draft.svg')}
                alt="logo"
              />
            </Link>
            <div className="back-to-homepage">
              <img
                src={require('../assets/images/chevron-bold.svg')}
                height="10px"
                className="reverse"
                alt="back"
              />
              {projects
                ? renderLink('/projects', navbarBackButtonText)
                : renderLink('/', navbarBackButtonText)}
            </div>
          </div>
        ) : (
          <div className="menu">
            <Link to="/">
              <img
                id="logo"
                src={require('../assets/images/logo-draft.svg')}
                alt="logo"
              />
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
            <img
              src={require('../assets/images/hamburger.svg')}
              className="mobile-only"
              onClick={this.showOverlay}
              alt="menu"
            />
          </div>
        )}

        {showMobileOverlay && (
          <div className="mobile-only menu-overlay">
            <div className="mobile-menu-content">
              <div className="menu">
                <img
                  id="logo"
                  src={require('../assets/images/logo-draft.svg')}
                  alt="logo"
                />
                <img
                  src={require('../assets/images/close.svg')}
                  className="mobile-only"
                  onClick={this.hideOverlay}
                  alt="close"
                />
              </div>
              <ul>
                {[
                  { url: '/', label: 'Home' },
                  { url: '/projects', label: 'Projects' },
                  { url: '/about-us', label: 'About us' },
                  { url: '/team', label: 'Team' },
                  { url: '/jobs', label: 'Careers' },
                  { url: '/blog', label: 'Blog' },
                ].map((link) => this.renderMobileLink(link.url, link.label))}
                <li className="menu-link mobile-menu-link">
                  <a href="https://podcast.brainsandbeards.com"> Podcast </a>
                </li>
              </ul>
              <ul>
                {this.renderMobileLink(
                  '/estimate-project',
                  'Estimate project',
                  'menu-link button'
                )}
              </ul>
              {false && (
                <ul className="horizontal">
                  {this.renderMobileLink('#', 'En', 'menu-link light')}
                  {' | '}
                  {this.renderMobileLink('#', 'De', 'menu-link light')}
                </ul>
              )}
            </div>
          </div>
        )}
        <CanonicalLink path={currentLocation} />
      </div>
    )
  }
}

export default Navbar
