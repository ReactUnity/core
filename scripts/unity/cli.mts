// Headless Unity driver: `pnpm unity <command>`. Exists so a change to the C#
// packages can be compiled and tested without opening the Editor, and so the
// output is small enough to read. See .claude/skills/unity for when to use what.
import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { parseArgs } from 'node:util';
import { bridge } from './bridge.mts';
import { listEditors, resolveEditor } from './editors.mts';
import { type LogReport, parseLog, parseTestResults } from './parse.mts';
import { getProject, lockHolder, type Project, repoRoot, restoreChurn, snapshotChurn } from './project.mts';
import { rel, reportLog, reportTests } from './report.mts';

// Logs/ is gitignored repo-wide, and the paths are stable so a failed run can be
// re-read without re-running it.
const outDir = path.join(repoRoot, 'Logs', 'unity');

const { values: flags, positionals } = parseArgs({
  allowPositionals: true,
  options: {
    platform: { type: 'string', default: 'All' },
    filter: { type: 'string' },
    assemblies: { type: 'string' },
    'overwrite-snapshots': { type: 'boolean', default: false },
    nographics: { type: 'boolean', default: false },
    // Declared as its own flag, not `restore` with a default: parseArgs has no --no-x
    // negation and throws ERR_PARSE_ARGS_UNKNOWN_OPTION on one.
    'no-restore': { type: 'boolean', default: false },
    verbose: { type: 'boolean', default: false },
    timeout: { type: 'string' },
    help: { type: 'boolean', default: false, short: 'h' },
    // bridge-only
    level: { type: 'string' },
    limit: { type: 'string' },
    path: { type: 'string' },
    supersize: { type: 'string' },
  },
});

// `bridge` takes an action of its own, so the project shifts one place right:
// `unity bridge status kitchen-sink`.
const [command = 'help', second, third] = positionals;
const bridgeAction = command === 'bridge' ? (second ?? 'status') : undefined;
const projectName = (command === 'bridge' ? third : second) ?? 'tests';

const USAGE = `pnpm unity <command> [project] [options]

Commands:
  compile [tests|kitchen-sink]  Compile the project's scripts and report C# errors
  test    [tests|kitchen-sink]  Run the Unity test suites and report failures
  open    [tests|kitchen-sink]  Launch the Editor GUI (detached, returns immediately)
  editors                       List installed Unity editors

  bridge <action> [project]     Drive an Editor that is already open. Actions:
    status      compile errors, play state, whether the Editor is busy
    logs        recent console entries (--level error|warning, --limit N)
    refresh     reimport + recompile, then report errors
    test        run a suite in the open Editor (--platform, --filter)
    play|stop   enter or leave play mode
    screenshot  capture to --path (needs a rendering Editor; play mode is safest)
    menu        run a menu item, e.g. --path "React/Tests/Overwrite Snapshots"
    quit        close the Editor and wait for the project lock to clear

Options:
  --platform <EditMode|PlayMode|All>  Test mode (default All)
  --filter <pattern>                  NUnit test filter, e.g. ReactUnity.Tests.StyleTests
  --assemblies <A;B>                  Override the assembly list
  --overwrite-snapshots               Regenerate rendering snapshots instead of comparing
  --nographics                        Skip GPU init; faster, but snapshot tests go Inconclusive
  --no-restore                        Keep the project files Unity rewrites (breaks CI if committed)
  --verbose                           Stream the whole Unity log
  --timeout <seconds>                 Kill the run after this long

Environment:
  UNITY_VERSION       Editor version to use (default 6000.5.5f1)
  UNITY_EDITOR_PATH   Absolute path to Unity.exe, bypassing version lookup`;

async function main() {
  if (flags.help || command === 'help') return console.log(USAGE);

  if (command === 'editors') {
    for (const editor of listEditors()) console.log(`${editor.version.padEnd(14)} ${editor.exe}`);
    return;
  }

  const project = getProject(projectName);

  if (command === 'open') return openEditor(project);
  if (command === 'compile') return await compile(project);
  if (command === 'test') return await test(project);
  if (command === 'bridge') {
    return await bridge(project, bridgeAction as string, {
      level: flags.level,
      limit: flags.limit,
      path: flags.path,
      supersize: flags.supersize,
      platform: flags.platform === 'All' ? undefined : flags.platform,
      filter: flags.filter,
      assemblies: flags.assemblies,
      timeout: flags.timeout,
    });
  }

  console.error(`Unknown command '${command}'.\n\n${USAGE}`);
  process.exitCode = 1;
}

function openEditor(project: Project) {
  const held = lockHolder(project);
  if (held) return console.log(`${project.name} is already open in ${held}.`);

  const editor = resolveEditor(project.version);
  console.log(`Opening ${project.name} in Unity ${editor.version}...`);
  // Detached: the Editor outlives this process, which is the point.
  spawn(editor.exe, ['-projectPath', project.path], { detached: true, stdio: 'ignore' }).unref();
}

async function compile(project: Project) {
  // No custom C# involved: batchmode compiles every assembly on startup, so the log
  // is the report. An -executeMethod hook would be in the assembly that failed.
  const { log, code } = await runUnity(project, {
    label: 'compile',
    args: ['-quit', '-nographics'],
    timeoutSeconds: Number(flags.timeout ?? 600),
  });

  reportLog(log);
  if (log.compileErrors.length || log.packageErrors.length) {
    process.exitCode = 1;
    return;
  }

  // The exit code is authoritative, not the absence of parsed errors. Unity fails before it
  // compiles anything for reasons that produce no error line at all -- a project already open
  // being the common one -- and reporting that as "no errors" is a false green.
  if (code !== 0) {
    console.error(`\nUnity exited ${code} without reporting an error. See ${rel(path.join(outDir, `${project.name}-compile.log`))}.`);
    process.exitCode = 1;
    return;
  }

  console.log('Compiled with no errors.');
}

