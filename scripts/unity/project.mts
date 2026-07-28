// The two Unity projects an agent drives, plus the two hazards of driving them
// from a script: the Editor's exclusive project lock, and the files Unity rewrites
// just for having opened the project.
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

export const repoRoot = path.resolve(import.meta.dirname, '..', '..');

// Pinned rather than read from ProjectVersion.txt, because restoreChurn() puts
// that file back to whatever is committed -- for tests/ that is a 2020.3 no
// longer used anywhere. Override per run with UNITY_VERSION.
const PINNED_VERSION = '6000.5.5f1';

export type ProjectName = 'tests' | 'full-sample';

export type Project = {
  name: ProjectName;
  path: string;
  version: string;
  /**
   * Assemblies to hand `-assemblyNames`, matching the CI matrix. Undefined for full-sample,
   * which holds no test assemblies -- naming the tests project's there would ask for
   * assemblies that do not exist and report zero tests.
   */
  assemblies?: string;
};

export function getProject(name: string): Project {
  if (name !== 'tests' && name !== 'full-sample') throw new Error(`Unknown project '${name}'. Expected 'tests' or 'full-sample'.`);
  return {
    name,
    path: path.join(repoRoot, name),
    version: process.env.UNITY_VERSION ?? PINNED_VERSION,
    assemblies: name === 'tests' ? 'ReactUnity.Tests;ReactUnity.Tests.Editor' : undefined,
  };
}

/**
 * Files Unity rewrites on open -- package upgrades, the editor version stamp, new
 * settings keys. Committing them from a local 6000.5 run breaks the 2023.2 CI job,
 * which cannot resolve com.unity.ugui 2.x. Snapshotted before a run, put back after.
 */
const CHURN_FILES = [
  'Packages/manifest.json',
  'Packages/packages-lock.json',
  // ProjectVersion.txt is deliberately NOT here. CI passes unityVersion to game-ci
  // explicitly, so the file has no effect there -- while reverting it to a version older
  // than the local Editor makes the GUI open onto a modal "Project Upgrade Required"
  // dialog and hang. Let it track whatever version is actually being used.
  'ProjectSettings/ProjectSettings.asset',
  'ProjectSettings/EditorBuildSettings.asset',
  'ProjectSettings/PackageManagerSettings.asset',
  'ProjectSettings/SceneTemplateSettings.json',
  'ProjectSettings/Packages/com.unity.testtools.codecoverage/Settings.json',
  // Tracked on purpose (see the note in .gitignore), so a run must not leave it changed.
  'UserSettings/EditorUserSettings.asset',
];

export type Churn = Map<string, Buffer | null>;

export function snapshotChurn(project: Project): Churn {
  const snapshot: Churn = new Map();
  for (const rel of CHURN_FILES) {
    const file = path.join(project.path, rel);
    snapshot.set(rel, fs.existsSync(file) ? fs.readFileSync(file) : null);
  }
  return snapshot;
}

/** Returns the files it put back, plus any Unity created that were not there before. */
export function restoreChurn(project: Project, snapshot: Churn): { restored: string[]; created: string[] } {
  const restored: string[] = [];
  const created: string[] = [];

  for (const [rel, before] of snapshot) {
    const file = path.join(project.path, rel);
    const exists = fs.existsSync(file);

    if (before === null) {
      // Left in place deliberately: deleting a settings asset Unity just generated
      // only makes it regenerate next run. Reported so it shows up in git status.
      if (exists) created.push(rel);
      continue;
    }
    if (!exists || !fs.readFileSync(file).equals(before)) {
      fs.writeFileSync(file, before);
      restored.push(rel);
    }
  }

  return { restored, created };
}

/**
 * Whether an Editor currently owns the project, which makes batch mode fail instantly.
 *
 * Unity 6 records the owner in Library/EditorInstance.json; it does not create the
 * Library/UnityLockfile that older versions did, and probing a file that is never there
 * reported "unlocked" for an Editor that was plainly running. The marker outlives a crash,
 * so the pid has to be checked for life -- and confirmed to still be a Unity, since pids
 * get reused.
 */
export function lockHolder(project: Project): string | undefined {
  const marker = path.join(project.path, 'Library', 'EditorInstance.json');
  if (fs.existsSync(marker)) {
    try {
      const { process_id: pid } = JSON.parse(fs.readFileSync(marker, 'utf8')) as { process_id: number };
      if (pid && isRunningUnity(pid)) return `Unity.exe (pid ${pid})`;
    } catch {
      // Unreadable or half-written marker: fall through to the legacy check.
    }
  }

  // Unity 2020-2022 style. Its lock is only held by a live Editor, so presence alone is
  // not the test -- the exclusive open is.
  const lockfile = path.join(project.path, 'Library', 'UnityLockfile');
  if (!fs.existsSync(lockfile)) return undefined;
  try {
    fs.closeSync(fs.openSync(lockfile, 'r+'));
    return undefined;
  } catch {
    return 'another Unity process';
  }
}

function isRunningUnity(pid: number): boolean {
  try {
    // Signal 0 tests for existence without touching the process.
    process.kill(pid, 0);
  } catch (error) {
    // EPERM means it exists but belongs to someone else, which still counts as running.
    if ((error as NodeJS.ErrnoException).code !== 'EPERM') return false;
  }

  try {
    const name = execFileSync(
      'powershell',
      ['-NoProfile', '-NonInteractive', '-Command', `(Get-Process -Id ${pid} -ErrorAction SilentlyContinue).Name`],
      {
        encoding: 'utf8',
      },
    ).trim();
    return name === '' || name.startsWith('Unity');
  } catch {
    // Could not ask: treat a live pid as a held lock rather than launching into a failure.
    return true;
  }
}
