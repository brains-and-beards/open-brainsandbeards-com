import React, { useEffect, useRef, useState } from 'react'

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
  const [flip, setFlip] = useState<'idle' | 'loading' | 'out' | 'in'>('idle')
  const nextIndex = useRef(0)
  const preparedPortrait = useRef<Promise<number | null> | null>(null)
  const changing = useRef(false)
  const timer = useRef<number | undefined>(undefined)

  useEffect(() => {
    setIndex(Math.floor(Math.random() * images.length))
  }, [images])

  useEffect(() => {
    let cancelled = false
    const prepare = async () => {
      const candidates = images
        .map((_, candidate) => candidate)
        .filter(candidate => candidate !== index)
      const start = Math.floor(Math.random() * candidates.length)
      for (let attempt = 0; attempt < candidates.length; attempt++) {
        if (cancelled) return null
        const candidate = candidates[(start + attempt) % candidates.length]
        const image = new Image()
        image.sizes = '88px'
        image.srcset = images[candidate].srcSet
        image.src = images[candidate].src
        try {
          await image.decode()
          return candidate
        } catch {
          // Keep the current portrait if a replacement cannot be loaded.
        }
      }
      return null
    }
    preparedPortrait.current = prepare()
    return () => {
      cancelled = true
      preparedPortrait.current = null
    }
  }, [images, index])

  const resetTimer = () => {
    window.clearInterval(timer.current)
    timer.current = window.setInterval(() => changePortraitRef.current(), 3500)
  }

  const changePortrait = async () => {
    if (images.length < 2 || flip !== 'idle' || changing.current) return
    const prepared = preparedPortrait.current
    if (!prepared) return
    changing.current = true
    setFlip('loading')
    const candidate = await prepared
    changing.current = false
    if (preparedPortrait.current !== prepared) return
    if (candidate === null) {
      setFlip('idle')
      return
    }
    nextIndex.current = candidate
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIndex(nextIndex.current)
      setFlip('idle')
      return
    }
    setFlip('out')
  }

  const changePortraitRef = useRef(changePortrait)

  useEffect(() => {
    changePortraitRef.current = changePortrait
  })

  useEffect(() => {
    resetTimer()
    return () => window.clearInterval(timer.current)
  }, [])

  const finishFlip = () => {
    if (flip === 'out') {
      setIndex(nextIndex.current)
      setFlip('in')
    } else {
      setFlip('idle')
    }
  }

  return (
    <button
      type="button"
      className="random-team-portrait"
      aria-label="Show another random portrait"
      onClick={() => {
        changePortrait()
        resetTimer()
      }}
      disabled={images.length < 2}
      aria-busy={flip !== 'idle'}
    >
      <span className="careers" data-flip={flip} onAnimationEnd={finishFlip}>
        <img
          className="person-portrait"
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
      </span>
    </button>
  )
}
