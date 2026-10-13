import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'

import './AnimatedNumber.scss'

interface Props {
  value: number
  duration?: number
}

const MAX_COUNT_STEPS = 20

const createCountUpValues = (finalValue: string): string[] => {
  const decimalPlaces = finalValue.split('.')[1]?.length ?? 0
  // Count in whole units of the smallest decimal place to avoid rounding drift.
  const scale = 10 ** decimalPlaces
  const targetUnits = Math.round(Number(finalValue) * scale)
  const stepCount = Math.min(MAX_COUNT_STEPS, targetUnits)
  if (stepCount <= 0 || !Number.isFinite(targetUnits)) return [finalValue]

  return Array.from({ length: stepCount + 1 }, (_, step) => {
    if (step === stepCount) return finalValue
    const units = Math.floor((targetUnits * step) / stepCount)
    return (units / scale).toFixed(decimalPlaces)
  })
}

const AnimatedNumber = ({ value, duration = 1500 }: Props) => {
  const viewportRef = useRef<HTMLSpanElement>(null)
  const trackRef = useRef<HTMLSpanElement>(null)
  const [countUpValues, setCountUpValues] = useState<string[] | null>(null)
  const finalValue = String(value)

  useEffect(() => {
    setCountUpValues(null)
    const viewport = viewportRef.current
    if (!viewport || !('IntersectionObserver' in window)) return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const observer = new IntersectionObserver(
      entries => {
        if (!entries.some(entry => entry.isIntersecting)) return
        observer.disconnect()
        if (reducedMotion.matches) return

        const values = createCountUpValues(finalValue)
        if (values.length > 1) setCountUpValues(values)
      },
      { threshold: 0.5 }
    )
    observer.observe(viewport)
    return () => observer.disconnect()
  }, [finalValue])

  useLayoutEffect(() => {
    const track = trackRef.current
    if (!track || !countUpValues) return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const restoreFinalValue = () => setCountUpValues(null)
    if (reducedMotion.matches) {
      restoreFinalValue()
      return
    }

    const travelPercent = (countUpValues.length - 1) * 100
    const animation = track.animate(
      [{ transform: 'translateY(0)' }, { transform: `translateY(-${travelPercent}%)` }],
      {
        duration,
        easing: 'cubic-bezier(0.15, 0.65, 0.25, 1)',
        fill: 'forwards'
      }
    )
    const onMotionChange = () => {
      if (reducedMotion.matches) restoreFinalValue()
    }
    animation.onfinish = restoreFinalValue
    reducedMotion.addEventListener('change', onMotionChange)

    return () => {
      animation.cancel()
      reducedMotion.removeEventListener('change', onMotionChange)
    }
  }, [countUpValues, duration])

  return (
    <span className="animated-number" data-animated-number={value} ref={viewportRef}>
      <span className="animated-number__accessible">{finalValue}</span>
      <span className="animated-number__sizer" aria-hidden="true">
        {finalValue}
      </span>
      <span className="animated-number__track" aria-hidden="true" ref={trackRef}>
        {(countUpValues ?? [finalValue]).map((row, index) => (
          <span key={index}>{row}</span>
        ))}
      </span>
    </span>
  )
}

export default AnimatedNumber
