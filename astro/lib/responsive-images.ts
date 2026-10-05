import type { LocalImageProps } from 'astro:assets'

export type LocalImage = Extract<LocalImageProps['src'], { width: number }>

// Closely spaced candidates keep downloads near the rendered width at 1x–3x.
// Each image only generates candidates it can use, without upscaling the source.
const candidateWidths = [
  72, 96, 120, 144, 160, 192, 224, 256, 280, 300, 320, 360, 400, 450, 480, 500, 504, 540, 560, 600,
  620, 640, 680, 710, 720, 740, 768, 800, 900, 960, 984, 1024, 1080, 1200, 1240, 1280, 1360, 1420,
  1480, 1536, 1600, 1800, 1920, 2048, 2400, 2560, 3072
]

interface ImagePreset {
  maxWidth: number
  sizes: (maxWidth: number) => string
}

const capped = (size: string, maxWidth: number) => `min(${size}, ${maxWidth}px)`

// These describe the existing CSS layouts; they do not change image styling.
// Keep their gutters and breakpoints in sync with the corresponding stylesheets.
export const imagePresets = {
  'home-hero-mobile': { maxWidth: 594, sizes: max => capped('calc(100vw - 48px)', max) },
  'home-hero': {
    maxWidth: 740,
    sizes: max => `(max-width: 1199px) min(60vw, calc(100vw - 400px), ${max}px), ${max}px`
  },
  'home-project': {
    maxWidth: 642,
    sizes: () => '(max-width: 690px) calc(100vw - 48px), (max-width: 1199px) 450px, 610px'
  },
  'project-card': {
    maxWidth: 680,
    sizes: max => `(max-width: 690px) calc(100vw - 48px), (max-width: 1199px) 450px, ${max - 10}px`
  },
  'service-project': {
    maxWidth: 680,
    sizes: max => `(max-width: 690px) ${capped('calc(100vw - 48px)', max)}, ${max}px`
  },
  'case-study-hero': {
    maxWidth: 1024,
    sizes: () => '(max-width: 690px) min(300px, 100vw), (max-width: 1199px) 500px, 1024px'
  },
  'case-study-inline': { maxWidth: 540, sizes: max => capped('calc(100vw - 40px)', max) },
  'case-study-phone': { maxWidth: 270, sizes: max => capped('calc(100vw - 40px)', max) },
  'case-study-outcome': {
    maxWidth: 600,
    sizes: max => `(max-width: 690px) ${capped('calc(100vw - 40px)', max)}, ${capped('65vw', max)}`
  },
  'page-header': {
    maxWidth: 504,
    sizes: max =>
      `(max-width: 690px) calc(80vw - 40px), (max-width: 1199px) min(calc(60vw - 40px), ${max}px), ${max}px`
  },
  team: {
    maxWidth: 280,
    sizes: max => `(max-width: 690px) min(calc(70vw - 33.6px), ${max}px), ${max}px`
  },
  'blog-hero': {
    maxWidth: 1024,
    sizes: () => 'min(calc(100vw - 40px), 984px)'
  },
  'blog-card': {
    maxWidth: 600,
    sizes: () =>
      '(max-width: 690px) calc(100vw - 128px), (max-width: 1199px) calc(50vw - 30px), 280px'
  },
  'blog-list-card': {
    maxWidth: 974,
    sizes: () =>
      '(max-width: 690px) calc(100vw - 130px), (max-width: 1199px) min(calc(100vw - 50px), 974px), 280px'
  },
  'blog-featured': {
    maxWidth: 757,
    sizes: () => '(max-width: 1199px) min(calc(50vw - 20px), 492px), 757px'
  },
  article: {
    maxWidth: 1600,
    sizes: max =>
      `(max-width: 690px) ${capped('calc(100vw - 48px)', max)}, (max-width: 1199px) ${capped('calc(100vw - 60px)', max)}, ${capped('calc(65vw - 60px)', max)}`
  },
  callout: { maxWidth: 400, sizes: () => '(max-width: 690px) 226px, 400px' },
  speaker: { maxWidth: 375, sizes: max => capped('calc(100vw - 48px)', max) },
  'team-illustration': { maxWidth: 300, sizes: max => capped('calc(100vw - 48px)', max) }
} satisfies Record<string, ImagePreset>

export type ResponsiveImagePreset = keyof typeof imagePresets

interface Options {
  maxWidth?: number
  sizes?: string
}

export function responsiveImageProps(
  image: Pick<LocalImage, 'width'>,
  preset: ResponsiveImagePreset,
  { maxWidth, sizes }: Options = {}
) {
  const definition = imagePresets[preset]
  const displayWidth = maxWidth ?? definition.maxWidth
  const pixelLimit = Math.min(image.width, Math.ceil(displayWidth * 3))
  const widths = [
    ...new Set([
      ...candidateWidths.filter(width => width <= pixelLimit),
      ...[1, 2, 3].map(density => Math.min(pixelLimit, Math.round(displayWidth * density)))
    ])
  ].sort((a, b) => a - b)

  return { widths, sizes: sizes ?? definition.sizes(displayWidth) }
}
