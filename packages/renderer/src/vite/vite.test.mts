// Tests for the destructive half of the Vite plugin. Run them with:
//
//   node --test packages/renderer/src/vite/vite.test.mts
//
// Node strips the types itself, so there is no build step and no test runner to install.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { test } from 'node:test';
import type { ConfigEnv, Plugin, UserConfig } from 'vite';
import { cleanOutDir, removeOrphanMetaFiles, unsafeOutDirReason } from './clean.ts';
import { reactUnity } from './index.ts';
import { findUnityProject } from './unity-project.ts';

function fixture(files: string[]): { root: string; out: string; has: (rel: string) => boolean } {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'reactunity-vite-'));
  const out = path.join(root, 'out');

  for (const file of files) {
    const full = path.join(out, file);
    fs.mkdirSync(path.dirname(full), { recursive: true });
    fs.writeFileSync(full, file);
  }

  return { root, out, has: (rel: string) => fs.existsSync(path.join(out, rel)) };
}

test('the clean removes build output and keeps every meta', () => {
  const { out, has } = fixture([
    'index.html',
    'index.html.meta',
    'assets.meta',
    'assets/index.js',
    'assets/index.js.meta',
    '.vite/manifest.json',
    'keepme/data.json',
    'empty/gone.js',
    'empty.meta',
  ]);

  cleanOutDir(out, ['keepme']);

  assert.ok(!has('index.html'), 'output is deleted');
  assert.ok(has('index.html.meta'), 'its meta stays');
  assert.ok(has('assets.meta') && has('assets/index.js.meta'), 'nested metas stay');
  assert.ok(!has('.vite'), 'a directory with nothing to keep goes with its contents');
  assert.ok(has('keepme/data.json'), 'preserved paths are untouched');
  assert.ok(!has('empty'), 'a directory left with nothing goes');
  assert.ok(has('empty.meta'), 'but its meta waits for the sweep, in case the build brings it back');
});

test('the sweep drops the metas of files that did not come back', () => {
  const { out, has } = fixture(['index.html.meta', 'assets.meta', 'assets/index.js', 'assets/old.js.meta', 'empty.meta']);

  removeOrphanMetaFiles(out);

  assert.ok(!has('index.html.meta'), 'a meta with no file is an orphan');
  assert.ok(!has('assets/old.js.meta'), 'so is one nested in a directory that survived');
  assert.ok(has('assets.meta'), 'a directory that still has contents keeps its meta');
  assert.ok(!has('empty.meta'), 'a directory that never came back does not');
});

test('the clean refuses anything that is not plausibly a build folder', () => {
  const { root, out } = fixture(['index.html']);

  assert.equal(unsafeOutDirReason(out, root), undefined);
  assert.match(unsafeOutDirReason(root, root) as string, /project root is inside it/);
  assert.match(unsafeOutDirReason(path.join(root, 'Assets'), root) as string, /Assets folder/);

  fs.writeFileSync(path.join(out, 'package.json'), '{}');
  assert.match(unsafeOutDirReason(out, root) as string, /package\.json/);
});

test('a Unity project is found above the app, and beside it', () => {
  const { root } = fixture(['index.html']);
  const project = path.join(root, 'MyGame');
  fs.mkdirSync(path.join(project, 'Assets'), { recursive: true });
  fs.mkdirSync(path.join(project, 'ProjectSettings'), { recursive: true });

  const app = path.join(project, 'react');
  fs.mkdirSync(app);
  fs.mkdirSync(path.join(root, 'ui'));
  // An Assets folder alone is not a project: the version stamp is what settles it.
  assert.equal(findUnityProject(app), undefined);

  fs.writeFileSync(path.join(project, 'ProjectSettings', 'ProjectVersion.txt'), 'm_EditorVersion: 6000.0.51f1');
  assert.equal(findUnityProject(app), project, 'from an app inside the project');
  assert.equal(findUnityProject(path.join(root, 'ui')), project, 'and from one beside it');
});

test('output names stay distinct once Unity drops the last extension', () => {
  const config = reactUnity({ react: false }).find((p) => p && 'name' in p && p.name === 'reactunity') as Plugin;
  const patch = (config.config as (c: UserConfig, e: ConfigEnv) => UserConfig)({}, { command: 'build', mode: 'production' });
  const { entryFileNames, chunkFileNames, assetFileNames } = (patch?.build?.rolldownOptions?.output ?? {}) as Record<string, string>;

  // Unity keys a resource on its path minus the last extension, so an entry and its stylesheet
  // must not land on the same one.
  const named = (pattern: string, extension: string) => pattern.replace('[name]', 'index').replaceAll('[extname]', extension);
  const resource = (name: string) => name.replace(/\.[^./]+$/, '');

  assert.notEqual(resource(named(entryFileNames, '.js')), resource(named(assetFileNames, '.css')));
  assert.notEqual(resource(named(chunkFileNames, '.js')), resource(named(assetFileNames, '.png')));
});
