import { UnityEngine } from '@reactunity/renderer';

declare global {
  interface DefaultGlobals {
    renderCamera: UnityEngine.GameObject;
    cameraRoot: UnityEngine.GameObject;
  }
}


declare global {
  interface ReactUnityCustomElements {
    // Add your custom native elements here
    // mycomp: { myprop?: number };
  }

  interface ReactUnityCustomAttributes {
    // Add your custom native elements here. May be required for some libraries like @emotion/react.
    // See twin.d.ts file for an example.
    // css?: CSSProp;
  }
}
