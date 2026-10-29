import { glob } from 'astro/loaders'
import { z } from 'astro/zod'
import { defineCollection } from 'astro:content'

const blog = defineCollection({
  loader: glob({ base: './astro/content/blog', pattern: '**/index.mdx' }),
  schema: ({ image }) =>
    z.object({
      path: z.string(),
      date: z.coerce.date(),
      title: z.string(),
      image: image().optional(),
      author: z.string().optional(),
      imageCaption: z.string().optional()
    })
})

const stories = defineCollection({
  loader: glob({ base: './astro/content/stories', pattern: '**/index.mdx' }),
  schema: z.object({
    date: z.iso.date(),
    title: z.string(),
    author: z.string().optional()
  })
})

export const collections = { blog, stories }
