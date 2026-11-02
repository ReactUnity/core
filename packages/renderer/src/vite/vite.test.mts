// Tests for the destructive half of the Vite plugin. Run them with:
//
//   node --test packages/renderer/src/vite/vite.test.mts
//
// Node strips the types itself, so there is no build step and no test runner to install.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import http from 'node:http';
import type { AddressInfo } from 'node:net';
import os from 'node:os';
import path from 'node:path';
import { test } from 'node:test';
import zlib from 'node:zlib';
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

test('light-dark() survives the CSS lowering, unless the app decides otherwise', () => {
  const configOf = (config: UserConfig) => {
    const plugin = reactUnity({ react: false }).find((p) => p && 'name' in p && p.name === 'reactunity') as Plugin;
    return (plugin.config as (c: UserConfig, e: ConfigEnv) => UserConfig)(config, { command: 'build', mode: 'production' });
  };

  // The old cssTarget is what lowers oklch and nesting, and would take light-dark() with it.
  const patch = configOf({});
  assert.deepEqual(patch?.build?.cssTarget, ['chrome87']);
  assert.equal((patch?.css?.lightningcss?.exclude ?? 0) & (1 << 20), 1 << 20);

  assert.equal(configOf({ css: { lightningcss: { exclude: 0 } } })?.css, undefined);
});

test('a bare tailwindcss import is aliased, and only the bare one', () => {
  const configOf = (options: Parameters<typeof reactUnity>[0]) => {
    const plugin = reactUnity({ ...options, react: false }).find((p) => p && 'name' in p && p.name === 'reactunity') as Plugin;
    return (plugin.config as (c: UserConfig, e: ConfigEnv) => UserConfig)({}, { command: 'build', mode: 'production' });
  };

  const alias = (configOf({})?.resolve?.alias ?? []) as { find: RegExp; replacement: string }[];
  assert.equal(alias.length, 1);
  assert.match(alias[0].replacement, /^@reactunity\/renderer\/tailwind\.css$/);

  // css/tailwind.css gets the theme and the utilities from the real package, so a subpath that
  // followed the alias would resolve to our own file and take the import with it.
  assert.ok(alias[0].find.test('tailwindcss'));
  assert.ok(!alias[0].find.test('tailwindcss/theme.css'));

  assert.equal(configOf({ tailwind: false })?.resolve, undefined);
});

/** A Vite root with the given files in it. */
function viteRoot(files: Record<string, string> = {}) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'reactunity-vite-'));
  for (const [name, content] of Object.entries(files)) {
    fs.mkdirSync(path.dirname(path.join(root, name)), { recursive: true });
    fs.writeFileSync(path.join(root, name), content);
  }
  return root;
}

type Middleware = (req: http.IncomingMessage, res: http.ServerResponse, next: () => void) => void;

/** The previewer plugin resolved against `root`, its middleware on a real server; `next` answers 599. */
async function previewerServer(root: string, previewer?: boolean | string) {
  const plugin = reactUnity({ react: false, previewer }).find((p) => p && 'name' in p && p.name === 'reactunity:previewer') as Plugin;
  (plugin.configResolved as (c: unknown) => void)({ base: '/', root });

  const middlewares: Middleware[] = [];
  const warnings: string[] = [];
  const server = {
    config: { logger: { warn: (message: string) => warnings.push(message), info: () => {} } },
    middlewares: { use: (fn: Middleware) => middlewares.push(fn) },
    printUrls: () => {},
  };
  (plugin.configureServer as (s: unknown) => void)(server);

  const http_ = http.createServer((req, res) =>
    middlewares[0](req, res, () => {
      res.statusCode = 599;
      res.end();
    }),
  );
  await new Promise<void>((resolve) => http_.listen(0, '127.0.0.1', resolve));
  const { port } = http_.address() as AddressInfo;

  const request = (url: string) => fetch(`http://127.0.0.1:${port}${url}`, { redirect: 'manual' });
  const close = () => new Promise((resolve) => http_.close(resolve));

  return { plugin, request, close, warnings };
}

