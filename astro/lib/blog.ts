import { getCollection } from 'astro:content'

export const getBlogPosts = async () =>
  (await getCollection('blog'))
    .filter(post => post.data.date)
    .sort((left, right) => right.data.date.getTime() - left.data.date.getTime())

export const formatBlogDate = (date: Date) =>
  new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: '2-digit',
    year: 'numeric'
  }).format(date)
