/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 */
import fs from 'node:fs';
import walk from './walk.js';

/**
 * Validate if there is a custom heading id and exit if there isn't a heading
 * @param {string} line
 * @returns
 */
function validateHeaderId(line) {
  if (!line.startsWith('#')) {
    return;
  }

  const match = /\{\/\*(.*?)\*\/}/.exec(line);
  if (!match) {
    console.error('Run pnpm fix-headings to generate headings.');
    process.exit(1);
  }
}

/**
 * Loops through the lines to skip code blocks
 * @param {Array<string>} lines
 */
function validateHeaderIds(lines) {
  let inCode = false;
  lines.forEach((line) => {
    // Ignore code blocks
    if (line.startsWith('```')) {
      inCode = !inCode;
      return;
    }
    if (inCode) {
      return;
    }
    validateHeaderId(line);
  });
}

/**
 * paths are basically array of path for which we have to validate heading IDs
 * @param {Array<string>} paths
 */
export default async function main(paths) {
  paths = paths.length === 0 ? ['src/content'] : paths;
  const files = paths.flatMap((path) => [...walk(path)]);

  files.forEach((file) => {
    if (!(file.endsWith('.md') || file.endsWith('.mdx'))) {
      return;
    }

    const content = fs.readFileSync(file, 'utf8');
    validateHeaderIds(content.split('\n'));
  });
}
