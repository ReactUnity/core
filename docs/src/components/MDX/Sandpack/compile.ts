import * as Babel from '@babel/standalone';

export interface CompiledCode {
  code: string;
  style: string;
  compiledCode?: string;
  error?: any;
}

type TransformFn = (x: string) => string | null | undefined;
/*
 * `runtime: 'classic'` is not the default any more -- Babel 8 flipped preset-react over to
 * the automatic runtime, which emits `require('react/jsx-runtime')`. The player runs the
 * result through the injectable wrapper's tiny require shim
 * (unity/core/.react/injectable/scripts/injected-code.js), which knows nothing about
 * `react/jsx-runtime` and hands back undefined, so every example died on
 * "Cannot read properties of undefined (reading 'jsx')". Classic emits
 * `React.createElement`, and the wrapper puts `React` on globalThis.
 */
const transformJsxToES5: TransformFn = (code: string) =>
  Babel.transform(code, {
    presets: ['es2015', ['react', { runtime: 'classic' }]],
  }).code;
const identity: TransformFn = (x) => x;

const defaultTransforms: Record<string, TransformFn> = {
  js: transformJsxToES5,
  jsx: transformJsxToES5,
};

export const compile = (code: string, extension: string) => {
  const transform = defaultTransforms[extension] || identity;

  try {
    const compiledCode = transform(code);
    return { compiledCode, code };
  } catch (err) {
    return { code, error: err };
  }
};
