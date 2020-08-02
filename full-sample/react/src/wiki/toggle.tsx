import * as React from 'react';
import style from './index.module.scss';

export function App() {
  return <view className={style.app} layout={{ FlexDirection: 'Row' }}>
    <toggle /> Toggle me!
  </view>;
}
