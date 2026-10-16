import rss from '@astrojs/rss'

import { stories } from '../../lib/stories'

export function GET(context: { site?: URL }) {
  return rss({
    title: 'Brains & Beards · Stories',
    description: 'Short reads from a mobile studio.',
    site: context.site ?? 'https://brainsandbeards.com',
    items: stories
      .filter(story => story.paragraphs?.length)
      .map(story => ({
        title: story.title,
        pubDate: new Date(`${story.date}T12:00:00Z`),
        link: `/stories/#${story.id}`,
        description: story.paragraphs?.join('\n\n'),
        author: story.author
      }))
  })
}
