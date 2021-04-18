import { ReactUnity, UnityEditor } from '../generated';

declare global {
  interface DefaultGlobals {
    [key: string]: any;
    Window?: ReactUnity.Editor.Renderer.ReactWindow;
    Inspector?: ReactUnity.Editor.Renderer.ReactInspector;
    Drawer?: ReactUnity.Editor.Renderer.ReactProperty;
    Property?: UnityEditor.SerializedProperty;
  }

  const Globals: DefaultGlobals;
}
