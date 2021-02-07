import * as React from 'react';
import { Renderer } from '../renderer/renderer';
import { TestView } from './test-view';
import { NativeInstance } from '../../models/renderer';

export function testRender(element: React.ReactNode) {
  return new Promise<NativeInstance>((resolve) => {
    const ref = React.createRef<NativeInstance>();
    Renderer.render(<TestView ref={ref}>{element}</TestView>, null, () => {
      resolve(ref.current);
    });
  });
}
