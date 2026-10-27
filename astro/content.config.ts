import { glob } from 'astro/loaders'
import { defineCollection } from 'astro:content'
import { z } from 'astro/zod'

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

export const collections = { blog }
