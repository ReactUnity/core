import path from 'node:path';
import react from '@vitejs/plugin-react';
import type { Plugin, PluginOption, UserConfig } from 'vite';
import { cleanOutDir, removeOrphanMetaFiles, unsafeOutDirReason } from './clean';
import { findUnityProject } from './unity-project';

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
}

/**
 * Vite preset for a ReactUnity app: React Fast Refresh, output into the Unity project's
 * `Assets/Resources/react`, and a clean that keeps Unity's `.meta` files.
 *
 * ```ts
 * export default defineConfig({ plugins: [reactUnity()] });
 * ```
 */
export function reactUnity(options: ReactUnityOptions = {}): PluginOption[] {
  const reactOptions = options.react ?? {};

  return [reactOptions === false ? null : react(reactOptions), reactUnityConfig(options), reactUnityClean(options)];
}

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

      // Vite's own emptying would take the .meta files with it, and warns about an outDir
      // outside the root besides. The clean plugin below does the job instead.
      if (options.clean !== false && config.build?.emptyOutDir === undefined) build.emptyOutDir = false;

      const output = config.build?.rolldownOptions?.output ?? config.build?.rollupOptions?.output;
      if (!options.hashFileNames && output === undefined) {
        const dir = config.build?.assetsDir ?? 'assets';
        build.rolldownOptions = {
          output: {
            entryFileNames: `${dir}/[name].js`,
            chunkFileNames: `${dir}/[name].js`,
            assetFileNames: `${dir}/[name].[ext]`,
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
