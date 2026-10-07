Browser tests use the running Astro site, Google Chrome, and
Playwright's WebKit and Firefox browsers. Install the latter once:

```sh
npx playwright install webkit firefox
npm run astro:dev
# In another terminal:
npm test
```

Set `CAROUSEL_BASE_URL` to test another server. The suite covers desktop Chrome
and mobile widths in Chrome, WebKit, and Firefox: arrows, keyboard controls,
desktop pagination, mouse dragging, Chrome touch swipes, and mobile touch taps.
It checks multiple complete laps in both directions, reversing direction, and
mobile track height matching the selected quote. Quick interrupted swipes and
lost pointer capture must also return to an exact slide boundary. Transitions are checked as soon
as they settle so tests catch interactions before the delayed loop reset.

Image tests cover source selection on the homepage and subpages, source resolution
limits, retina phones, loading priorities, and blog image alignment. Run just these
checks with `npm test -- responsive-images`.
