## @reactunity/create@0.23.2

### Refresh the scaffold's prebuilt bundle, and keep it refreshed

A scaffolded project renders `Assets/Resources/react/index.js` on first open, before the user has run a build. That bundle was webpack output from April 2024 carrying React 18.2, sitting in a project whose `package.json` asked for React 19. Nothing in the repo could catch it: generated output that nothing regenerates is invisible until someone scaffolds a project and looks at it.

`scripts/create/refresh-scaffold.mts` rebuilds it from the scaffold's own app, in a temp copy so the shipped template never gains a `node_modules`, and a nightly workflow opens a PR when the result moves. Because the rebuild resolves the app's dependency ranges fresh, it also catches breakage arriving from upstream rather than only from a ReactUnity release. `--check` reports drift without writing, for use as a gate.

It verifies that the build still emits exactly the asset set the scaffold has `.meta` files for. A sourcemap or a hashed chunk would otherwise land in a user's project unimported, and anything that stopped being emitted would leave an orphan `.meta` behind.

The scaffold project itself moved to Unity 6000.5.5f1, matching the sample ReactUnity is developed against. The script reports that drift but never writes it — Unity performs an Editor upgrade by opening the project and re-serializing it, so editing `ProjectVersion.txt` alone would label a project upgraded without upgrading it.

### Keep the scaffold's ReactUnity pins on the released version

A scaffolded project asked for `com.reactunity.core` 0.18.0, `com.reactunity.quickjs` 0.17.1 and `@reactunity/renderer` ^0.20.1 — the UPM pair untouched since April 2024. The scaffold sits outside the pnpm workspace on purpose, so nothing in the release ever bumped it.

The rot was hidden rather than harmless: the CLI repairs both at scaffold time, `openupm-cli add` for the Unity manifest and `ncu -u` for the React app. Both are best-effort network calls, and both were dead on Windows for months, which handed those users the checked-in numbers verbatim.

`syncUnityVersions` in `scripts/tegami.mts` now carries the released version into both files alongside the four UPM manifests, and throws if a pin it expects has been renamed away rather than leaving it silently frozen.

### Fix `npx @reactunity/create` failing to find its own scaffold

Every run ended at `Copying files failed` with `ENOENT ... dist/scaffold/react`. The scaffold ships at the package root, but the CLI resolves it relative to its own file — which stopped being the package root when tsdown moved the build output into `dist/`.

The entry point moved to `src/index.ts` so that source and bundle sit at the same depth, and the scaffold is now `../scaffold` from either. `.npmignore` still whitelisted the pre-tsdown `/index.js`; `dist/index.js` was only reaching the tarball because npm force-includes `bin`, so its sourcemap was being dropped.

The same run then failed at `spawn EINVAL` on Windows. Node 20.12 stopped spawning `.cmd` files directly (CVE-2024-27980), and `npx`, `npm` and `yarn` are all `.cmd` there — so the package update step, `--install` and `--unity`'s OpenUPM call were all dead. Those now go through a shell on Windows, with arguments quoted so a project path containing a space still works.
