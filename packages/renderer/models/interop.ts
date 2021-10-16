import { Facebook, ReactUnity, System, UnityEditor, UnityEngine } from './generated';

export type NamespaceMap = {
  [key: string]: any;
  System: typeof System;
  UnityEngine: typeof UnityEngine;
  UnityEditor: typeof UnityEditor;
  ReactUnity: typeof ReactUnity;
  Facebook: typeof Facebook;
};

export type Namespace = keyof NamespaceMap;

declare global {
  interface DefaultInterop {
    System: typeof System;
    UnityEngine: typeof UnityEngine;
    UnityEditor: typeof UnityEditor;
    ReactUnity: typeof ReactUnity;
    Facebook: typeof Facebook;
  }

  var Interop: ReactUnity.Helpers.ReactInterop & DefaultInterop;
}
