export interface Story {
  id: string
  date: string
  title: string
  author?: string
  paragraphs?: string[]
}

export const storiesPerPage = 10

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
    id: 'test-10',
    date: '2026-09-21',
    title: 'Test story #10'
  },
  {
    id: 'test-9',
    date: '2026-08-20',
    title: 'Test story #9'
  },
  {
    id: 'test-8',
    date: '2026-08-19',
    title: 'Test story #8'
  },
  {
    id: 'test-7',
    date: '2026-08-15',
    title: 'Test story #7'
  },
  {
    id: 'test-6',
    date: '2026-07-05',
    title: 'Test story #6'
  },
  {
    id: 'test-5',
    date: '2026-07-04',
    title: 'Test story #5'
  },
  {
    id: 'test-4',
    date: '2026-07-04',
    title: 'Test story #4'
  },
  {
    id: 'test-3',
    date: '2026-07-03',
    title: 'Test story #3'
  },
  {
    id: 'test-2',
    date: '2026-07-02',
    title: 'Test story #2'
  },
  {
    id: 'test-1',
    date: '2026-07-01',
    title: 'Test story #1'
  }
]

export const storyDate = (date: string, options: Intl.DateTimeFormatOptions) =>
  new Date(`${date}T12:00:00Z`).toLocaleDateString('en-GB', {
    ...options,
    timeZone: 'UTC'
  })