test('the dev server serves the hosted previewer, which loads the app from /index.js', async () => {
  const { request, close } = await previewerServer(viteRoot());
  try {
    const page = await request('/previewer/');
    assert.match(page.headers.get('content-type') as string, /text\/html/);
    assert.match(await page.text(), /reactunity\.github\.io\/Unity\/previewer\/\d+\.\d+\.\d+\/Build\//);

    assert.equal((await request('/previewer')).headers.get('location'), '/previewer/');
    assert.equal((await request('/src/index.tsx')).status, 599, 'everything else passes through');
  } finally {
    await close();
  }
});

test('a previewer/ folder beside the app replaces the hosted one, and stays out of public/', async () => {
  const root = viteRoot();
  const { request, close } = await previewerServer(root);
  try {
    assert.match(await (await request('/previewer/')).text(), /reactunity\.github\.io/);

    // Picked up without a restart.
    fs.mkdirSync(path.join(root, 'previewer', 'Build'), { recursive: true });
    fs.writeFileSync(path.join(root, 'previewer', 'index.html'), '<canvas>');
    fs.writeFileSync(path.join(root, 'previewer', 'Build', 'Previewer.wasm'), 'wasm');

    assert.equal(await (await request('/previewer/')).text(), '<canvas>');
    const wasm = await request('/previewer/Build/Previewer.wasm');
    assert.equal(wasm.headers.get('content-type'), 'application/wasm');
    assert.equal(await wasm.text(), 'wasm');

    // A missing file is a 404, not the app; and nothing outside the folder is reachable.
    assert.equal((await request('/previewer/Build/missing.js')).status, 404);
    assert.equal((await request('/previewer/..%2Fpackage.json')).status, 404);
  } finally {
    await close();
  }
});

test('the previewer option names another folder', async () => {
  const root = viteRoot({ 'unity/web/index.html': '<custom>', 'previewer/index.html': '<default>' });
  const { request, close, warnings } = await previewerServer(root, 'unity/web');
  try {
    assert.equal(await (await request('/previewer/')).text(), '<custom>');
    assert.deepEqual(warnings, []);
  } finally {
    await close();
  }

  const missing = await previewerServer(root, 'nowhere');
  try {
    assert.match(missing.warnings[0], /no index\.html in the previewer folder/);
    assert.match(await (await missing.request('/previewer/')).text(), /reactunity\.github\.io/);
  } finally {
    await missing.close();
  }
});

test('a Unity build compressed without its fallback is sent with its encoding', async () => {
  const root = viteRoot({ 'previewer/index.html': '<canvas>', 'previewer/Build/Previewer.framework.js.gz': '' });
  fs.writeFileSync(path.join(root, 'previewer', 'Build', 'Previewer.framework.js.gz'), zlib.gzipSync('framework()'));
  const { request, close } = await previewerServer(root);
  try {
    const framework = await request('/previewer/Build/Previewer.framework.js.gz');
    assert.equal(framework.headers.get('content-encoding'), 'gzip');
    assert.match(framework.headers.get('content-type') as string, /text\/javascript/);
    assert.equal(await framework.text(), 'framework()');
  } finally {
    await close();
  }
});

test('the root sends a browser to the previewer, and leaves Unity where it is', async () => {
  const { plugin, close } = await previewerServer(viteRoot());
  await close();
  const [tag] = (plugin.transformIndexHtml as unknown as () => { children: string; injectTo: string }[])();
  assert.equal(tag.injectTo, 'head-prepend');

  const run = (globals: object | undefined, pathname = '/') => {
    const replaced: string[] = [];
    const location = { pathname, replace: (url: string) => replaced.push(url) };
    // Unity installs Globals; a browser has none.
    if (globals) new Function('location', 'Globals', tag.children)(location, globals);
    else new Function('location', tag.children)(location);
    return replaced;
  };

  assert.deepEqual(run(undefined), ['/previewer/']);
  assert.deepEqual(run({}), []);
  // A previewer answered with the app must not redirect to itself forever.
  assert.deepEqual(run(undefined, '/previewer/'), []);
});
