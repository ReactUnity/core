/*
 * Shiki themes that reproduce the Sandpack palette.
 *
 * Standalone code fences used to be highlighted by the same CodeMirror grammars the
 * Sandpack editor uses (see the old src/components/MDX/CodeBlock), which is how the
 * two ended up looking identical. Astro highlights fences with Shiki at build time
 * instead, so the palette is restated here as a pair of TextMate themes -- the values
 * are the `--sp-syntax-color-*` variables from src/styles/sandpack.css, so an inline
 * fence and the editor next to it still agree.
 */

const light = {
  plain: '#24292e',
  comment: '#6a737d',
  keyword: '#d73a49',
  tag: '#22863a',
  punctuation: '#24292e',
  definition: '#6f42c1',
  property: '#005cc5',
  static: '#032f62',
  string: '#032f62',
  // .bg-wash
  background: '#ffffff',
};

const dark = {
  plain: '#ffffff',
  comment: '#757575',
  keyword: '#77b7d7',
  tag: '#dfab5c',
  punctuation: '#ffffff',
  definition: '#86d9ca',
  property: '#77b7d7',
  static: '#c64640',
  string: '#977cdc',
  // .dark:bg-gray-95
  background: '#16181d',
};

/**
 * CodeMirror's highlighter works off a handful of coarse tags; TextMate scopes are
 * much finer grained, so each of those tags maps to the group of scopes that carries
 * the same meaning. Anything unlisted falls through to `plain`.
 */
function toTheme(name, type, p) {
  return {
    name,
    type,
    colors: {
      'editor.background': p.background,
      'editor.foreground': p.plain,
    },
    tokenColors: [
      {
        scope: ['comment', 'punctuation.definition.comment'],
        settings: { foreground: p.comment },
      },
      {
        scope: [
          'keyword',
          'storage',
          'storage.type',
          'keyword.control',
          'keyword.operator.new',
          'variable.language.this',
        ],
        settings: { foreground: p.keyword },
      },
      {
        scope: [
          'string',
          'string.quoted',
          'string.template',
          'punctuation.definition.string',
        ],
        settings: { foreground: p.string },
      },
      {
        scope: [
          'constant.numeric',
          'constant.language',
          'constant.character',
          'support.constant',
        ],
        settings: { foreground: p.static },
      },
      {
        scope: ['entity.name.tag', 'support.class.component'],
        settings: { foreground: p.tag },
      },
      {
        scope: [
          'entity.name.function',
          'support.function',
          'variable.function',
          'entity.name.type',
          'entity.name.class',
        ],
        settings: { foreground: p.definition },
      },
      {
        scope: [
          'variable.other.property',
          'meta.object-literal.key',
          'support.type.property-name',
          'entity.other.attribute-name',
          'support.type.vendored.property-name',
        ],
        settings: { foreground: p.property },
      },
      {
        scope: ['punctuation', 'meta.brace', 'keyword.operator'],
        settings: { foreground: p.punctuation },
      },
      {
        scope: ['variable', 'variable.other', 'source'],
        settings: { foreground: p.plain },
      },
    ],
  };
}

export const sandpackShikiThemes = {
  light: toTheme('sandpack-light', 'light', light),
  dark: toTheme('sandpack-dark', 'dark', dark),
};
