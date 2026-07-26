// Tegami versioning + publishing config. Run via `pnpm tegami`.
//
// Lives in scripts/ per Tegami's own convention. Note this is unrelated to
// packages/scripts (@reactunity/scripts) despite the adjacent name.
import fs from 'node:fs/promises';
import path from 'node:path';
import { type TegamiPlugin, tegami } from 'tegami';
import { createCli } from 'tegami/cli';
import { github } from 'tegami/plugins/github';

// The four Unity (UPM) packages. They are deliberately NOT pnpm workspace
// members: their package.json files are UPM manifests whose `dependencies` are
// Unity package names, so a `packages/*` glob handing one to pnpm would send it
// looking for com.unity.editorcoroutines on the npm registry.
//
// That keeps them outside Tegami's graph, so nothing would bump them. This plugin
// closes the gap: after the npm plugin writes the bumped versions, copy the shared
// group version across to the UPM manifests so all eight stay on one number.
const UNITY_PACKAGES = ['core', 'jint', 'quickjs', 'clearscript'];

// Any group member works as the source - syncBump guarantees they all move
// together and land on the same version.
const VERSION_SOURCE = 'npm:@reactunity/renderer';

const syncUnityVersions: TegamiPlugin = {
  name: 'reactunity:sync-unity-versions',
  // 'post' matters: the npm plugin sets pkg.manifest.version in its own
  // applyDraft, and plugin hooks run in order within a single apply(). Running
  // after it means the graph already holds the bumped version, so we read it
  // rather than re-deriving it with bumpVersion() (which would double-count).
  enforce: 'post',
  async applyDraft() {
    const version = this.graph.get(VERSION_SOURCE)?.version;
    if (!version) return;

    for (const name of UNITY_PACKAGES) {
      const file = path.resolve(process.cwd(), 'unity', name, 'package.json');
      const raw = await fs.readFile(file, 'utf8');
      // Surgical, not a JSON round-trip: these manifests are hand-maintained and
      // re-serializing would reformat unrelated lines.
      const next = raw.replace(/("version"\s*:\s*")[^"]*(")/, `$1${version}$2`);
      if (next === raw) continue;
      await fs.writeFile(file, next);
      console.log(`[tegami] unity/${name} -> ${version}`);
    }
  },
};

const paper = tegami({
  // Private packages, excluded from the version graph entirely. Tegami versions
  // private packages by default, but versioning these would only produce
  // changelog and version churn on things nobody consumes: the docs site, the
  // Unity sample app, and the three React apps embedded in the core Unity
  // package (all pinned at 0.0.1).
  //
  // They depend on the publishable packages via `workspace:*`, which pnpm
  // resolves locally regardless of the graph, so excluding them is safe.
  ignore: [
    'react-website', // docs/
    'reactunity-sample', // full-sample/react/
    '@reactunity/devtools', // unity/core/.react/devtools
    '@reactunity/injectable', // unity/core/.react/injectable
    '@reactunity/quick-start', // unity/core/.react/quick-start
  ],

  // All four npm packages share one version. syncBump equalizes the bump *type*,
  // not the version string, so it only holds packages together if they already
  // share a version -- which they now do, all aligned at 0.22.0. Every release
  // moves all four together, and syncGitTag collapses what would otherwise be
  // four identical release tags into one.
  groups: { reactunity: { syncBump: true, syncGitTag: true } },
  packages: (pkg) => (pkg.manifest.private ? undefined : { group: 'reactunity' }),

  npm: {
    // Tegami runs `pnpm publish --no-git-checks` with this client. Switching to
    // 'npm' routes publishing through `npm publish` instead - the escape hatch
    // if pnpm's OIDC support ever regresses again (see README).
    client: 'pnpm',

    // Never bump a private package just because a dependency moved.
    //
    // `ignore` above cannot do this. It deletes from Tegami's own graph, but the
    // npm plugin keeps a separate graph and the dependents policy runs on that,
    // so the five private packages were bumping 0.0.1 -> 0.0.2 on every release
    // that touched anything they depend on. `bumpDep` returning false is the
    // documented veto (`if (bumpType === false) continue`).
    //
    // For anything else, reproduce Tegami's default: a broken range in
    // dependencies/optionalDependencies is a patch, devDependencies never bump,
    // and a broken peer range is a major.
    bumpDep: ({ dependent, kind }) => {
      if (dependent.manifest.private) return false;
      switch (kind) {
        case 'dependencies':
        case 'optionalDependencies':
          return 'patch';
        case 'peerDependencies':
          return 'major';
        default:
          return false;
      }
    },
  },

  plugins: [
    github({
      repo: 'ReactUnity/core',
      versionPr: {
        base: 'main',
        // Now that every package shares a version there IS a single release
        // version, so put it in the PR title. Must be a method, not an arrow, so
        // `this` binds to the TegamiContext. `create` runs after the draft is
        // applied, so read the bumped version off the graph -- do NOT re-bump
        // with bumpVersion(), which would title the PR one release ahead.
        create() {
          const version = this.graph.get(VERSION_SOURCE)?.version;
          return { title: version ? `chore: release v${version}` : 'chore: release' };
        },
      },
    }),
    syncUnityVersions,
  ],
});

void createCli(paper).parseAsync();
