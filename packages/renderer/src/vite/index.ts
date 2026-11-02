import fs from 'node:fs';
import type { ServerResponse } from 'node:http';
import path from 'node:path';
import react from '@vitejs/plugin-react';
import type { Plugin, PluginOption, UserConfig } from 'vite';
import { cleanOutDir, removeOrphanMetaFiles, unsafeOutDirReason } from './clean.ts';
import { PREVIEWER_PATH, previewerHtml, previewerRedirect } from './previewer.ts';
import { findUnityProject } from './unity-project.ts';

type ReactOptions = Parameters<typeof react>[0];

const DEFAULT_ASSET_PATH = 'Assets/Resources/react';

export interface ReactUnityOptions {
  /**
   * The Unity project to build into, absolute or relative to the Vite root. Discovered by
   * walking up from the Vite root when omitted.
   */
  unityProject?: string;

  /** Output folder inside the Unity project. Defaults to `Assets/Resources/react`. */
  assetPath?: string;

  /** Empty the output directory before each build, keeping its `.meta` files. Default `true`. */
  clean?: boolean;

  /** Paths inside the output directory, relative to it, that the clean never deletes. */
  preserve?: readonly string[];

  /**
   * Content hashes in output filenames. Default `false`: a hash renames the file on every
   * build, which costs it its `.meta` and so its Unity GUID.
   */
  hashFileNames?: boolean;

  /** Options for `@vitejs/plugin-react`, or `false` to add the React plugin yourself. */
  react?: ReactOptions | false;

  /**
   * Resolve a bare `@import "tailwindcss"` to `@reactunity/renderer/tailwind.css`, which is the
   * same thing with a Preflight written for what ReactUnity renders. Default `true`; `false`
   * leaves the import alone. Only the bare specifier is aliased -- `tailwindcss/theme.css` and
   * the rest keep resolving to the package, which is where that entry gets them from.
   */
  tailwind?: boolean;

  /**
   * Serve the previewer -- a Unity WebGL player running this app -- at `previewer/` on the dev
   * server, and send a browser that opens the root there. Default `true`, which uses the hosted
   * player unless a `previewer/index.html` of your own sits next to the Vite root. A string names
   * that folder instead, relative to the root; `false` turns the previewer off.
   */
  previewer?: boolean | string;
}

const TAILWIND_ENTRY = '@reactunity/renderer/tailwind.css';

/**
 * Vite preset for a ReactUnity app: React Fast Refresh, output into the Unity project's
 * `Assets/Resources/react`, a clean that keeps Unity's `.meta` files, and a Tailwind entry with
 * ReactUnity's Preflight in place of the browser one.
 *
 * ```ts
 * export default defineConfig({ plugins: [reactUnity()] });
 * ```
 */
export function reactUnity(options: ReactUnityOptions = {}): PluginOption[] {
  const reactOptions = options.react ?? {};

  return [
    reactOptions === false ? null : react(reactOptions),
    reactUnityConfig(options),
    reactUnityClean(options),
    options.previewer === false ? null : reactUnityPreviewer(options.previewer),
  ];
}

const PREVIEWER_CONTENT_TYPES: Record<string, string> = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json',
  '.wasm': 'application/wasm',
  '.png': 'image/png',
  '.ico': 'image/x-icon',
};

/** Sends a file from a WebGL build, or a 404 -- never the app, which Vite would answer with. */
function sendPreviewerFile(dir: string, relative: string, res: ServerResponse) {
  let file = path.resolve(dir, decodeURIComponent(relative));
  if (file !== dir && !file.startsWith(dir + path.sep)) file = '';
  else if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file = path.join(file, 'index.html');

  if (!file || !fs.existsSync(file)) {
    res.statusCode = 404;
    res.end();
    return;
  }

  // A Unity build compressed without its decompression fallback needs the header said for it.
  const encoding = file.endsWith('.gz') ? 'gzip' : file.endsWith('.br') ? 'br' : undefined;
  const name = encoding ? file.slice(0, file.lastIndexOf('.')) : file;
  if (encoding) res.setHeader('Content-Encoding', encoding);
  res.setHeader('Content-Type', PREVIEWER_CONTENT_TYPES[path.extname(name)] ?? 'application/octet-stream');
  fs.createReadStream(file).pipe(res);
}

