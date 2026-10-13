export interface Story {
  id: string
  date: string
  title: string
  author?: string
  paragraphs?: string[]
}

// The archive titles and latest story are supplied by the Figma design.
// Add the remaining story bodies here when the editorial content is available.
export const stories: Story[] = [
  {
    id: 'the-feature-we-decided-not-to-build',
    date: '2026-10-09',
    title: 'The feature we decided not to build',
    author: 'Patryk Peszko',
    paragraphs: [
      'The most useful moment in a product workshop is sometimes the quiet one. Someone asks why a feature is needed, and nobody reaches for a ticket. We stop describing the screen and start talking about the problem.',
      'In this story, the answer was a short conversation with support and a clearer sentence in the app. No new flow. No extra settings. Just one less thing standing between a person and what they came to do.',
      'Good software takes work. Sometimes that work is deciding what to leave out.'
    ]
  },
  {
    id: 'an-app-that-gets-out-of-the-way',
    date: '2026-10-06',
    title: 'An app that gets out of the way'
  },
  {
    id: 'a-smaller-release-is-a-better-conversation',
    date: '2026-10-02',
    title: 'A smaller release is a better conversation'
  },
  {
    id: 'before-you-reach-for-another-tool',
    date: '2026-10-01',
    title: 'Before you reach for another tool'
  },
  {
    id: 'the-best-handover-starts-before-the-last-day',
    date: '2026-10-01',
    title: 'The best handover starts before the last day'
  },
  {
    id: 'boring-technology-interesting-problems',
    date: '2026-09-28',
    title: 'Boring technology, interesting problems'
  },
  {
    id: 'make-room-for-the-second-question',
    date: '2026-09-24',
    title: 'Make room for the second question'
  },
  {
    id: 'a-little-context-goes-a-long-way',
    date: '2026-09-21',
    title: 'A little context goes a long way'
  }
]

export const storyDate = (date: string, options: Intl.DateTimeFormatOptions) =>
  new Date(`${date}T12:00:00Z`).toLocaleDateString('en-GB', { ...options, timeZone: 'UTC' })
