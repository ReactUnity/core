// Turns kitchen-sink/ into a project a user can clone, open, and press Play on.
//
// Inside the monorepo the project consumes the Unity packages as `file:../../unity/*` and
// the npm ones as `workspace:*`, so it always builds the working tree. Both forms are
// meaningless in a standalone clone: `file:` resolves to nothing and Unity silently opens a
// project with no ReactUnity in it. This rewrites them to published versions, drops the two
// script engines the sample does not need, strips the developer-only switches, and then
// checks that what it produced actually resolves.
//
// That last step is the point of the script rather than an afterthought. A manifest pinning
// a version the registry has not built yet fails the same way a `file:` ref does -- an empty
// Packages folder and a project full of compile errors -- so the failure has to happen here,
// where it reads as "0.24.0 is not on OpenUPM yet", instead of in a user's Editor.
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { parseArgs } from 'node:util';

const repoRoot = path.resolve(import.meta.dirname, '..', '..');
const sourceDir = path.join(repoRoot, 'kitchen-sink');
const templateDir = path.join(import.meta.dirname, 'template');

const OPENUPM = 'https://package.openupm.com';
const NPM = 'https://registry.npmjs.org';

/**
 * QuickJS is the recommended engine and the only one the sample needs. Jint and ClearScript
 * are dropped rather than shipped-and-unused: each is a native or IL2CPP-relevant payload,
 * and a sample manifest is also documentation of what a real project should install.
 * The README documents adding ClearScript back, which is what you want for a JS debugger.
 */
const DROPPED_UNITY_PACKAGES = ['com.reactunity.jint', 'com.reactunity.clearscript'];

/** Monorepo test plumbing. `testables` compiles the packages' own test assemblies into the
 *  project, which a user does not want and the perf framework only exists to serve. */
const DROPPED_UNITY_EXTRAS = ['com.unity.test-framework.performance'];

/** Only ever set in this checkout: it turns on the agent bridge, the snapshot-overwrite
 *  menu, and the TypeScript model generator. None of it belongs in a sample. */
const DEVELOPER_DEFINE = 'REACT_UNITY_DEVELOPER';

type Step = { file: string; note: string };
const steps: Step[] = [];
const record = (file: string, note: string) => steps.push({ file, note });

/** Every path the export contains, relative and POSIX-separated. */
const written = new Set<string>();

async function main() {
  const { positionals, values } = parseArgs({
    allowPositionals: true,
    options: {
      force: { type: 'boolean', default: false },
      // For offline runs and for publishing before the registries have caught up. The
      // workflow never passes it.
      'skip-registry-check': { type: 'boolean', default: false },
      // NUL-separated list of everything written, for `git add --pathspec-from-file`.
      // The workflow builds its index from this rather than from `add -A` over the
      // directory, so nothing that merely happens to be sitting there gets published.
      'file-list': { type: 'string' },
    },
  });

  const outDir = path.resolve(positionals[0] ?? path.join(repoRoot, 'Logs', 'kitchen-sink'));
  const version = readJson(path.join(repoRoot, 'unity', 'core', 'package.json')).version as string;

  if (fs.existsSync(outDir)) {
    if (!values.force && fs.readdirSync(outDir).length > 0) {
      throw new Error(`${rel(outDir)} is not empty. Pass --force to replace it.`);
    }
    fs.rmSync(outDir, { recursive: true, force: true });
  }

  const copied = copyTrackedFiles(outDir);
  copyTemplate(outDir, version);

  rewriteUnityManifest(outDir, version);
  fs.rmSync(path.join(outDir, 'Packages', 'packages-lock.json'), { force: true });
  written.delete('Packages/packages-lock.json');
  record('Packages/packages-lock.json', 'removed -- pins file: paths; Unity regenerates it on open');

  rewriteProjectSettings(outDir);
  rewriteScenes(outDir);
  rewriteReactPackage(outDir, version);
  rewriteVsCodeSettings(outDir);

  verify(outDir, version);
  if (!values['skip-registry-check']) await verifyRegistries(outDir, version);
  if (values['file-list']) fs.writeFileSync(values['file-list'], `${[...written].sort().join('\0')}\0`);

  console.log(`Prepared ReactUnity Kitchen Sink v${version} from ${copied} tracked files\n`);
  for (const step of steps) console.log(`  ${step.file.padEnd(38)} ${step.note}`);
  console.log(`\n  -> ${rel(outDir)}`);
}

/**
 * The tracked set is the definition of what the project is: it already excludes Library/,
 * Temp/, obj/, node_modules/ and the rest of the Unity churn, and it stays correct when
 * those lists change. An exclude-pattern copy would drift from .gitignore silently.
 */
