// <reference types="react-unity-webgl" />

import { forwardRef, useImperativeHandle } from 'react';
import type { UnityConfig, UnityProps, WebGLContextAttributes } from 'react-unity-webgl';

export { UnityContext, useUnityContext } from './use-unity-context';
export type { UnityProps, UnityConfig, WebGLContextAttributes, UnityConfig as IUnityConfig };

export const Unity = forwardRef<Record<string, unknown>, UnityProps>(function Unity(props, ref) {
  useImperativeHandle(ref, () => ({}));
  return <></>;
});
