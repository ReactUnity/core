import * as React from 'react';
import lorem from '../../assets/lorem';
import style from './index.module.scss';

export function App() {
  return <scroll className={style.app}>
    {[lorem, lorem, lorem]}
  </scroll>;
}