function copyTrackedFiles(outDir: string): number {
  const listed = execFileSync('git', ['ls-files', '-z', '--', 'kitchen-sink'], { cwd: repoRoot, encoding: 'utf8' });
  const files = listed.split('\0').filter(Boolean);
  if (files.length === 0) throw new Error('git ls-files found nothing under kitchen-sink/');

  for (const tracked of files) {
    const relative = path.relative('kitchen-sink', tracked);
    const target = path.join(outDir, relative);
    fs.mkdirSync(path.dirname(target), { recursive: true });
    fs.copyFileSync(path.join(repoRoot, tracked), target);
    written.add(relative.replaceAll('\\', '/'));
  }
  return files.length;
}

/**
 * README and .gitattributes, which differ from the monorepo's and are not derived from it.
 * Dotfiles are stored with a leading `_` so the template directory does not accidentally
 * govern this repo -- a real .gitattributes sitting there would be live, not a template.
 */
function copyTemplate(outDir: string, version: string) {
  for (const name of fs.readdirSync(templateDir)) {
    const target = name.startsWith('_') ? `.${name.slice(1)}` : name;
    const body = fs.readFileSync(path.join(templateDir, name), 'utf8').replaceAll('{{version}}', version);
    fs.writeFileSync(path.join(outDir, target), body);
    written.add(target);
    record(target, 'written from scripts/kitchen-sink/template');
  }
}

function rewriteUnityManifest(outDir: string, version: string) {
  const file = path.join(outDir, 'Packages', 'manifest.json');
  const manifest = readJson(file);
  const deps = manifest.dependencies as Record<string, string>;
  const dropped = [...DROPPED_UNITY_PACKAGES, ...DROPPED_UNITY_EXTRAS];

  for (const name of dropped) delete deps[name];
  for (const name of Object.keys(deps)) {
    if (name.startsWith('com.reactunity.')) deps[name] = version;
  }

  // Compiles the packages' own tests into the project. Monorepo-only.
  delete manifest.testables;

  // The per-package scopes were redundant with the `com.reactunity` prefix scope and two of
  // them named packages this project no longer installs.
  for (const registry of (manifest.scopedRegistries ?? []) as { scopes: string[] }[]) {
    registry.scopes = registry.scopes.filter((scope) => !scope.startsWith('com.reactunity.'));
  }

  writeJson(file, manifest);
  record('Packages/manifest.json', `com.reactunity.* -> ${version}, dropped ${dropped.length} packages`);
}

/**
 * Removes REACT_UNITY_DEVELOPER per build target rather than blanking the whole block, so a
 * define added for some other reason survives. Unity writes `key: {}` for an empty map.
 */
function rewriteProjectSettings(outDir: string) {
  const file = path.join(outDir, 'ProjectSettings', 'ProjectSettings.asset');
  const lines = fs.readFileSync(file, 'utf8').split('\n');
  const start = lines.findIndex((line) => line === '  scriptingDefineSymbols:');
  if (start === -1) throw new Error('scriptingDefineSymbols block not found in ProjectSettings.asset');

  let end = start + 1;
  while (end < lines.length && /^ {4}\S/.test(lines[end])) end++;

  const kept: string[] = [];
  for (const line of lines.slice(start + 1, end)) {
    const [, target, value = ''] = line.match(/^ {4}([^:]+):\s*(.*)$/) ?? [];
    if (!target) continue;
    const defines = value
      .split(';')
      .map((define) => define.trim())
      .filter((define) => define && define !== DEVELOPER_DEFINE);
    if (defines.length > 0) kept.push(`    ${target}: ${defines.join(';')}`);
  }

  const replacement = kept.length > 0 ? ['  scriptingDefineSymbols:', ...kept] : ['  scriptingDefineSymbols: {}'];
  lines.splice(start, end - start, ...replacement);
  fs.writeFileSync(file, lines.join('\n'));
  record('ProjectSettings/ProjectSettings.asset', `stripped ${DEVELOPER_DEFINE}`);
}

/**
 * WorldCanvas pins ClearScript explicitly (EngineType 2). Left alone it would open onto an
 * engine that is no longer installed and fail at runtime, not at import -- so it moves to
 * Auto, which picks whichever engine the project has.
 */
function rewriteScenes(outDir: string) {
  const scenes = path.join(outDir, 'Assets', 'Scenes');
  for (const file of walk(scenes).filter((name) => name.endsWith('.unity'))) {
    const before = fs.readFileSync(file, 'utf8');
    const after = before.replace(/^(\s*EngineType:) [12]$/gm, '$1 0');
    if (after === before) continue;
    fs.writeFileSync(file, after);
    record(path.relative(outDir, file).replaceAll('\\', '/'), 'EngineType -> Auto (was a dropped engine)');
  }
}

