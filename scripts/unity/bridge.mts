// Client for the in-Editor bridge (unity/core/Editor/Developer/AgentBridge). Talks to an
// Editor that is already open, so there is no project lock to fight and no cold domain to
// pay for -- the tradeoff being that the Editor has to be running.
import fs from 'node:fs';
import path from 'node:path';
import { parseTestResults } from './parse.mts';
import type { Project } from './project.mts';
import { rel, reportTests } from './report.mts';

type Discovery = { port: number; pid: number; unityVersion: string; projectPath: string; bridgeVersion: number };

export type Status = {
  ok: boolean;
  unityVersion: string;
  projectPath: string;
  activeScene: string;
  isCompiling: boolean;
  isUpdating: boolean;
  isPlaying: boolean;
  isPaused: boolean;
  compileErrors: string[];
  tests: { state?: string; resultsFile?: string; summary?: unknown } | null;
};

function discover(project: Project): Discovery {
  const file = path.join(project.path, 'Library', 'ReactUnityAgentBridge.json');
  if (!fs.existsSync(file)) {
    throw new Error(
      `No bridge for ${project.name} at ${rel(file)}.\n` +
        `Open the project (pnpm unity open ${project.name}) -- the bridge starts with the Editor, and needs the\n` +
        'REACT_UNITY_DEVELOPER define on the active build target.',
    );
  }
  return JSON.parse(fs.readFileSync(file, 'utf8')) as Discovery;
}

async function call<T>(project: Project, endpoint: string, query: Record<string, string | number> = {}): Promise<T> {
  const { port, pid } = discover(project);
  const search = new URLSearchParams(Object.entries(query).map(([key, value]) => [key, String(value)]));
  const url = `http://127.0.0.1:${port}${endpoint}${search.size ? `?${search}` : ''}`;

  try {
    const response = await fetch(url, { signal: AbortSignal.timeout(35_000) });
    return (await response.json()) as T;
  } catch (error) {
    // Callers that poll (waitIdle, waitForTests) catch this and keep going -- the socket is
    // also down for the length of every domain reload, which is not a failure.
    throw new Error(`Bridge on port ${port} (pid ${pid}) did not answer ${endpoint}: ${(error as Error).message}`);
  }
}

export const status = (project: Project) => call<Status>(project, '/status');

/**
 * Polls until the Editor is neither compiling nor importing. A refused connection counts as
 * busy, not as an error: the bridge socket closes for the duration of every domain reload.
 */
export async function waitIdle(project: Project, timeoutSeconds = 300): Promise<Status> {
  const deadline = Date.now() + timeoutSeconds * 1000;
  let lastNote = 0;

  while (Date.now() < deadline) {
    try {
      const current = await status(project);
      if (!current.isCompiling && !current.isUpdating) return current;
      note('compiling/importing');
    } catch {
      note('domain reloading (bridge socket down)');
    }
    await new Promise((resolve) => setTimeout(resolve, 700));
  }
  throw new Error(`Editor still busy after ${timeoutSeconds}s.`);

  function note(what: string) {
    if (Date.now() - lastNote < 5000) return;
    lastNote = Date.now();
    console.log(`  waiting: ${what}`);
  }
}

