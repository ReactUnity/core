import { ReactUnity } from '../generated';

declare global {
  interface DefaultGlobals {
    [key: string]: any;
    Editor: ReactUnity.Editor.Renderer.ReactWindow;
  }

  const Globals: DefaultGlobals;
}
