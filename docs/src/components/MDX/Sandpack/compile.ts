import * as Babel from '@babel/standalone';

export interface CompiledCode {
  code: string;
  style: string;
  compiledCode?: string;
  error?: any;
}

type TransformFn = (x: string) => string | null | undefined;
const transformJsxToES5: TransformFn = (code: string) => Babel.transform(code, { presets: ['es2015', 'react'] }).code;
const identity: TransformFn = x => x;

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
