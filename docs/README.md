# ReactUnity documentation site

The source of [reactunity.github.io](https://reactunity.github.io) — the ReactUnity
documentation, guides and live samples.

It began as a fork of the [react.dev](https://github.com/reactjs/react.dev) site, so the
authoring conventions, MDX component set and directory shape are React's. Prose lives in
`src/content`. The site itself is [Astro](https://astro.build): pages are rendered to HTML
at build time, and only the handful of components that need to run in the browser ship
JavaScript.

## Running locally

From the repository root:

```bash
pnpm install
```

Then, from this directory:

```bash
pnpm start
```

That serves the site at http://localhost:4321 with content hot-reloading.

## How a page is built

- `src/content/**/*.mdx` — one file per page. `src/content.config.ts` declares the
  collection; `src/pages/[...slug].astro` turns each entry into a route and supplies the
  map from element names (`p`, `h2`, `Sandpack`, …) to components in
  `src/components/MDX`.
- The sidebar, breadcrumbs, page titles and previous/next links all come from
  `src/sidebarLearn.json` and `src/sidebarReference.json`, not from frontmatter. A new
  page has to be listed there to appear in navigation.
- Headings carry explicit ids (`## Title {/*title*/}`) so that links survive edits to the
  heading text. `plugins/remark-header-custom-ids.js` applies them.
- `<Sandpack>` is the live editor. Its code fences are lifted into a serialized file map
  at build time by `plugins/remark-sandpack-files.js`, and the editor hydrates when it
  scrolls into view. Previews run inside a single shared Unity WebGL player
  (`src/components/unity/global.tsx`) that moves between examples.
- Plain code fences are highlighted by Shiki using the same palette as that editor —
  see `plugins/shiki-theme.js`.

## Checks

There is no type-check command: `astro check` cannot run on TypeScript 7, which this
folder now uses, so it was removed (see the `//check` note in package.json). `astro build`
is what catches breakage. `pnpm prettier` formats; `pnpm ci-check` is the non-mutating
combination of Prettier and the heading linter. This
folder keeps its own Prettier setup and is excluded from the repository's Biome config —
don't reformat it with Biome.

Heading anchors are linted separately, since links across the site depend on them:

```bash
pnpm lint-heading-ids
```

`pnpm fix-headings` rewrites them in place.

## Deployment

Pushes to `main` that touch `docs/**` build the site and push the output to the
`gh-pages` branch of
[ReactUnity/reactunity.github.io](https://github.com/ReactUnity/reactunity.github.io),
which is a deploy target only — GitHub Pages derives the `reactunity.github.io` URL from
that repository's name, so the built site has to live there while the source lives here.

The deploy step is skipped when the `DOCS_DEPLOY_TOKEN` secret is not set; the build
still runs, so the workflow stays useful as a compile check.

The Unity WebGL demos load `https://reactunity.github.io/Unity/<sample>/Build/WebInjectable.*`.
Those artifacts are hand-built, over 100 MB, and nothing in this repository produces them,
so they are not tracked here — they live permanently under `Unity/` on the `gh-pages`
branch, and the deploy is configured not to wipe them. The URL is absolute rather than
site-relative precisely because they are never present locally: a dev server would
otherwise have no player at all.

The three Optimistic Display fonts are licensed to Meta rather than to this project, so
they are not committed either; `scripts/downloadFonts.js` fetches them before the build
and skips any that are already present.

## Contributing

[CONTRIBUTING.md](CONTRIBUTING.md) carries React's guidance on tone and structure per
section, inherited from the upstream site and still worth reading before writing more
than a few sentences. Documentation coverage is the weakest part of ReactUnity, so
additions are especially welcome.

## License

Content in this folder is [CC-BY-4.0](LICENSE.md). It builds on the React documentation
site; see the [acknowledgements](https://react.dev/community/acknowledgements) for
everyone who helped create the original.
