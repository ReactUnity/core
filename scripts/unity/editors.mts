// Locating a Unity editor executable by version. Windows-first because that is
// where the Editor-driven workflow runs; CI uses game-ci and never comes here.
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

export type Editor = { version: string; exe: string };

// Hub keeps manual installs in editors.json/editors-v2.json and a single extra
// search root in secondaryInstallPath.json. Reading all three beats hardcoding a
// path -- this machine installs to S:\Programs\Unity, not the Hub default.
function hubRoots(): string[] {
  const appData = process.env.APPDATA ?? path.join(os.homedir(), 'AppData', 'Roaming');
  const roots = ['C:\\Program Files\\Unity\\Hub\\Editor'];

  const secondary = readJson<string>(path.join(appData, 'UnityHub', 'secondaryInstallPath.json'));
  if (typeof secondary === 'string' && secondary) roots.unshift(secondary);

  return roots;
}

function readJson<T>(file: string): T | undefined {
  try {
    return JSON.parse(fs.readFileSync(file, 'utf8')) as T;
  } catch {
    return undefined;
  }
}

function versionOf(exe: string): string | undefined {
  // <root>\<version>\Editor\Unity.exe, or C:\Program Files\Unity <version>\Editor\Unity.exe
  const dir = path.basename(path.dirname(path.dirname(exe)));
  const match = /^(?:Unity )?(\d{4}\.\d+\.\d+[abfp]\d+)$/.exec(dir);
  return match?.[1];
}

export function listEditors(): Editor[] {
  const found = new Map<string, string>();

  const add = (exe: string) => {
    if (!exe || found.has(exe)) return;
    if (!fs.existsSync(exe)) return;
    const version = versionOf(exe);
    if (version) found.set(exe, version);
  };

  for (const root of hubRoots()) {
    let entries: fs.Dirent[];
    try {
      entries = fs.readdirSync(root, { withFileTypes: true });
    } catch {
      continue;
    }
    for (const entry of entries) {
      if (entry.isDirectory()) add(path.join(root, entry.name, 'Editor', 'Unity.exe'));
    }
  }

  // Side-by-side installs outside any Hub root ("C:\Program Files\Unity 6000.5.4f1").
  for (const programFiles of [process.env.ProgramFiles, process.env['ProgramFiles(x86)']]) {
    if (!programFiles) continue;
    let entries: fs.Dirent[];
    try {
      entries = fs.readdirSync(programFiles, { withFileTypes: true });
    } catch {
      continue;
    }
    for (const entry of entries) {
      if (entry.isDirectory() && entry.name.startsWith('Unity ')) add(path.join(programFiles, entry.name, 'Editor', 'Unity.exe'));
    }
  }

  const editorsJson = readJson<Record<string, { location?: string[] }>>(path.join(process.env.APPDATA ?? '', 'UnityHub', 'editors.json'));
  for (const entry of Object.values(editorsJson ?? {})) for (const location of entry.location ?? []) add(location);

  return [...found].map(([exe, version]) => ({ version, exe })).sort((a, b) => compareVersions(b.version, a.version));
}

function compareVersions(a: string, b: string): number {
  const parse = (v: string) => (v.match(/\d+/g) ?? []).map(Number);
  const [pa, pb] = [parse(a), parse(b)];
  for (let i = 0; i < Math.max(pa.length, pb.length); i++) {
    const diff = (pa[i] ?? 0) - (pb[i] ?? 0);
    if (diff) return diff;
  }
  return 0;
}

export function projectVersion(projectPath: string): string | undefined {
  try {
    const raw = fs.readFileSync(path.join(projectPath, 'ProjectSettings', 'ProjectVersion.txt'), 'utf8');
    return /m_EditorVersion:\s*(\S+)/.exec(raw)?.[1];
  } catch {
    return undefined;
  }
}

// Exact match, else newest install sharing the major.minor line. A patch-level
// mismatch only rewrites ProjectVersion.txt, which the runner restores anyway.
export function resolveEditor(version: string): Editor {
  const override = process.env.UNITY_EDITOR_PATH;
  if (override) return { version: versionOf(override) ?? version, exe: override };

  const editors = listEditors();
  const exact = editors.find((e) => e.version === version);
  if (exact) return exact;

  const line = version.split('.').slice(0, 2).join('.');
  const sameLine = editors.find((e) => e.version.startsWith(`${line}.`));
  if (sameLine) return sameLine;

  const available = editors.map((e) => `  ${e.version}  ${e.exe}`).join('\n');
  throw new Error(`No Unity ${version} installed (and nothing on the ${line} line).\nAvailable:\n${available || '  (none found)'}`);
}
