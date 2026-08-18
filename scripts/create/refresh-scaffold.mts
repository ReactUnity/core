// Regenerates the prebuilt JS bundle under the @reactunity/create scaffold's
// Assets/Resources/react, which nothing else keeps current.
//
// It had rotted badly: still React 18.2 from a commit dated April 2024, against an app
// declaring React 19. Nothing in the repo could catch that -- it is generated output that
// nobody regenerates, and it is what a user sees on first open, before they ever run a build.
//
// Two things deliberately NOT done here:
//
//   - The version pins. syncUnityVersions in scripts/tegami.mts carries the released version
//     into the Unity manifest and the app's package.json at release time.
//   - ProjectVersion.txt. Rewriting it would only claim an upgrade: Unity performs one by
//     opening the project, re-serializing assets and resolving the manifest against the new
//     Editor. Writing the string alone leaves 2023.2-era assets under a 6000.5 label. The
//     drift is reported below so it does not go unnoticed, and fixed by hand in the Editor.
//
// The verification at the end is the point of the script rather than an afterthought. Unity
// identifies an asset by its .meta sibling, so a build that emits a file the scaffold has no
// .meta for -- a sourcemap, a hashed chunk, a second entrypoint -- puts a file into a user's
// project that Unity re-imports under a fresh GUID, and leaves an orphan .meta behind for
// anything that stopped being emitted. That has to fail here, not in a user's Editor.
import { execSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { parseArgs } from 'node:util';

const repoRoot = path.resolve(import.meta.dirname, '..', '..');
const scaffoldDir = path.join(repoRoot, 'packages', 'create', 'scaffold');
const appDir = path.join(scaffoldDir, 'react');
const bundleDir = path.join(scaffoldDir, 'Assets', 'Resources', 'react');

/** The scaffold should open on the Editor ReactUnity is actually developed and manually
 *  tested against, so the sample is what it is compared to -- not "latest", which would
 *  raise the floor for users every time Unity ships a patch. */
const EDITOR_VERSION_SOURCE = path.join(repoRoot, 'kitchen-sink', 'ProjectSettings', 'ProjectVersion.txt');

type Step = { file: string; note: string };
const steps: Step[] = [];
const record = (file: string, note: string) => steps.push({ file, note });

/** Set by --check: report what would change and exit non-zero, writing nothing. */
let checkOnly = false;
const drifted: string[] = [];

async function main() {
  const { values } = parseArgs({
    options: {
      check: { type: 'boolean', default: false },
    },
  });
  checkOnly = values.check;

  rebuildBundle();
  const editorNotice = compareEditorVersion();

  console.log(`${checkOnly ? 'Checked' : 'Refreshed'} the @reactunity/create scaffold bundle\n`);
  for (const step of steps) console.log(`  ${step.file.padEnd(42)} ${step.note}`);
  if (editorNotice) console.log(`\n${editorNotice}`);

  if (checkOnly && drifted.length > 0) {
    console.error(`\n${drifted.length} file(s) are out of date. Run without --check to regenerate:`);
    for (const file of drifted) console.error(`  ${file}`);
    process.exitCode = 1;
    return;
  }
  console.log(checkOnly ? '\n  -> bundle up to date' : `\n  -> ${rel(bundleDir)}`);
}

/**
 * Built from a copy rather than in place. The app is deliberately outside the pnpm workspace
 * (pnpm-workspace.yaml), so building it here would drop a node_modules and a rewritten lock
 * into the scaffold that ships to users. A copy also resolves the dependency ranges fresh,
 * which is what a user gets -- the CLI runs `ncu -u` before they ever install.
 */
function rebuildBundle() {
  const workDir = fs.mkdtempSync(path.join(os.tmpdir(), 'reactunity-scaffold-'));
  try {
    fs.cpSync(appDir, path.join(workDir, 'react'), { recursive: true, filter: (src) => !src.includes(`${path.sep}node_modules`) });
    const cwd = path.join(workDir, 'react');

    npm('install --no-audit --no-fund', cwd);
    npm('run build', cwd);

    // BUILD_PATH in the app's .env puts the output a level up, mirroring the scaffold layout.
    const built = path.join(workDir, 'Assets', 'Resources', 'react');
    if (!fs.existsSync(built)) throw new Error('the build produced no Assets/Resources/react -- has BUILD_PATH in react/.env changed?');

    verifyEmittedSet(built);
    for (const name of fs.readdirSync(built).sort()) {
      const next = fs.readFileSync(path.join(built, name));
      const target = path.join(bundleDir, name);
      const current = fs.existsSync(target) ? fs.readFileSync(target) : null;
      if (current?.equals(next)) {
        record(`Assets/Resources/react/${name}`, `unchanged (${kb(next.length)})`);
        continue;
      }
      write(target, next, `Assets/Resources/react/${name}`, `${kb(current?.length ?? 0)} -> ${kb(next.length)}`);
    }
  } finally {
    fs.rmSync(workDir, { recursive: true, force: true });
  }
}

/**
 * The emitted files must be exactly the assets the scaffold already tracks a .meta for.
 * Anything else means the build config changed under us, and shipping it would put
 * unimported files into a user's project.
 */
function verifyEmittedSet(built: string) {
  const emitted = fs.readdirSync(built).sort();
  const tracked = fs
    .readdirSync(bundleDir)
    .filter((name) => !name.endsWith('.meta'))
    .sort();

  const added = emitted.filter((name) => !tracked.includes(name));
  const removed = tracked.filter((name) => !emitted.includes(name));
  if (added.length > 0 || removed.length > 0) {
    throw new Error(
      [
        'the build no longer emits the tracked asset set:',
        ...added.map((name) => `  + ${name} has no committed .meta -- add one, or stop emitting it`),
        ...removed.map((name) => `  - ${name} is no longer emitted -- delete it and its .meta`),
      ].join('\n'),
    );
  }

  for (const name of emitted) {
    if (!fs.existsSync(path.join(bundleDir, `${name}.meta`))) throw new Error(`${name} has no committed .meta sibling`);
  }
}

/** Reported, never written, and never fatal -- the fix is a human opening the project in the
 *  Editor and committing what Unity rewrites. Returns a notice, or null when they agree. */
function compareEditorVersion(): string | null {
  const read = (file: string) => /m_EditorVersion:\s*(\S+)/.exec(fs.readFileSync(file, 'utf8'))?.[1];
  const sample = read(EDITOR_VERSION_SOURCE);
  const scaffold = read(path.join(scaffoldDir, 'ProjectSettings', 'ProjectVersion.txt'));
  if (!sample || !scaffold) throw new Error('could not read m_EditorVersion from both ProjectVersion.txt files');
  if (sample === scaffold) return null;

  return [
    `  note: the scaffold is on Unity ${scaffold}, kitchen-sink is on ${sample}.`,
    '        Open packages/create/scaffold in that Editor and commit what it rewrites --',
    '        editing ProjectVersion.txt alone labels the project upgraded without upgrading it.',
    '        Expect ProjectSettings/ and Packages/packages-lock.json to churn with it; only',
    '        Packages/manifest.json reaches users, the rest is tracked for this checkout.',
  ].join('\n');
}

/** npm is npm.cmd on Windows, which Node 20.12 stopped spawning directly (CVE-2024-27980), so
 *  it has to go through a shell. Passed as one string rather than an argv array: with a shell,
 *  an array is concatenated unescaped and Node deprecates it (DEP0190). Every argument here is
 *  a bare literal, and cwd travels as an option rather than as part of the command. */
function npm(command: string, cwd: string) {
  execSync(`npm ${command}`, { cwd, stdio: 'inherit' });
}

function write(target: string, content: string | Uint8Array, label: string, note: string) {
  if (checkOnly) {
    drifted.push(label);
    record(label, `STALE -- ${note}`);
    return;
  }
  fs.writeFileSync(target, content);
  record(label, note);
}

const kb = (bytes: number) => `${Math.round(bytes / 1024)} kB`;
const rel = (target: string) => path.relative(repoRoot, target).replaceAll('\\', '/') || '.';

await main();