function reactUnityPreviewer(folder: true | string | undefined): Plugin {
  let base = '/';
  let dir = '';

  return {
    name: 'reactunity:previewer',
    apply: 'serve',

    configResolved(config) {
      base = config.base;
      // Beside the app rather than in public/, which a build would copy into the Unity project.
      dir = path.resolve(config.root, typeof folder === 'string' ? folder : 'previewer');
    },

    configureServer(server) {
      const page = base + PREVIEWER_PATH;
      // Looked up per request, so a build dropped in while the server runs is picked up.
      const custom = () => fs.existsSync(path.join(dir, 'index.html'));

      if (typeof folder === 'string' && !custom()) {
        server.config.logger.warn(`[reactunity] no index.html in the previewer folder ${dir}, so the hosted previewer is served.`);
      }

      server.middlewares.use((req, res, next) => {
        const url = req.url?.split('?')[0] ?? '';
        if (url === page.slice(0, -1)) {
          res.statusCode = 302;
          res.setHeader('Location', page);
          res.end();
        } else if (!url.startsWith(page)) {
          next();
        } else if (custom()) {
          sendPreviewerFile(dir, url.slice(page.length), res);
        } else if (url === page || url === `${page}index.html`) {
          res.setHeader('Content-Type', 'text/html; charset=utf-8');
          res.end(previewerHtml());
        } else {
          next();
        }
      });

      const printUrls = server.printUrls;
      server.printUrls = () => {
        printUrls();
        for (const url of server.resolvedUrls?.local ?? [])
          server.config.logger.info(`  ➜  Previewer: ${new URL(PREVIEWER_PATH, url).href}`);
      };
    },

    transformIndexHtml() {
      return [{ tag: 'script', children: previewerRedirect(base), injectTo: 'head-prepend' }];
    },
  };
}

// Lightning CSS's `Features`. The package is Vite's dependency rather than ours, so the flags are
// spelled out; both have held these values since the features were added.
const LIGHTNINGCSS_LOGICAL_PROPERTIES = 1 << 19;
const LIGHTNINGCSS_LIGHT_DARK = 1 << 20;

