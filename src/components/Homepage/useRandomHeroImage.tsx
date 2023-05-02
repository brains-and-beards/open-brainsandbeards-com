import { StaticImage } from 'gatsby-plugin-image'
import React, { useMemo } from 'react'

const heroImages = [
  <StaticImage
    src="../../assets/illustrations/hero-bicycle.png"
    className={'hero-image heroBicycle'}
    objectFit="contain"
    alt="Hero image"
    placeholder="blurred"
    width={710}
    key="bicycle"
  />,
  <StaticImage
    src="../../assets/illustrations/hero-jogin.png"
    className={'hero-image heroJogin'}
    objectFit="contain"
    alt="Hero image"
    placeholder="blurred"
    width={740}
    key="jogin"
  />,
  <StaticImage
    src="../../assets/illustrations/hero-skateboard.png"
    className={'hero-image heroSkateboard'}
    objectFit="contain"
    alt="Hero image"
    placeholder="blurred"
    width={710}
    key="skateboard"
  />
]

const mobileHeroImages = [
  <StaticImage
    src="../../assets/illustrations/hero-bicycle.png"
    className={'hero-image mobile-only'}
    alt="Hero image"
    placeholder="blurred"
    height={510}
    key="bicycle"
  />,
  <StaticImage
    src="../../assets/illustrations/hero-jogin.png"
    className={'hero-image mobile-only'}
    alt="Hero image"
    placeholder="blurred"
    height={510}
    key="jogin"
  />,
  <StaticImage
    src="../../assets/illustrations/hero-skateboard.png"
    className={'hero-image mobile-only'}
    alt="Hero image"
    placeholder="blurred"
    height={510}
    key="skateboard"
  />
]

const useRandomHeroImage = () => {
  const heroImage = useMemo(() => {
    const index = Math.floor(Math.random() * heroImages.length)
    return [heroImages[index], mobileHeroImages[index]]
  }, [])

  return heroImage
}

export default useRandomHeroImage
