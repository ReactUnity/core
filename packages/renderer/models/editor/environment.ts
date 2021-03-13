import { ObjectDictionary } from '../context';
import { ReactUnity } from '../generated';

declare global {
  const Globals: ObjectDictionary & {
    Editor: ReactUnity.Editor.Renderer.ReactWindow;
  };
}
