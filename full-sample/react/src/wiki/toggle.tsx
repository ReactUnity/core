import * as React from 'react';
import style from './index.module.scss';

export function App() {
  return <view className={style.app} style={{ flexDirection: 'Row' }}>
    <toggle /> Toggle me!
  </view>;
}