function reactUnityConfig(options: ReactUnityOptions): Plugin {
  const assetPath = options.assetPath ?? DEFAULT_ASSET_PATH;
  let message: { level: 'info' | 'warn'; text: string } | undefined;

  return {
    name: 'reactunity',

    config(config) {
      const patch: UserConfig = {};

      // Neither has anything to render against: Unity is not a browser, and an error
      // overlay drawn into a page nobody looks at only hides the console message.
      if (config.devtools === undefined) patch.devtools = false;

      const hmr = config.server?.hmr;
      if (hmr !== false && (hmr === undefined || (typeof hmr === 'object' && hmr.overlay === undefined))) {
        patch.server = { hmr: { overlay: false } };
      }

      // Tailwind's own Preflight resets a document, and there is no document here. Aliasing the
      // entry is what lets an app write the one line its docs tell it to. `@tailwindcss/vite`
      // resolves `@import` through Vite's resolver, so it sees this the way an app's own CSS does.
      if (options.tailwind !== false) {
        patch.resolve = { alias: [{ find: /^tailwindcss$/, replacement: TAILWIND_ENTRY }] };
      }

      const build: UserConfig['build'] = {};

      if (config.build?.outDir === undefined) {
        const root = path.resolve(config.root ?? process.cwd());
        const project = options.unityProject ? path.resolve(root, options.unityProject) : findUnityProject(root);

        if (project) {
          build.outDir = path.join(project, assetPath);
          message = { level: 'info', text: `[reactunity] Unity output directory: ${build.outDir}` };
        } else {
          message = {
            level: 'warn',
            text: '[reactunity] no Unity project found above the Vite root. Set the unityProject option or build.outDir.',
          };
        }
      }

      // Unity resolves an asset URL through its own loaders, and a small file inlined as a
      // data: URI never reaches them the same way -- react-unity-scripts pinned the same
      // limit to 0 rather than take CRA's 10 kB.
      if (config.build?.assetsInlineLimit === undefined) build.assetsInlineLimit = 0;

      // ReactUnity's CSS subset is roughly a 2020 browser: no oklch, color-mix or nesting.
      // Naming an old target is what makes Lightning CSS lower them on the way out.
      if (config.build?.cssTarget === undefined) build.cssTarget = ['chrome87'];

      // Two things that target lowers which ReactUnity reads itself. light-dark()'s lowered form
      // only works next to a color-scheme declaration in the same sheet; a logical property becomes
      // a `:-webkit-any(:lang(ae),:lang(ar),...)` pair naming every RTL language, which parses here
      // as a custom state and so never matches -- where `border-start-start-radius` is resolved
      // against the element's own direction. Only the radii reach that lowering at chrome87, the
      // rest of the logical properties being older than it.
      if (config.css?.lightningcss?.exclude === undefined) {
        patch.css = { lightningcss: { exclude: LIGHTNINGCSS_LIGHT_DARK | LIGHTNINGCSS_LOGICAL_PROPERTIES } };
      }

      // Vite's own emptying would take the .meta files with it, and warns about an outDir
      // outside the root besides. The clean plugin below does the job instead.
      if (options.clean !== false && config.build?.emptyOutDir === undefined) build.emptyOutDir = false;

      // Library mode names its own output, and an entryFileNames here would override it.
      const output = config.build?.rolldownOptions?.output ?? config.build?.rollupOptions?.output;
      if (!options.hashFileNames && output === undefined && !config.build?.lib) {
        const dir = config.build?.assetsDir ?? 'assets';
        build.rolldownOptions = {
          output: {
            entryFileNames: `${dir}/[name].js`,
            chunkFileNames: `${dir}/[name].js`,
            // Doubled on purpose. Unity keys a resource on its path minus the last extension, so
            // index.js and index.css both answer to `assets/index` and asking for one can hand you
            // the other. index.css.css keeps its type in the name it is looked up by.
            assetFileNames: `${dir}/[name][extname][extname]`,
          },
        };
      }

      if (Object.keys(build).length) patch.build = build;

      return patch;
    },

    configResolved(config) {
      // The config hook has no logger, so anything it decided is reported from here.
      if (message) config.logger[message.level](message.text);
      message = undefined;
    },
  };
}

function reactUnityClean(options: ReactUnityOptions): Plugin {
  const cleaned = new Set<string>();
  let written = false;
  let outDir = '';
  let root = '';
  let write = true;
  let logger: { warn: (message: string) => void } | undefined;

  return {
    name: 'reactunity:clean',
    apply: 'build',

    configResolved(config) {
      root = config.root;
      logger = config.logger;
      write = config.build.write !== false;
      outDir = path.resolve(config.root, config.build.outDir);
    },

    // Before renderStart, which is where Vite empties the outDir and copies publicDir
    // into it -- cleaning any later would delete files this build had just put there.
    buildStart() {
      if (options.clean === false || !write || cleaned.has(outDir)) return;
      cleaned.add(outDir);

      const unsafe = unsafeOutDirReason(outDir, root);
      if (unsafe) {
        logger?.warn(`[reactunity] not cleaning ${outDir} because ${unsafe}.`);
        return;
      }

      cleanOutDir(outDir, options.preserve);
    },

    // Only on success: closeBundle runs after a failed build too, and sweeping then
    // would delete every meta the clean had just set aside -- losing the GUIDs of files
    // the next successful build brings straight back.
    writeBundle() {
      written = true;
    },

    closeBundle() {
      // Cleared rather than kept, so a watch rebuild cleans again.
      cleaned.delete(outDir);
      const succeeded = written;
      written = false;
      if (options.clean === false || !write || !succeeded) return;

      removeOrphanMetaFiles(outDir);
    },
  };
}

export default reactUnity;
