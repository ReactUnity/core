import fs from 'node:fs';
import path from 'node:path';

const META = '.meta';

/**
 * Empties the output directory but keeps every `.meta` file.
 *
 * Unity writes a `.meta` beside each asset and the GUID inside it is what scenes,
 * prefabs and asset references point at. Deleting one makes Unity mint a new GUID for
 * the file that replaces it, which silently breaks every reference to it -- so a build
 * clears the output it produced last time and leaves the metas for the files coming back.
 * The ones nothing comes back for are dropped afterwards by `removeOrphanMetaFiles`.
 */
export function cleanOutDir(outDir: string, preserve: readonly string[] = []): void {
  if (!fs.existsSync(outDir)) return;

  const keep = new Set(preserve.map((entry) => path.resolve(outDir, entry)));
  cleanDir(outDir, keep);
}

// Returns whether anything survived, so the caller can drop a directory that did not.
function cleanDir(dir: string, keep: Set<string>): boolean {
  let survivors = 0;

  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);

    if (keep.has(full) || entry.name.endsWith(META)) {
      survivors++;
      continue;
    }

    if (entry.isDirectory()) {
      // A directory holding metas (or something preserved) has to stay for them.
      if (cleanDir(full, keep)) survivors++;
      else fs.rmSync(full, { recursive: true, force: true });
    } else {
      fs.rmSync(full, { force: true });
    }
  }

  return survivors > 0;
}

/**
 * Drops the `.meta` files whose asset did not come back, and the directories the build
 * left empty. Run after the bundle is written, so what remains describes only real files.
 */
export function removeOrphanMetaFiles(outDir: string): void {
  if (!fs.existsSync(outDir)) return;
  sweep(outDir, true);
}

// Returns whether the directory is still wanted.
function sweep(dir: string, isRoot: boolean): boolean {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      if (sweep(full, false)) continue;

      // A directory's own meta lives in its parent, and goes with it.
      fs.rmSync(full, { recursive: true, force: true });
      fs.rmSync(full + META, { force: true });
    } else if (entry.name.endsWith(META) && !fs.existsSync(full.slice(0, -META.length))) {
      fs.rmSync(full, { force: true });
    }
  }

  return isRoot || fs.readdirSync(dir).length > 0;
}

/**
 * Describes why `outDir` must not be cleaned, or nothing when it is safe.
 *
 * The clean deletes everything it finds, so it refuses anything that is not plausibly a
 * build output folder: a Unity project root, a package, or the sources themselves.
 */
export function unsafeOutDirReason(outDir: string, root: string): string | undefined {
  const dir = path.resolve(outDir);

  if (path.dirname(dir) === dir) return 'it is a filesystem root';

  // `Assets` itself rather than a folder inside it: no marker below would catch that one.
  if (path.basename(dir) === 'Assets') return 'it is a Unity Assets folder';

  const relative = path.relative(dir, path.resolve(root));
  if (!relative || (!relative.startsWith('..') && !path.isAbsolute(relative))) return 'the project root is inside it';

  for (const marker of ['package.json', '.git', 'ProjectSettings']) {
    if (fs.existsSync(path.join(dir, marker))) return `it contains ${marker}`;
  }

  return undefined;
}
