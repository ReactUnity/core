import * as React from 'react';
import style from './index.module.scss';

export function App() {
  return <view className={style.app}>
    <button onClick={() => console.log('Clicked')}>
      Click me!
    </button>
  </view>;
}
