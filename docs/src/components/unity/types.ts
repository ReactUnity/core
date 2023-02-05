export interface UnityInstance {
  SendMessage: (
    objectName: string,
    methodName: string,
    argument?: string | number
  ) => void;
  SetFullscreen: (toggle: 0 | 1) => void;
  Quit: () => Promise<void>;
}

export interface UnityAPI extends UnityInstance {
  SetReactScript: (jsx: string, css: string) => void;
  ReplaceCSS: (css: string) => void;
  LoadScene: (sceneName: string) => void;
  ReloadScene: () => void;
}

declare global {
  function createUnityInstance(
    canvas: any,
    props: any,
    progressCallback: (progress: number) => void
  ): Promise<UnityInstance>;
}

export function isLoaderScriptLoaded() {
  return typeof global.createUnityInstance === 'function';
}

export const defaultUnityInstanceName = 'injectable';
