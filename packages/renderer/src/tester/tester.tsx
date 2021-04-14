import * as React from 'react';
import { ReactUnity } from '../../models/generated';
import { Renderer } from '../renderer/renderer';
import { TestView } from './test-view';

export function testRender(element: React.ReactNode) {
  return new Promise<ReactUnity.Components.ContainerComponent>((resolve) => {
    const ref = React.createRef<ReactUnity.Components.ContainerComponent>();
    Renderer.render(<TestView ref={ref}>{element}</TestView>, null, () => {
      resolve(ref.current);
    });
  });
}
