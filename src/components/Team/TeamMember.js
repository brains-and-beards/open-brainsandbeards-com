import React, { Component } from 'react'

class TeamMember extends Component {
  render() {
    const { imageUrl, name, bio } = this.props
    const hash =
      typeof window !== 'undefined' &&
      window &&
      window.location.hash &&
      decodeURIComponent(window.location.hash.substring(1))
    const isFocused = hash === name || hash === 'Brains&Beards'

    return (
      <div className={'team-member'} id={name}>
        {imageUrl && (
          <img
            src={imageUrl}
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