export async function bridge(project: Project, action: string, flags: Record<string, string | undefined>) {
  switch (action) {
    case 'status': {
      const current = await status(project);
      console.log(`${project.name}: Unity ${current.unityVersion}, pid ${discover(project).pid}`);
      console.log(`  scene ${current.activeScene || '(none)'}`);
      console.log(
        `  compiling=${current.isCompiling} importing=${current.isUpdating} playing=${current.isPlaying} paused=${current.isPaused}`,
      );
      if (current.compileErrors.length) {
        console.error(`  ${current.compileErrors.length} compile error(s):`);
        for (const error of current.compileErrors) console.error(`    ${error}`);
        process.exitCode = 1;
      }
      if (current.tests?.state) console.log(`  tests: ${current.tests.state}`);
      return;
    }

    case 'logs': {
      const result = await call<{ entries: { type: string; message: string; stack: string }[] }>(project, '/logs', {
        limit: flags.limit ?? 60,
        level: flags.level ?? 'all',
      });
      for (const entry of result.entries) console.log(`[${entry.type}] ${entry.message.split('\n')[0]}`);
      return;
    }

    case 'refresh': {
      await call(project, '/refresh');
      const current = await waitIdle(project);
      if (current.compileErrors.length) {
        console.error(`${current.compileErrors.length} compile error(s):`);
        for (const error of current.compileErrors) console.error(`  ${error}`);
        process.exitCode = 1;
      } else console.log('Refreshed and compiled with no errors.');
      return;
    }

    case 'play':
    case 'stop': {
      const result = await call<{ isPlaying: boolean; changed: boolean }>(project, `/${action}`);
      console.log(`isPlaying=${result.isPlaying}${result.changed ? '' : ' (already)'}`);
      return;
    }

    case 'screenshot': {
      // Resolved here, against the caller's cwd. The Editor's cwd is the Unity project, so a
      // relative path sent as-is lands somewhere the caller did not mean.
      const target = path.resolve(flags.path ?? path.join(project.path, 'Library', 'ReactUnityAgentBridge', 'screenshot.png'));
      const result = await call<{ path: string }>(project, '/screenshot', { path: target, supersize: flags.supersize ?? 1 });
      // CaptureScreenshot lands on the next rendered frame, so the file is not there yet.
      const written = await waitForFile(result.path, 15);
      console.log(written ? `Wrote ${result.path}` : `No file at ${result.path} after 15s -- is the Editor rendering? Try play mode.`);
      if (!written) process.exitCode = 1;
      return;
    }

    case 'quit': {
      // The Editor may die mid-response, so a dropped connection here is success, not failure.
      await call(project, '/quit').catch(() => undefined);
      // Waiting for the marker to go is what makes `bridge quit && unity test` work.
      const marker = path.join(project.path, 'Library', 'EditorInstance.json');
      const closed = await waitForGone(marker, 60);
      console.log(closed ? `${project.name} Editor closed.` : `Editor still holding ${rel(marker)} after 60s.`);
      if (!closed) process.exitCode = 1;
      return;
    }

    case 'menu': {
      if (!flags.path) throw new Error('bridge menu needs --path "React/Tests/Overwrite Snapshots"');
      const result = await call<{ executed: boolean }>(project, '/menu', { path: flags.path });
      console.log(`${flags.path}: ${result.executed ? 'executed' : 'not found'}`);
      if (!result.executed) process.exitCode = 1;
      return;
    }

    case 'test': {
      const mode = flags.platform ?? 'EditMode';
      const assemblies = flags.assemblies ?? project.assemblies;
      const started = await call<{ ok: boolean; error?: string }>(project, '/tests', {
        run: 1,
        mode,
        ...(assemblies ? { assemblies } : {}),
        ...(flags.filter ? { filter: flags.filter } : {}),
      });
      if (!started.ok) throw new Error(started.error ?? 'Could not start the run');

      console.log(`Running ${mode} tests in the open Editor...`);
      const resultsFile = await waitForTests(project, Number(flags.timeout ?? 1800));
      const results = parseTestResults(resultsFile);
      if (!results) throw new Error(`Run finished but no results at ${resultsFile}`);

      reportTests(results, resultsFile);
      if (results.failed > 0 || results.total === 0) process.exitCode = 1;
      return;
    }

    default:
      throw new Error(`Unknown bridge action '${action}'. Try status, logs, refresh, test, play, stop, screenshot, menu.`);
  }
}

async function waitForTests(project: Project, timeoutSeconds: number): Promise<string> {
  const deadline = Date.now() + timeoutSeconds * 1000;
  let seenRunning = false;

  while (Date.now() < deadline) {
    try {
      const current = await status(project);
      const state = current.tests?.state;
      if (state === 'running') seenRunning = true;
      // A test run reloads the domain, so 'done' can appear before the first poll lands.
      if (state === 'done' && current.tests?.resultsFile) return current.tests.resultsFile;
      if (state === 'idle' && seenRunning) throw new Error('Run ended without results.');
    } catch (error) {
      if (error instanceof Error && error.message.includes('without results')) throw error;
    }
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }
  throw new Error(`Tests still running after ${timeoutSeconds}s.`);
}

async function waitForGone(file: string, timeoutSeconds: number): Promise<boolean> {
  const deadline = Date.now() + timeoutSeconds * 1000;
  while (Date.now() < deadline) {
    if (!fs.existsSync(file)) return true;
    await new Promise((resolve) => setTimeout(resolve, 500));
  }
  return false;
}

async function waitForFile(file: string, timeoutSeconds: number): Promise<boolean> {
  const deadline = Date.now() + timeoutSeconds * 1000;
  while (Date.now() < deadline) {
    if (fs.existsSync(file) && fs.statSync(file).size > 0) return true;
    await new Promise((resolve) => setTimeout(resolve, 500));
  }
  return false;
}
