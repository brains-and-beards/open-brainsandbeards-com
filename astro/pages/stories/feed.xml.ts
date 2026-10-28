import rss from '@astrojs/rss'

import { storiesPerPage } from '../../lib/stories'
import { getStories } from '../../lib/storyContent'

export async function GET(context: { site?: URL }) {
  const stories = await getStories()
  return rss({
    title: 'Brains & Beards · Stories',
    description: 'Short reads from a mobile studio.',
    site: context.site ?? 'https://brainsandbeards.com',
    items: stories
      .map((story, index) => ({ story, page: Math.floor(index / storiesPerPage) + 1 }))
      .filter(({ story }) => story.body?.trim())
      .map(({ story, page }) => ({
        title: story.data.title,
        pubDate: new Date(`${story.data.date}T12:00:00Z`),
        link:
          story.id === stories[0].id
            ? `/stories/#${story.id}`
            : `${page === 1 ? '/stories/' : `/stories/${page}/`}#archive-${story.id}`,
        description: story.body,
        author: story.data.author
      }))
  })
}
