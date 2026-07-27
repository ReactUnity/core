/// <reference no-default-lib="true"/>
// es2022, not es2021: ReactUnity's own code (the renderer's diffing, material's
// virtual-scroll, the devtools app) calls Object.hasOwn, and every engine ReactUnity
// ships with -- QuickJS, Jint 3, ClearScript -- implements it.
/// <reference lib="es2022" />
/// <reference types="react" />
/// <reference types="webpack-env" />

declare namespace NodeJS {
  interface ProcessEnv {
    readonly NODE_ENV: 'development' | 'production' | 'test';
    readonly PUBLIC_URL: string;
  }
}

declare module '*.avif' {
  const src: string;
  export default src;
}

declare module '*.bmp' {
  const src: string;
  export default src;
}

declare module '*.gif' {
  const src: string;
  export default src;
}

declare module '*.jpg' {
  const src: string;
  export default src;
}

declare module '*.jpeg' {
  const src: string;
  export default src;
}

declare module '*.png' {
  const src: string;
  export default src;
}

declare module '*.webp' {
  const src: string;
  export default src;
}

declare module '*.svg' {
  import * as React from 'react';

  export const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement> & { title?: string }>;

  const src: string;
  export default src;
}

// Plain stylesheets, imported for their side effects (`import './globals.scss'`). These
// have no exports to describe, but they do have to be declared: TypeScript 6 reports a
// side-effect import of an unresolvable module as an error (TS2882) where earlier versions
// let it through.
declare module '*.css';
declare module '*.scss';
declare module '*.sass';

declare module '*.module.css' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module '*.module.scss' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module '*.module.sass' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module '*.txt' {
  const value: string;
  export default value;
}

declare module '*.html' {
  const value: string;
  export default value;
}

declare module '!!raw-loader!*' {
  const value: string;
  export default value;
}

declare module '!!file-loader!*' {
  const value: string;
  export default value;
}
