Carousel browser tests use the running Astro site, Google Chrome, and
Playwright's WebKit and Firefox browsers. Install the latter once:

```sh
npx playwright install webkit firefox
npm run astro:dev
# In another terminal:
npm run test:carousel
```

Set `CAROUSEL_BASE_URL` to test another server. The suite covers desktop Chrome
and mobile widths in Chrome, WebKit, and Firefox: arrows, keyboard controls,
desktop pagination, mouse dragging, Chrome touch swipes, and mobile touch taps.
It checks multiple complete laps in both directions, reversing direction, and
mobile track height matching the selected quote. Transitions are checked as soon
as they settle so tests catch interactions before the delayed loop reset.
