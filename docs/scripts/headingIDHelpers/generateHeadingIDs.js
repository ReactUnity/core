/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 */

// To do: properly check heading numbers (headings with the same text get
// numbered, this script doesn’t check that).

import assert from 'node:assert';
import fs from 'node:fs';
import { slug as toSlug } from 'github-slugger';
import { toString } from 'mdast-util-to-string';
import remarkParse from 'remark-parse';
import { unified } from 'unified';
import walk from './walk.js';

/*
 * The id a heading gets when it has none is the one GitHub would generate for the same
 * text, so anchors keep working for anyone who linked to the rendered markdown. That used
 * to come from remark-slug, which is deprecated and unmaintained; parsing the heading and
 * slugging its text is what remark-slug did.
 */
const parser = unified().use(remarkParse);

function autoIdFor(headingLine) {
  const tree = parser.parse(headingLine);
  const head = tree.children[0];
  assert(
    head && head.type === 'heading',
    `expected \`${headingLine}\` to be a heading, is it using a normal space after \`#\`?`
  );
  return toSlug(toString(head));
}

function addHeaderID(line) {
  // check if we're a header at all
  if (!line.startsWith('#')) {
    return line;
  }

  const match =
    /^(#+\s+)(.+?)(\s*\{(?:\/\*|#)([^\}\*\/]+)(?:\*\/)?\}\s*)?$/.exec(line);
  const before = match[1] + match[2];
  const autoId = autoIdFor(before);
  const existingId = match[4];
  const id = existingId || autoId;
  // Ignore numbers:
  const cleanExisting = existingId
    ? existingId.replace(/-\d+$/, '')
    : undefined;
  const cleanAuto = autoId.replace(/-\d+$/, '');

  if (cleanExisting && cleanExisting !== cleanAuto) {
    console.log(
      'Note: heading `%s` has a different ID (`%s`) than what GH generates for it: `%s`:',
      before,
      existingId,
      autoId
    );
  }

  return `${match[1] + match[2]} {/*${id}*/}`;
}

function addHeaderIDs(lines) {
  let inCode = false;
  const results = [];
  lines.forEach((line) => {
    // Ignore code blocks
    if (line.startsWith('```')) {
      inCode = !inCode;
      results.push(line);
      return;
    }
    if (inCode) {
      results.push(line);
      return;
    }

    /*
     * Most content files here are committed with CRLF endings -- there is no
     * .gitattributes and core.autocrlf is off, so the bytes in the repo are the bytes on
     * disk. Splitting the file on '\n' leaves a '\r' at the end of every line, and the
     * heading pattern in addHeaderID ends in `\s*$`, which would swallow it and write the
     * line back as LF: every heading would show up in the diff as a line-ending change on
     * top of the id it gained. Carry the '\r' around the rewrite instead. (react.dev,
     * where this script comes from, is LF-only and never had to.)
     */
    const eol = line.endsWith('\r') ? '\r' : '';
    results.push(addHeaderID(eol ? line.slice(0, -1) : line) + eol);
  });
  return results;
}

export default async function main(paths) {
  paths = paths.length === 0 ? ['src/content'] : paths;
  const files = paths.flatMap((path) => [...walk(path)]);

  files.forEach((file) => {
    if (!(file.endsWith('.md') || file.endsWith('.mdx'))) {
      return;
    }

    const content = fs.readFileSync(file, 'utf8');
    const updatedLines = addHeaderIDs(content.split('\n'));
    fs.writeFileSync(file, updatedLines.join('\n'));
  });
}