function rewriteReactPackage(outDir: string, version: string) {
  const file = path.join(outDir, 'react', 'package.json');
  const pkg = readJson(file);
  pkg.name = 'reactunity-kitchen-sink';

  for (const field of ['dependencies', 'devDependencies'] as const) {
    const deps = pkg[field] as Record<string, string> | undefined;
    for (const [name, range] of Object.entries(deps ?? {})) {
      if (range.startsWith('workspace:')) deps![name] = `^${version}`;
    }
  }

  writeJson(file, pkg);
  record('react/package.json', `workspace:* -> ^${version}`);
}

function rewriteVsCodeSettings(outDir: string) {
  const file = path.join(outDir, '.vscode', 'settings.json');
  const settings = readJson(file);
  settings['dotnet.defaultSolution'] = 'kitchen-sink.sln';
  writeJson(file, settings);
  record('.vscode/settings.json', 'solution name');
}

/** Every way the export is known to be able to come out broken, asserted on the output. */
function verify(outDir: string, version: string) {
  const manifest = fs.readFileSync(path.join(outDir, 'Packages', 'manifest.json'), 'utf8');
  const reactPkg = fs.readFileSync(path.join(outDir, 'react', 'package.json'), 'utf8');
  const settings = fs.readFileSync(path.join(outDir, 'ProjectSettings', 'ProjectSettings.asset'), 'utf8');

  const failures: string[] = [];
  if (manifest.includes('file:')) failures.push('Packages/manifest.json still has a file: dependency');
  if (reactPkg.includes('workspace:')) failures.push('react/package.json still has a workspace: dependency');
  if (settings.includes(DEVELOPER_DEFINE)) failures.push(`ProjectSettings.asset still defines ${DEVELOPER_DEFINE}`);
  for (const dropped of DROPPED_UNITY_PACKAGES) {
    if (manifest.includes(dropped)) failures.push(`Packages/manifest.json still references ${dropped}`);
  }
  if (!manifest.includes(`"com.reactunity.core": "${version}"`)) failures.push(`com.reactunity.core is not pinned to ${version}`);

  // An engine the manifest no longer installs, selected in a scene, is a runtime failure in
  // whichever scene the user happens to open second.
  for (const scene of walk(path.join(outDir, 'Assets')).filter((name) => name.endsWith('.unity'))) {
    if (/^\s*EngineType: [12]$/m.test(fs.readFileSync(scene, 'utf8'))) {
      failures.push(`${path.relative(outDir, scene)} selects a dropped engine`);
    }
  }

  if (failures.length > 0) throw new Error(`Export is not standalone:\n  - ${failures.join('\n  - ')}`);
}

/**
 * OpenUPM and npm both build asynchronously after a release, so "the version exists in this
 * repo" does not mean "a user can install it". Checked against the registries the exported
 * manifest actually points at.
 */
async function verifyRegistries(outDir: string, version: string) {
  const manifest = readJson(path.join(outDir, 'Packages', 'manifest.json'));
  const reactPkg = readJson(path.join(outDir, 'react', 'package.json'));

  const wanted: { registry: string; name: string }[] = [];
  for (const name of Object.keys(manifest.dependencies)) {
    if (name.startsWith('com.reactunity.')) wanted.push({ registry: OPENUPM, name });
  }
  for (const field of ['dependencies', 'devDependencies'] as const) {
    for (const name of Object.keys(reactPkg[field] ?? {})) {
      if (name.startsWith('@reactunity/')) wanted.push({ registry: NPM, name });
    }
  }

  const missing: string[] = [];
  await Promise.all(
    wanted.map(async ({ registry, name }) => {
      const response = await fetch(`${registry}/${name}/${version}`);
      if (!response.ok) missing.push(`${name}@${version} (${new URL(registry).host}: HTTP ${response.status})`);
    }),
  );

  if (missing.length > 0) {
    throw new Error(
      `The export pins versions the registries have not published:\n  - ${missing.join('\n  - ')}\n\n` +
        'OpenUPM and npm build after the release lands, so this usually just means the run is early. ' +
        'Re-run once they catch up, or pass --skip-registry-check to produce the export anyway.',
    );
  }
  console.log(`Verified ${wanted.length} published packages at ${version}\n`);
}

function walk(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(full) : [full];
  });
}

const readJson = (file: string) => JSON.parse(fs.readFileSync(file, 'utf8'));
// Unity and npm both write two-space JSON with a trailing newline; matching it keeps the
// exported files diffable against the monorepo originals.
const writeJson = (file: string, value: unknown) => fs.writeFileSync(file, `${JSON.stringify(value, null, 2)}\n`);
const rel = (target: string) => path.relative(repoRoot, target).replaceAll('\\', '/') || '.';

await main();
