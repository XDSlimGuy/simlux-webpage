# Simlux Demo Video

This Remotion project contains a demo video for Simlux with two scenes:

- `OfficeLedLookaround`: a 10-second office lookaround focused on decorative LED lighting, linear profiles, wall accents, and product callouts.
- `ProductCarouselScene`: an 8-second product image carousel that swipes left, slows down, zooms into one LED product, and stops on the selected image.
- `SimluxDemoVideo`: the combined 18-second demo sequence.

## Commands

```console
npm run dev
```

Opens Remotion Studio for previewing `OfficeLedLookaround`.

```console
npm run render
```

Renders the combined demo to `out/simlux-demo-video.mp4`.

```console
npm run render:carousel
```

Renders only the scrolling product carousel scene.

```console
npm run lint
```

Runs ESLint and TypeScript checks.
