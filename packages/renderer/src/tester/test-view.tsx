import * as React from 'react';
import { ReactUnity } from '../../models/generated';

export const TestView = React.forwardRef<ReactUnity.Components.ContainerComponent, React.Props<{ children: React.Component }>>((props, ref) => {
  return <view ref={ref}>{
    props.children
  }</view>;
});
