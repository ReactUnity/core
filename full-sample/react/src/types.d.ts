import { UnityEngine } from '@reactunity/renderer';

declare global {
  interface DefaultGlobals {
    renderCamera: UnityEngine.GameObject;
    cameraRoot: UnityEngine.GameObject;
  }
}


declare module 'react/jsx-runtime' {
  namespace JSX {
    interface IntrinsicElements {
      // Add your custom elements here
    }
  }
}
