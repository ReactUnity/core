import { ReactUnity, UnityEngine as UnityEngineNS, UnityEditor as UnityEditorNS, System as SystemNS } from './generated';


export type NamespaceMap = {
  'System': typeof SystemNS;
  'UnityEngine': typeof UnityEngineNS;
  'UnityEditor': typeof UnityEditorNS;
  'ReactUnity': typeof ReactUnity;
};

export type Namespace = keyof NamespaceMap;

declare global {
  function importNamespace<T extends Namespace>(namespace: T): NamespaceMap[T];
  const System: typeof SystemNS;
  const UnityEngine: typeof UnityEngineNS;
  const UnityEditor: typeof UnityEditorNS;
}