async function test(project: Project) {
  // `All` is game-ci's word, not Unity's: -testPlatform takes EditMode, PlayMode or a
  // build target, and anything else exits 4 (PlatformNotFound) in seconds. Two runs.
  const platforms = (flags.platform ?? 'All') === 'All' ? ['EditMode', 'PlayMode'] : [flags.platform as string];
  let anyFailed = false;

  for (const platform of platforms) {
    const resultsFile = path.join(outDir, `${project.name}-${platform}.xml`);
    fs.rmSync(resultsFile, { force: true });

    const args = ['-runTests', '-testPlatform', platform, '-testResults', resultsFile];
    const assemblies = flags.assemblies ?? project.assemblies;
    if (assemblies) args.push('-assemblyNames', assemblies);
    if (flags.filter) args.push('-testFilter', flags.filter);
    // Snapshot asserts go Inconclusive without a graphics device, so graphics stay on
    // unless asked otherwise -- the opposite of the compile default.
    if (flags.nographics) args.push('-nographics');
    if (flags['overwrite-snapshots']) args.push('-reactOverwriteSnapshots');

    console.log(`\n--- ${platform} ---`);
    const { log, code } = await runUnity(project, { label: `test-${platform}`, args, timeoutSeconds: Number(flags.timeout ?? 3600) });

    const results = parseTestResults(resultsFile);
    // Exceptions only when something actually went wrong: the suites deliberately feed the
    // engines bad JS, so a green run logs several and none of them mean anything.
    reportLog(log, { exceptions: !results || results.failed > 0 });

    if (!results) {
      console.error(`\nNo ${platform} results at ${rel(resultsFile)} (Unity exited ${code}).`);
      console.error('Zero results means the project failed to load or the run never started -- not that the suite passed.');
      anyFailed = true;
      continue;
    }

    reportTests(results, resultsFile);
    if (results.failed > 0 || results.total === 0) anyFailed = true;
  }

  if (anyFailed) process.exitCode = 1;
}

type RunOptions = { label: string; args: string[]; timeoutSeconds: number };

async function runUnity(project: Project, options: RunOptions): Promise<{ log: LogReport; code: number | null }> {
  const held = lockHolder(project);
  if (held) {
    console.error(`${project.name} is open in ${held}. Batch mode needs the project lock -- close that Editor, or drive`);
    console.error(`the running one instead: pnpm unity bridge status ${project.name}`);
    process.exitCode = 1;
    process.exit();
  }

  const editor = resolveEditor(project.version);
  fs.mkdirSync(outDir, { recursive: true });
  const logFile = path.join(outDir, `${project.name}-${options.label}.log`);
  fs.rmSync(logFile, { force: true });

  const args = ['-batchmode', '-projectPath', project.path, '-logFile', logFile, ...options.args];
  console.log(`Unity ${editor.version} ${options.label} on ${project.name} -> ${rel(logFile)}`);

  const churn = flags['no-restore'] ? undefined : snapshotChurn(project);
  const started = Date.now();
  const child = spawn(editor.exe, args, { stdio: 'ignore' });
  const stopTail = tailLog(logFile, started);

  const code = await new Promise<number | null>((resolve) => {
    const timer = setTimeout(() => {
      console.error(`\nTimed out after ${options.timeoutSeconds}s; killing Unity.`);
      child.kill();
    }, options.timeoutSeconds * 1000);

    child.on('exit', (exitCode) => {
      clearTimeout(timer);
      resolve(exitCode);
    });
    child.on('error', (error) => {
      clearTimeout(timer);
      console.error(String(error));
      resolve(null);
    });
  });

  stopTail();
  console.log(`Unity exited ${code} after ${Math.round((Date.now() - started) / 1000)}s.`);

  if (churn) {
    const { restored, created } = restoreChurn(project, churn);
    if (restored.length) console.log(`Restored ${restored.length} project file(s) Unity rewrote: ${restored.join(', ')}`);
    if (created.length) console.log(`Unity created (left in place, check git status): ${created.join(', ')}`);
  }

  return { log: parseLog(logFile), code };
}

// Live feedback without the firehose: poll the growing log and echo only the lines
// that say something. --verbose echoes everything instead.
function tailLog(logFile: string, started: number): () => void {
  const interesting =
    /error CS|\[Package Manager\].*(error|failed)|Cannot resolve|Compilation failed|Refresh completed|Begin MonoManager|Running tests|Test execution|Batchmode quit|Exception:/i;
  let offset = 0;

  const timer = setInterval(() => {
    let chunk = '';
    try {
      const size = fs.statSync(logFile).size;
      if (size <= offset) return;
      const handle = fs.openSync(logFile, 'r');
      const buffer = Buffer.alloc(size - offset);
      fs.readSync(handle, buffer, 0, buffer.length, offset);
      fs.closeSync(handle);
      offset = size;
      chunk = buffer.toString('utf8');
    } catch {
      return;
    }

    for (const line of chunk.split(/\r?\n/)) {
      if (!line.trim()) continue;
      if (flags.verbose || interesting.test(line)) console.log(`  [${elapsed(started)}] ${line.trim().slice(0, 200)}`);
    }
  }, 2000);

  return () => clearInterval(timer);
}

function elapsed(started: number): string {
  const seconds = Math.round((Date.now() - started) / 1000);
  return `${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`;
}

await main();
