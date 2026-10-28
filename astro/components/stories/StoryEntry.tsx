import React, { useEffect, useRef } from 'react'

import { type Story, storyDate } from '../../lib/stories'

interface Props {
  story: Story
  initiallyOpen: boolean
  children: React.ReactNode
}

const StoryEntry = ({ story, initiallyOpen, children }: Props) => {
  const detailsRef = useRef<HTMLDetailsElement>(null)
  const animationRef = useRef<Animation | null>(null)
  const expandedRef = useRef(initiallyOpen)

  useEffect(() => () => animationRef.current?.cancel(), [])

  const toggle = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault()
    const details = detailsRef.current
    if (!details) return

    const expanded = !expandedRef.current
    expandedRef.current = expanded
    const startHeight = details.getBoundingClientRect().height
    animationRef.current?.cancel()
    animationRef.current = null
    details.style.height = ''
    details.style.overflow = ''

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      details.open = expanded
      return
    }

    // Keep the body visible until a closing animation finishes.
    details.open = true
    const fullHeight = details.getBoundingClientRect().height
    const summary = details.querySelector('summary')!
    const closedHeight =
      summary.getBoundingClientRect().height + details.offsetHeight - details.clientHeight
    details.style.height = `${startHeight}px`
    details.style.overflow = 'hidden'

    const animation = details.animate(
      [{ height: `${startHeight}px` }, { height: `${expanded ? fullHeight : closedHeight}px` }],
      { duration: 300, easing: 'ease-in-out', fill: 'forwards' }
    )
    animationRef.current = animation
    animation.onfinish = () => {
      details.open = expanded
      details.style.height = ''
      details.style.overflow = ''
      animation.cancel()
      animationRef.current = null
    }
  }

  return (
    <details
      className="stories-entry"
      id={`archive-${story.id}`}
      open={initiallyOpen}
      ref={detailsRef}
    >
      <summary onClick={toggle}>
        <time dateTime={story.date}>
          {storyDate(story.date, { day: '2-digit', month: 'short' })}
        </time>
        <span className="stories-entry-title">
          <span className="stories-entry-title-text">{story.title}</span>
        </span>
        <span className="stories-expand" aria-hidden="true" />
      </summary>
      <div className="stories-entry-body stories-body">
        {story.author && <p className="stories-author">{story.author}</p>}
        {children}
      </div>
    </details>
  )
}

export default StoryEntry
