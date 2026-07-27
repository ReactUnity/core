# ReactUnity documentation site

The source of [reactunity.github.io](https://reactunity.github.io) — the ReactUnity
documentation, guides and live samples.

It is a fork of the [react.dev](https://github.com/reactjs/react.dev) site, so the
authoring conventions, MDX component set and directory shape are React's. Prose lives in
`src/content`.

## Running locally

From the repository root:

```bash
pnpm install
```

Then, from this directory:

```bash
pnpm start
```

That serves the site at http://localhost:3000 with content hot-reloading.

> **Node 22 is required here**, not the Node 26 the rest of the repository pins. This is
> a Next 12.3 app, and Next 12 bundles a copy of `jsonwebtoken` that reaches for
> `require('buffer').SlowBuffer` — removed in Node 24, so on newer versions the build
> dies while collecting page data. `.github/workflows/docs.yml` installs on the pinned
> version and downgrades to 22 just for the build. Upgrading Next is the real fix, but
> it is a migration of its own: the app still uses `next export`, experimental config
> that newer versions reject, and a `patch-package` patch pinned to
> `next@12.3.2-canary.7`.

## Checks

```bash
pnpm check-all
```

Runs Prettier, ESLint with `--fix`, and `tsc --noEmit`. `pnpm ci-check` is the
non-mutating variant. This folder keeps its own Prettier and ESLint setup and is excluded
from the repository's Biome config — don't reformat it with Biome.

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

The Unity WebGL demos load `/Unity/<sample>/Build/WebInjectable.*`. Those artifacts are
hand-built, over 100 MB, and nothing in this repository produces them, so they are not
tracked here — they live permanently under `Unity/` on the `gh-pages` branch, and the
deploy is configured not to wipe them.

## Contributing

[CONTRIBUTING.md](CONTRIBUTING.md) carries React's guidance on tone and structure per
section, inherited from the upstream site and still worth reading before writing more
than a few sentences. Documentation coverage is the weakest part of ReactUnity, so
additions are especially welcome.

## License

Content in this folder is [CC-BY-4.0](LICENSE.md). It builds on the React documentation
site; see the [acknowledgements](https://react.dev/community/acknowledgements) for
everyone who helped create the original.
