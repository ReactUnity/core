import fs from 'node:fs';
import path from 'node:path';

// How far up the tree to look before giving up. Deep enough for any sane layout, shallow
// enough that a React app outside a Unity project does not walk to the filesystem root.
const MAX_DEPTH = 10;

/**
 * A folder is a Unity project when it has an `Assets` directory beside a
 * `ProjectSettings/ProjectVersion.txt`. The version stamp is what tells a real project
 * from any folder that happens to be called `Assets`.
 */
export function isUnityProject(dir: string): boolean {
  return isDirectory(path.join(dir, 'Assets')) && fs.existsSync(path.join(dir, 'ProjectSettings', 'ProjectVersion.txt'));
}

/**
 * Finds the Unity project a React app belongs to, starting at `from` and walking up.
 *
 * Each ancestor is tested itself and then one level down, so both documented layouts are
 * found: the app inside the project (`MyGame/react`) and the app beside it
 * (`workspace/{MyGame,ui}`).
 */
export function findUnityProject(from: string): string | undefined {
  let dir = path.resolve(from);

  for (let depth = 0; depth < MAX_DEPTH; depth++) {
    if (isUnityProject(dir)) return dir;

    const nested = findUnityProjectIn(dir);
    if (nested) return nested;

    const parent = path.dirname(dir);
    if (parent === dir) break;
    dir = parent;
  }

  return undefined;
}

function findUnityProjectIn(dir: string): string | undefined {
  for (const entry of readDir(dir)) {
    // node_modules and dot-directories cannot hold a Unity project, and both are large.
    if (!entry.isDirectory() || entry.name.startsWith('.') || entry.name === 'node_modules') continue;

    const candidate = path.join(dir, entry.name);
    if (isUnityProject(candidate)) return candidate;
  }

  return undefined;
}

function readDir(dir: string): fs.Dirent[] {
  try {
    return fs.readdirSync(dir, { withFileTypes: true });
  } catch {
    // Unreadable directories are simply not the project we are looking for.
    return [];
  }
}

function isDirectory(dir: string): boolean {
  try {
    return fs.statSync(dir).isDirectory();
  } catch {
    return false;
  }
}
