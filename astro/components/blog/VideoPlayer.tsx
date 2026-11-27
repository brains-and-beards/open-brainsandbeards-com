import React, { useEffect, useRef } from 'react'

interface Props {
  src: string
  label: string
  autoplay: boolean
  loop: boolean
}

export default function VideoPlayer({ src, label, autoplay, loop }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video || !autoplay || !('IntersectionObserver' in window)) return

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        // Keep the controls available if the browser blocks automatic playback.
        video.play().catch(() => {})
      } else {
        video.pause()
      }
    })

    observer.observe(video)
    return () => {
      observer.disconnect()
      video.pause()
    }
  }, [src, autoplay])

  return (
    <video
      ref={videoRef}
      src={src}
      controls
      loop={loop}
      muted
      playsInline
      preload="metadata"
      aria-label={label}
    />
  )
}
