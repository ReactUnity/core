// <reference types="react-unity-webgl" />

import { forwardRef, useImperativeHandle } from 'react';
import type { UnityConfig } from 'react-unity-webgl';
// react-unity-webgl 10 dropped UnityProps from its root exports, and stopped exporting a
// WebGLContextAttributes type at all -- the shape only survives inline on UnityConfig. Both
// names are part of this module's own surface, so they are re-derived rather than dropped.
import type { UnityProps } from 'react-unity-webgl/distribution/types/unity-props';

type WebGLContextAttributes = NonNullable<UnityConfig['webglContextAttributes']>;

export { UnityContext, useUnityContext } from './use-unity-context';
export type { UnityConfig, UnityConfig as IUnityConfig, UnityProps, WebGLContextAttributes };

export const Unity = forwardRef<Record<string, unknown>, UnityProps>(function Unity(props, ref) {
  useImperativeHandle(ref, () => ({}));
  return <></>;
});
