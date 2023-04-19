import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import React from 'react'

const TeamMember = ({ image, bio, name, onPrev, onNext }) => {
  const hash =
    typeof window !== 'undefined' &&
    window &&
    window.location.hash &&
    decodeURIComponent(window.location.hash.substring(1))
  const isFocused = hash === name || hash === 'Brains&Beards'

  return (
    <div className={'team-member'} id={name}>
      <GatsbyImage
        image={getImage(image)}
        alt={`member: ${name}`}
        className={isFocused ? 'isFocused' : ''}
      />
      <p className="sub1"> {name} </p>
      <p> {bio} </p>
    </div>
  )
}

export default TeamMember
