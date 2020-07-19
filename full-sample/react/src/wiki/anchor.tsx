import * as React from 'react';
import { FlexDirection, CursorType } from 'react-unity-renderer';

export function App() {
  return <view layout={{ Height: '100%', AlignItems: 'Center', JustifyContent: 'Center', FlexDirection: FlexDirection.Column }}>

    <anchor url="https://www.google.com/" openInThisTab>Open Google in this tab</anchor>
    <anchor url="https://www.google.com/">Open Google in new tab</anchor>
    <anchor url="https://www.google.com/" style={{ cursor: CursorType.NotAllowed }} onPointerDown={(e) => e.Use()}>Cancel event</anchor>

  </view>;
}
