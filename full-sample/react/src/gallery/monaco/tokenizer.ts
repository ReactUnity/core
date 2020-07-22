import type monaco from 'monaco-editor-core';

import { language } from './language';
import { createTokenizationSupport } from 'monaco-editor-core/esm/vs/editor/standalone/common/monarch/monarchLexer.js';
import { compile } from 'monaco-editor-core/esm/vs/editor/standalone/common/monarch/monarchCompile.js';

const languageId = 'typescript';


const lexer = compile(languageId, language as any);
const tokenizer = createTokenizationSupport('', '', languageId, lexer);

export function tokenize(text: string): [string[], monaco.Token[][]] {
  var lines = text.split(/\r\n|\r|\n/);
  var result = [];
  var state = tokenizer.getInitialState();
  for (var i = 0, len = lines.length; i < len; i++) {
    var line = lines[i];
    var tokenizationResult = tokenizer.tokenize(line, state, 0);
    result[i] = tokenizationResult.tokens;
    state = tokenizationResult.endState;
  }
  return [lines, result];
}

export function escape(code: string) {
  return fixLineWrapOpportunity(code.replace('<', '<<b></b>'));
}

export function fixLineWrapOpportunity(code: string) {
  return code.replace(/=/g, '=\u200B');
}


const specialNames = [''];
const specialNameColor = '';
const identifierType = 'identifier.ts';

const typeColors = {
  '': null,
  'keyword.ts': 'blue',
  'literal.ts': 'blue',
  'number.ts': 'blue',
  'string.ts': 'red',
  'Keyword': '#16410A',
  'regexp.ts': 'purple',
  'template.ts': 'red',
  'type.identifier.ts': '#16410A',
};

export function colorizeRichtext(lines: string[], lineTokens: monaco.Token[][]) {

  const sb = [];

  for (let lineIndex = 0; lineIndex < lines.length; lineIndex++) {
    const line = lines[lineIndex];
    const tokens = lineTokens[lineIndex];

    let ind = 0;

    for (let index = 0; index < tokens.length; index++) {
      const token = tokens[index];
      const nextToken = tokens[index + 1];

      const start = token.offset;
      const end = nextToken?.offset || line.length;
      const tok = line.substr(start, end - start);
      let text = escape(tok);

      if (start > ind) {
        sb.push(escape(line.substr(ind, start - ind)));
      }


      if (token.type === identifierType && specialNames.includes(tok))
        text = `<color=${specialNameColor}>${text}</color>`;

      const color = typeColors[token.type];
      if (color) {
        text = `<color=${color}>${text}</color>`;
      }

      sb.push(text);
      ind = end;
    }

    if (ind < line.length) {
      sb.push(escape(line.substring(ind)));
    }

    if (lineIndex < lines.length - 1) sb.push('\n');
  }

  return sb.join('');
}
