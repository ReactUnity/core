import type { UnityInstance } from 'react-unity-webgl/declarations/unity-instance';
import { ReactUnity, System, UnityEditor, UnityEngine, Yoga } from '../generated';

export type NamespaceMap = {
  [key: string]: any;
  System: typeof System;
  UnityEngine: typeof UnityEngine;
  UnityEditor: typeof UnityEditor;
  ReactUnity: typeof ReactUnity;
  Yoga: typeof Yoga;
};

export type Namespace = keyof NamespaceMap;

declare global {
  interface DefaultInterop {
    System: typeof System;
    UnityEngine: typeof UnityEngine;
    UnityEditor: typeof UnityEditor;
    ReactUnity: typeof ReactUnity;
    Yoga: typeof Yoga;
  }

  var Interop: ReactUnity.Helpers.ReactInterop & DefaultInterop;

  var ReactUnityWebGLCompat: UnityInstance;

  var $$webglWindow: typeof globalThis | undefined;
}
