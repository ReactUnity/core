import * as React from 'react';
import { NativeInstance } from '../../models/renderer';

export const TestView = React.forwardRef<NativeInstance, React.Props<{ children: React.Component }>>((props, ref) => {
  return <view ref={ref}>{
    props.children
  }</view>;
});
