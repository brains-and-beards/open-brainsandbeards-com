import { getCollection } from 'astro:content'

export const getStories = async () =>
  (await getCollection('stories')).sort(
    (left, right) =>
      right.data.date.localeCompare(left.data.date) || left.id.localeCompare(right.id)
  )
