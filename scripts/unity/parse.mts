// Turning Unity's two output formats into something small enough to read: a
// 600 KB batchmode log and an NUnit3 result file.
import fs from 'node:fs';

export type CompileError = { file: string; line: number; column: number; code: string; message: string };

const COMPILE_ERROR = /^(.*?)\((\d+),(\d+)\): error (CS\d+|BCE\d+): (.*)$/;

export type LogReport = {
  compileErrors: CompileError[];
  /** Package Manager resolution failures -- these produce zero tests, not a red suite. */
  packageErrors: string[];
  exceptions: string[];
  graphicsDevice?: string;
  screenSize?: string;
};

export function parseLog(logFile: string): LogReport {
  const lines = readLines(logFile);
  const report: LogReport = { compileErrors: [], packageErrors: [], exceptions: [] };
  const seen = new Set<string>();

  for (const line of lines) {
    const compile = COMPILE_ERROR.exec(line);
    if (compile) {
      const key = line.trim();
      if (!seen.has(key)) {
        seen.add(key);
        report.compileErrors.push({
          file: compile[1].trim(),
          line: Number(compile[2]),
          column: Number(compile[3]),
          code: compile[4],
          message: compile[5].trim(),
        });
      }
      continue;
    }

    if (/\[Package Manager\].*(error|failed|cannot be found|Cannot resolve)/i.test(line) || /^Cannot resolve packages/i.test(line)) {
      if (!seen.has(line)) {
        seen.add(line);
        report.packageErrors.push(line.trim());
      }
      continue;
    }

    // Batchmode prints unhandled exceptions without a stack on their own line.
    if (/^(Unhandled exception|\w+(\.\w+)*Exception: )/.test(line) && !seen.has(line)) {
      seen.add(line);
      report.exceptions.push(line.trim());
      continue;
    }

    const device = /^\s*(?:Renderer|GfxDevice):\s*(.+)$/.exec(line);
    if (device) report.graphicsDevice ??= device[1].trim();

    // Snapshot asserts need a >=300x300 screen, so it is worth surfacing.
    const screen = /Desktop is (\d+ x \d+)/.exec(line);
    if (screen) report.screenSize ??= screen[1];
  }

  return report;
}

function readLines(file: string): string[] {
  try {
    return fs.readFileSync(file, 'utf8').split(/\r?\n/);
  } catch {
    return [];
  }
}

export type TestFailure = { name: string; result: string; message: string; stack: string };

export type TestReport = {
  total: number;
  passed: number;
  failed: number;
  skipped: number;
  inconclusive: number;
  duration: string;
  failures: TestFailure[];
};

/**
 * Hand-rolled rather than pulling in an XML parser: only two shapes are read here
 * (the `test-run` summary attributes and failed `test-case` nodes), and test-case
 * elements cannot nest, so finding each one's end is unambiguous.
 */
export function parseTestResults(xmlFile: string): TestReport | undefined {
  let xml: string;
  try {
    xml = fs.readFileSync(xmlFile, 'utf8');
  } catch {
    return undefined;
  }

  const run = /<test-run\b([^>]*)>/.exec(xml);
  const attrs = run ? readAttributes(run[1]) : {};

  const report: TestReport = {
    total: Number(attrs.total ?? 0),
    passed: Number(attrs.passed ?? 0),
    failed: Number(attrs.failed ?? 0),
    skipped: Number(attrs.skipped ?? 0),
    inconclusive: Number(attrs.inconclusive ?? 0),
    duration: attrs.duration ?? '?',
    failures: [],
  };

  for (const testCase of eachTestCase(xml)) {
    const caseAttrs = readAttributes(testCase.startTag);
    if (caseAttrs.result !== 'Failed') continue;
    report.failures.push({
      name: caseAttrs.fullname ?? caseAttrs.name ?? '(unnamed)',
      result: caseAttrs.label ? `${caseAttrs.result}/${caseAttrs.label}` : (caseAttrs.result ?? 'Failed'),
      message: firstElementText(testCase.body, 'message'),
      stack: firstElementText(testCase.body, 'stack-trace'),
    });
  }

  return report;
}

function* eachTestCase(xml: string): Generator<{ startTag: string; body: string }> {
  const opener = /<test-case\b/g;
  let match = opener.exec(xml);
  while (match) {
    const tagEnd = xml.indexOf('>', match.index);
    if (tagEnd < 0) return;
    const startTag = xml.slice(match.index + '<test-case'.length, xml[tagEnd - 1] === '/' ? tagEnd - 1 : tagEnd);
    let body = '';
    if (xml[tagEnd - 1] !== '/') {
      const close = xml.indexOf('</test-case>', tagEnd);
      body = close < 0 ? xml.slice(tagEnd + 1) : xml.slice(tagEnd + 1, close);
    }
    yield { startTag, body };
    opener.lastIndex = tagEnd;
    match = opener.exec(xml);
  }
}

function readAttributes(startTag: string): Record<string, string> {
  const attrs: Record<string, string> = {};
  for (const match of startTag.matchAll(/([\w-]+)="([^"]*)"/g)) attrs[match[1]] = decodeEntities(match[2]);
  return attrs;
}

function firstElementText(body: string, tag: string): string {
  const match = new RegExp(`<${tag}\\b[^>]*>([\\s\\S]*?)</${tag}>`).exec(body);
  if (!match) return '';
  const cdata = /<!\[CDATA\[([\s\S]*?)\]\]>/.exec(match[1]);
  return (cdata ? cdata[1] : decodeEntities(match[1])).trim();
}

function decodeEntities(value: string): string {
  return value
    .replace(/&#x([\da-fA-F]+);/g, (_, hex) => String.fromCodePoint(Number.parseInt(hex, 16)))
    .replace(/&#(\d+);/g, (_, dec) => String.fromCodePoint(Number(dec)))
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&amp;/g, '&');
}
