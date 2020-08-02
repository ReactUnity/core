import * as React from 'react';
import { CursorType } from 'react-unity-renderer';
import style from './index.module.scss';

export function App() {
  return <view className={style.app}>
    <anchor url="https://www.google.com/" openInThisTab>Open Google in this tab</anchor>
    <anchor url="https://www.google.com/">Open Google in new tab</anchor>
    <anchor url="https://www.google.com/" style={{ cursor: CursorType.NotAllowed }} onPointerDown={(e) => e.Use()}>Cancel event</anchor>
  </view>;
}
