import React, { useEffect, useState } from 'react'

interface Portrait {
  src: string
  srcSet: string
}

interface Props {
  images: Portrait[]
  alt: string
}

export default function RandomTeamPortrait({ images, alt }: Props) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    setIndex(Math.floor(Math.random() * images.length))
  }, [images])

  const changePortrait = () => {
    if (images.length < 2) return
    setIndex(
      current => (current + 1 + Math.floor(Math.random() * (images.length - 1))) % images.length
    )
  }

  return (
    <button
      type="button"
      className="random-team-portrait"
      aria-label="Show another random portrait"
      onClick={changePortrait}
      disabled={images.length < 2}
    >
      <img
        className="person-portrait careers"
        src={images[index].src}
        srcSet={images[index].srcSet}
        sizes="88px"
        width={88}
        height={120}
        alt={alt}
        loading="lazy"
        decoding="async"
        data-responsive-preset="team"
      />
    </button>
  )
}
