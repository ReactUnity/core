// Headless Unity driver: `pnpm unity <command>`. Exists so a change to the C#
// packages can be compiled and tested without opening the Editor, and so the
// output is small enough to read. See .claude/skills/unity for when to use what.
import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { parseArgs } from 'node:util';
import { listEditors, resolveEditor } from './editors.mts';
import { type LogReport, parseLog, parseProbe, parseTestResults } from './parse.mts';
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
    // player-only
    backend: { type: 'string', default: 'il2cpp' },
    stripping: { type: 'string' },
    graphics: { type: 'boolean', default: false },
    'skip-build': { type: 'boolean', default: false },
    // Declared as its own flag, not `restore` with a default: parseArgs has no --no-x
    // negation and throws ERR_PARSE_ARGS_UNKNOWN_OPTION on one.
    'no-restore': { type: 'boolean', default: false },
    verbose: { type: 'boolean', default: false },
    timeout: { type: 'string' },
    help: { type: 'boolean', default: false, short: 'h' },
  },
});

const [command = 'help', second] = positionals;
const projectName = second ?? 'tests';

const USAGE = `pnpm unity <command> [project] [options]

Commands:
  compile [tests|kitchen-sink]  Compile the project's scripts and report C# errors
  test    [tests|kitchen-sink]  Run the Unity test suites and report failures
  player  [tests|kitchen-sink]  Build a standalone player and probe the JS engines inside it
  open    [tests|kitchen-sink]  Launch the Editor GUI (detached, returns immediately)
  editors                       List installed Unity editors

An Editor that is already open belongs to Unity's own CLI, not to this one:
  unity status                          which Editors are up, and whether they are ready
  unity command --project-path <path>   the ~140 commands that Editor exposes
See .claude/skills/unity for the mapping.

Options (player):
  --backend <il2cpp|mono>             Scripting backend to build with (default il2cpp)
  --stripping <level>                 Managed stripping level: Disabled, Minimal, Low, Medium, High
  --graphics                          Give the player a graphics device (default headless)
  --skip-build                        Run the player already at the output path

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
  UNITY_VERSION       Editor version to use (default: the project's ProjectVersion.txt)
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
  if (command === 'player') return await player(project);

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

/**
 * Builds a standalone player and runs the probe inside it. This is the only check here that
 * covers IL2CPP: the Editor is always Mono, so nothing `test` reports says anything about a
 * P/Invoke stub the AOT compiler had to generate, or a type the managed stripper deleted.
 */
async function player(project: Project) {
  const backend = (flags.backend ?? 'il2cpp').toLowerCase();
  if (backend !== 'il2cpp' && backend !== 'mono') {
    console.error(`--backend takes il2cpp or mono, not '${backend}'.`);
    process.exitCode = 1;
    return;
  }

  const outputDir = path.join(outDir, `player-${project.name}-${backend}`);
  let executable = findPlayer(outputDir);

  if (!flags['skip-build']) {
    const label = `player-build-${backend}`;
    const args = [
      '-quit',
      '-nographics',
      '-executeMethod',
      'ReactUnity.Editor.Developer.PlayerBuilder.Build',
      '-reactBackend',
      backend,
      '-reactPlayerPath',
      outputDir,
    ];
    if (flags.stripping) args.push('-reactStripping', flags.stripping);

    // An IL2CPP build compiles the whole managed surface to C++ and then builds it, so it is
    // minutes rather than the seconds `compile` takes.
    const { log, code } = await runUnity(project, { label, args, timeoutSeconds: Number(flags.timeout ?? 3600) });
    reportLog(log);

    executable = builtPath(path.join(outDir, `${project.name}-${label}.log`)) ?? findPlayer(outputDir);
    if (code !== 0 || !executable) {
      console.error(
        `\nThe ${backend} player did not build (Unity exited ${code}). See ${rel(path.join(outDir, `${project.name}-${label}.log`))}.`,
      );
      process.exitCode = 1;
      return;
    }
  }

  if (!executable) {
    console.error(`No player at ${rel(outputDir)}. Drop --skip-build to build one.`);
    process.exitCode = 1;
    return;
  }

  const playerLog = path.join(outDir, `${project.name}-player-${backend}.log`);
  fs.rmSync(playerLog, { force: true });

  // The probe quits the player itself, so the timeout is a backstop rather than the plan.
  const args = ['-logFile', playerLog, '-reactProbe'];
  if (!flags.graphics) args.push('-batchmode', '-nographics');

  console.log(`\nRunning ${rel(executable)} -> ${rel(playerLog)}`);
  const started = Date.now();
  const child = spawn(executable, args, { cwd: path.dirname(executable), stdio: 'ignore' });
  const stopTail = tailLog(playerLog, started);
  const code = await new Promise<number | null>((resolve) => {
    const timer = setTimeout(
      () => {
        console.error('\nThe player did not exit; killing it. The probe writes its verdict before quitting, so read on.');
        child.kill();
      },
      Number(flags.timeout ?? 300) * 1000,
    );
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
  console.log(`Player exited ${code} after ${Math.round((Date.now() - started) / 1000)}s.`);

  const probe = parseProbe(playerLog);
  reportLog(parseLog(playerLog));

  if (!probe.result) {
    console.error(
      `\nThe probe never reported. Its ${probe.engines.length ? 'run was cut short' : 'code was not in the player'} -- REACT_UNITY_DEVELOPER`,
    );
    console.error(`has to be defined for Standalone, and the player needs a scene. Full log: ${rel(playerLog)}`);
    process.exitCode = 1;
    return;
  }

  // The whole point is the backend, so a run that silently fell back to Mono is a failure and
  // not a pass. The player reports what ENABLE_IL2CPP actually was, which is the only honest source.
  if (probe.backend !== backend) {
    console.error(`\nAsked for ${backend}, but the player was built as ${probe.backend}. Nothing here is a ${backend} result.`);
    process.exitCode = 1;
    return;
  }

  console.log(`\n${probe.backend} player, ${probe.engines.length} engine(s):`);
  for (const engine of probe.engines) {
    console.log(`  ${engine.name.padEnd(12)} ${engine.checks - engine.failed}/${engine.checks} checks`);
  }
  for (const failure of probe.failures) console.error(`  ${failure}`);

  if (probe.result === 'pass') return console.log(`\nEvery check passed under ${backend}.`);
  console.error(`\n${probe.failures.length} check(s) failed under ${backend}. Full log: ${rel(playerLog)}`);
  process.exitCode = 1;
}

/** The path PlayerBuilder logged, which beats guessing the executable name from the product name. */
function builtPath(buildLog: string): string | undefined {
  try {
    const match = /^\[player\] built=(.+)$/m.exec(fs.readFileSync(buildLog, 'utf8'));
    const built = match?.[1].trim();
    return built && fs.existsSync(built) ? built : undefined;
  } catch {
    return undefined;
  }
}

function findPlayer(outputDir: string): string | undefined {
  try {
    // UnityCrashHandler64.exe ships beside the player, so the name is not enough on its own.
    const candidates = fs.readdirSync(outputDir).filter((name) => name.endsWith('.exe') && !name.startsWith('UnityCrashHandler'));
    return candidates.length === 1 ? path.join(outputDir, candidates[0]) : undefined;
  } catch {
    return undefined;
  }
}

type RunOptions = { label: string; args: string[]; timeoutSeconds: number };

async function runUnity(project: Project, options: RunOptions): Promise<{ log: LogReport; code: number | null }> {
  const held = lockHolder(project);
  if (held) {
    console.error(`${project.name} is open in ${held}. Batch mode needs the project lock -- close that Editor, or drive`);
    console.error(`the running one instead: unity command --project-path ${project.path}`);
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
    const { restored, created } = restoreChurn(churn);
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
