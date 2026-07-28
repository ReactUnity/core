// Shared output formatting. Both paths -- batch mode and the Editor bridge -- produce the
// same two report shapes, so they print the same way.
import path from 'node:path';
import type { LogReport, TestReport } from './parse.mts';
import { repoRoot } from './project.mts';

export function rel(file: string): string {
  return path.relative(repoRoot, file).replaceAll('\\', '/');
}

export function reportLog(log: LogReport, options: { exceptions: boolean } = { exceptions: true }) {
  if (log.packageErrors.length) {
    console.error(`\n${log.packageErrors.length} package error(s):`);
    for (const error of log.packageErrors) console.error(`  ${error}`);
  }
  if (log.compileErrors.length) {
    console.error(`\n${log.compileErrors.length} compile error(s):`);
    for (const error of log.compileErrors) console.error(`  ${error.file}(${error.line},${error.column}): ${error.code}: ${error.message}`);
  }
  if (options.exceptions && log.exceptions.length) {
    console.error(`\n${log.exceptions.length} exception(s):`);
    for (const exception of log.exceptions.slice(0, 20)) console.error(`  ${exception}`);
  }
}

export function reportTests(results: TestReport, resultsFile: string) {
  console.log(
    `\n${results.passed}/${results.total} passed  (${results.failed} failed, ${results.skipped} skipped, ${results.inconclusive} inconclusive) in ${results.duration}s`,
  );

  for (const failure of results.failures) {
    console.error(`\nFAIL ${failure.name}  [${failure.result}]`);
    for (const line of failure.message.split(/\r?\n/).slice(0, 12)) console.error(`  ${line}`);
    const frames = failure.stack.split(/\r?\n/).filter((frame) => frame.trim());
    for (const frame of frames.slice(0, 4)) console.error(`    ${frame.trim()}`);
  }

  if (results.failed) console.error(`\nFull results: ${rel(resultsFile)}`);
}
