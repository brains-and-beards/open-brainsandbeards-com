import _ from 'lodash'
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
  const [index, setIndex] = useState<number | null>(null)
  const remaining = useRef<number[]>([])
  const [flip, setFlip] = useState<'idle' | 'loading' | 'out' | 'in'>('idle')
  const nextIndex = useRef(0)
  const preparedPortrait = useRef<Promise<number | null> | null>(null)
  const changing = useRef(false)
  const timer = useRef<number | undefined>(undefined)

  useEffect(() => {
    const first = Math.floor(Math.random() * images.length)
    remaining.current = _.shuffle(
      images.map((_, candidate) => candidate).filter(candidate => candidate !== first)
    )
    setIndex(first)
  }, [images])

  useEffect(() => {
    if (index === null || images.length < 2) return
    let cancelled = false
    const prepare = async () => {
      if (remaining.current.length === 0) {
        remaining.current = _.shuffle(images.map((_, candidate) => candidate))
        const last = remaining.current.length - 1
        if (remaining.current[last] === index) {
          // Start the new stack with a different portrait from the previous one.
          const swap = Math.floor(Math.random() * last)
          ;[remaining.current[last], remaining.current[swap]] = [
            remaining.current[swap],
            remaining.current[last]
          ]
        }
      }
      while (remaining.current.length > 0) {
        if (cancelled) return null
        const candidate = remaining.current.pop()!
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
          src={images[index ?? 0].src}
          srcSet={images[index ?? 0].srcSet}
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
