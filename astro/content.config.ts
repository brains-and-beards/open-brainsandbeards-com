import { glob } from 'astro/loaders'
import { defineCollection, z } from 'astro:content'

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
