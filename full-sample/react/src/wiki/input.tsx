import * as React from 'react';
import style from './index.module.scss';

export function App() {
  return <view className={style.app}>
    <input placeholder="Write something!" style={{ backgroundColor: 0.9 }} />
  </view>;
}
