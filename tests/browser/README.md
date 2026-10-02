Carousel browser tests use the running Astro site and Google Chrome.

```sh
npm run astro:dev
# In another terminal:
npm run test:carousel
```

Set `CAROUSEL_BASE_URL` to test another server. The suite covers desktop and
mobile arrows, keyboard controls, desktop pagination, mouse dragging, and touch
swipes, including multiple complete laps in both directions. Transitions are
checked as soon as they settle so tests catch interactions before the delayed
loop reset.
