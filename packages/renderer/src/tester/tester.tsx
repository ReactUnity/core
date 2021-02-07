import * as React from 'react';
import { Renderer } from '../renderer/renderer';
import { TestView } from './test-view';
import { ReactUnity } from '../../models/generated';

export function testRender(element: React.ReactNode) {
  return new Promise<ReactUnity.Components.ContainerComponent>((resolve) => {
    const ref = React.createRef<ReactUnity.Components.ContainerComponent>();
    Renderer.render(<TestView ref={ref}>{element}</TestView>, null, () => {
      resolve(ref.current);
    });
  });
}
