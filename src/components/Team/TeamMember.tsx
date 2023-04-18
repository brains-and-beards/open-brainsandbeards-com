import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import React, { Component } from 'react'

class TeamMember extends Component {
  render() {
    const { image, name, bio } = this.props
    const hash =
      typeof window !== 'undefined' &&
      window &&
      window.location.hash &&
      decodeURIComponent(window.location.hash.substring(1))
    const isFocused = hash === name || hash === 'Brains&Beards'

    return (
      <div className={'team-member'} id={name}>
        {!!image && (
          <GatsbyImage
            image={getImage(image)}
            alt={`member: ${name}`}
            className={isFocused ? 'isFocused' : ''}
          />
        )}
        <p className="sub1"> {name} </p>
        <p> {bio} </p>
      </div>
    )
  }
}

export default TeamMember
