import React, { useEffect, useRef, useState } from 'react'
import './TestimonialsCarousel.scss'

export interface Testimonial {
  id: string
  quote: string
  name: string
  position: string
  company: string
  image?: { src: string; srcSet: string }
  imageAlt?: string
}

interface Props {
  label: string
  items: Testimonial[]
}

export default function TestimonialsCarousel({ label, items }: Props) {
  const trackRef = useRef<HTMLDivElement>(null)
  const drag = useRef<{ x: number; left: number } | null>(null)
  const resetTimer = useRef<ReturnType<typeof setTimeout>>()
  const dragTimer = useRef<ReturnType<typeof setTimeout>>()
  const currentIndex = useRef(0)
  const [activeIndex, setActiveIndex] = useState(0)
  const [loop, setLoop] = useState(false)
  const [dragging, setDragging] = useState(false)
  const offset = loop ? 1 : 0

  const physicalIndex = () => {
    const track = trackRef.current
    return track?.clientWidth ? Math.round(track.scrollLeft / track.clientWidth) : offset
  }
  const scrollToSlide = (index: number, behavior: ScrollBehavior = 'smooth') => {
    const track = trackRef.current
    if (track) track.scrollTo({ left: index * track.clientWidth, behavior })
  }
  const normalizeLoopPosition = () => {
    const index = physicalIndex()
    if (!loop) return index
    const normalized = index === 0 ? items.length : index === items.length + 1 ? 1 : index
    if (normalized !== index) scrollToSlide(normalized, 'instant')
    return normalized
  }
  const scheduleReset = () => {
    clearTimeout(resetTimer.current)
    if (!loop) return
    resetTimer.current = setTimeout(() => {
      if (!drag.current) normalizeLoopPosition()
    }, 400)
  }
  const move = (direction: number) => {
    // A new interaction can arrive before the delayed clone reset.
    // Start it from the matching original so neither end becomes a dead end.
    clearTimeout(resetTimer.current)
    scrollToSlide(normalizeLoopPosition() + direction)
    scheduleReset()
  }

  useEffect(() => {
    setLoop(items.length > 1)
  }, [items.length])

  useEffect(() => {
    const track = trackRef.current
    const slide = track?.children[activeIndex + offset] as HTMLElement | undefined
    if (!track || !slide) return
    // Size the viewport, not the slides: zero-height slides are unreliable
    // scroll-snap targets in Firefox. Observe fonts, images and width changes.
    const updateHeight = () => {
      track.style.setProperty('--active-slide-height', `${slide.offsetHeight}px`)
    }
    updateHeight()
    const observer = new ResizeObserver(updateHeight)
    observer.observe(slide)
    return () => observer.disconnect()
  }, [activeIndex, offset, items.length])

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    // Add loop slides only after hydration, keeping Marc first in the static HTML.
    track.scrollTo({ left: (currentIndex.current + offset) * track.clientWidth, behavior: 'auto' })
    let width = track.clientWidth
    const observer = new ResizeObserver(() => {
      // Mobile quote height changes should not interrupt horizontal animation.
      if (track.clientWidth === width) return
      width = track.clientWidth
      track.scrollTo({
        left: (currentIndex.current + offset) * track.clientWidth,
        behavior: 'auto'
      })
    })
    observer.observe(track)
    return () => {
      observer.disconnect()
      clearTimeout(resetTimer.current)
      clearTimeout(dragTimer.current)
    }
  }, [offset])

  const finishDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!drag.current) return
    drag.current = null
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId)
    }
    scrollToSlide(physicalIndex())
    scheduleReset()
    clearTimeout(dragTimer.current)
    dragTimer.current = setTimeout(() => setDragging(false), 350)
  }

  const renderSlide = (item: Testimonial, clone?: string) => (
    <article
      key={clone ?? item.id}
      className="astro-carousel__slide"
      data-active={item.id === items[activeIndex]?.id ? '' : undefined}
      id={clone ? undefined : item.id}
      aria-hidden={clone ? true : undefined}
      aria-roledescription="slide"
      aria-label={`${item.name}, ${item.company}`}
    >
      <div className="astro-carousel__photo">
        <button
          className="astro-carousel__chevron astro-carousel__chevron--previous"
          type="button"
          aria-label="Previous reference"
          tabIndex={clone ? -1 : undefined}
          onClick={() => move(-1)}
        >
          <svg aria-hidden="true" viewBox="0 0 14 24">
            <path d="m13 0-12 12 12 12" />
          </svg>
        </button>
        {item.image && (
          <img
            className="astro-carousel__image"
            src={item.image.src}
            srcSet={item.image.srcSet}
            alt={item.imageAlt ?? ''}
            width={152}
            height={152}
            loading="lazy"
            decoding="async"
            draggable={false}
          />
        )}
        <button
          className="astro-carousel__chevron"
          type="button"
          aria-label="Next reference"
          tabIndex={clone ? -1 : undefined}
          onClick={() => move(1)}
        >
          <svg aria-hidden="true" viewBox="0 0 14 24">
            <path d="m1 0 12 12-12 12" />
          </svg>
        </button>
      </div>
      <p className="quote">{item.quote}</p>
      <p className="who">
        <b>{item.name}</b>,<br />
        {item.position},<br />
        {item.company}
      </p>
    </article>
  )

  return (
    <section className="astro-carousel" aria-roledescription="carousel" aria-label={label}>
      <div
        ref={trackRef}
        className={`astro-carousel__track${dragging ? ' is-dragging' : ''}`}
        tabIndex={0}
        onScroll={() => {
          if (!items.length) return
          const index = (physicalIndex() - offset + items.length) % items.length
          currentIndex.current = index
          setActiveIndex(index)
          scheduleReset()
        }}
        onKeyDown={event => {
          if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return
          event.preventDefault()
          move(event.key === 'ArrowLeft' ? -1 : 1)
        }}
        onPointerDown={event => {
          if (event.button !== 0 || (event.target as HTMLElement).closest('button')) return
          clearTimeout(resetTimer.current)
          normalizeLoopPosition()
          clearTimeout(dragTimer.current)
          drag.current = { x: event.clientX, left: event.currentTarget.scrollLeft }
          setDragging(true)
          event.currentTarget.setPointerCapture(event.pointerId)
        }}
        onPointerMove={event => {
          if (!drag.current) return
          event.currentTarget.scrollLeft = drag.current.left - (event.clientX - drag.current.x)
          event.preventDefault()
        }}
        onPointerUp={finishDrag}
        onPointerCancel={finishDrag}
      >
        {loop && renderSlide(items[items.length - 1], 'last-clone')}
        {items.map(item => renderSlide(item))}
        {loop && renderSlide(items[0], 'first-clone')}
      </div>
      <div className="astro-carousel__pagination" aria-label={`${label} pagination`}>
        {items.map((item, index) => (
          <button
            key={item.id}
            type="button"
            className={`astro-carousel__dot${index === activeIndex ? ' is-active' : ''}`}
            aria-label={`Show reference from ${item.name}`}
            aria-controls={item.id}
            aria-current={index === activeIndex ? 'true' : undefined}
            onClick={() => scrollToSlide(index + offset)}
          />
        ))}
      </div>
    </section>
  )
}
