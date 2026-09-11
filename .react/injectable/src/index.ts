import * as Material from '@reactunity/material';
import * as ReactUnity from '@reactunity/renderer';
import * as ReactUnityWebGLCompat from '@reactunity/renderer/webgl-compat';
import * as React from 'react';

export interface InjectableGlobals {
  react: typeof React;
  ReactUnity: typeof ReactUnity;
  Material: typeof Material;
  MaterialStyles: () => unknown;
  ReactUnityWebGLCompat: typeof ReactUnityWebGLCompat;
}

// This bundle exists only to carry these five into the harness that scripts/harness.js
// appends to it after the build. A property on globalThis rather than a binding the
// harness reads by name: the harness is appended outside the bundle, and the names inside
// one belong to the bundler.
//
// MaterialStyles used to be `() => require('@reactunity/material/styles')`, which webpack's
// style-loader turned into a stylesheet injected on the spot. Vite has nowhere to put
// extracted CSS in a single-file bundle, and nothing in the suite asks for it, so the
// stylesheet is no longer part of the harness. A fixture that wants it can render a
// `<style>` of its own.
const injectable: InjectableGlobals = {
  react: React,
  ReactUnity,
  Material,
  MaterialStyles: () => ({}),
  ReactUnityWebGLCompat,
};

(globalThis as unknown as { __reactUnityInjectable: InjectableGlobals }).__reactUnityInjectable = injectable;
