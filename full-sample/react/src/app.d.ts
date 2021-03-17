import { UnityEngine } from '@reactunity/renderer';

declare global {
  interface DefaultGlobals {
    renderCamera: UnityEngine.GameObject;
    cameraRoot: UnityEngine.GameObject;
  };
}
