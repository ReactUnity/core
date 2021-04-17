import { ReactUnity } from '../generated';

declare global {
  interface DefaultGlobals {
    [key: string]: any;
    Window?: ReactUnity.Editor.Renderer.ReactWindow;
    Inspector?: ReactUnity.Editor.Renderer.ReactInspector;
  }

  const Globals: DefaultGlobals;
}
