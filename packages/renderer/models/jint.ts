import { Facebook as FacebookNS, ReactUnity as ReactUnityNS, System as SystemNS, UnityEditor as UnityEditorNS, UnityEngine as UnityEngineNS } from './generated';


export type NamespaceMap = {
  [key: string]: any;
  'System': typeof SystemNS;
  'UnityEngine': typeof UnityEngineNS;
  'UnityEditor': typeof UnityEditorNS;
  'ReactUnity': typeof ReactUnityNS;
  'Facebook': typeof FacebookNS;
};

export type Namespace = keyof NamespaceMap;

declare global {
  function importNamespace<T extends Namespace>(namespace: T): NamespaceMap[T];
  function importType(name: string): SystemNS.Type;
  const System: typeof SystemNS;
  const UnityEngine: typeof UnityEngineNS;
  const UnityEditor: typeof UnityEditorNS;
  const ReactUnity: typeof ReactUnityNS;
  const Facebook: typeof FacebookNS;
}
