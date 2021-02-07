import * as React from 'react';
import { Renderer, FlexDirection, Wrap, YogaAlign } from '@reactunity/renderer';

function App {
  return <scroll layout={{ FlexDirection: FlexDirection.Column, Wrap: Wrap.Wrap, AlignItems: YogaAlign.FlexStart, Padding: 40, PaddingRight: 0 }}>
    <text layout={{ MaxWidth: 300, MarginRight: 40, FlexShrink: 1, FlexGrow: 1, FlexBasis: YogaValueNative.Percent(60) }} style={{ textOverflow: 'Linked' }}
    >{`Go to <color=red>app.tsx</color> to edit this file`}</text>
  </scroll>;
}

Renderer.render(<App />, RootContainer, null);
