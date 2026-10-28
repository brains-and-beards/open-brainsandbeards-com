import type { CollectionEntry } from 'astro:content'

export type Story = CollectionEntry<'stories'>['data'] & { id: string }

export const storiesPerPage = 10

export const storyDate = (date: string, options: Intl.DateTimeFormatOptions) =>
  new Date(`${date}T12:00:00Z`).toLocaleDateString('en-GB', {
    ...options,
    timeZone: 'UTC'
  })
