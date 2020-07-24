import * as React from 'react';
import { ReactUnity } from 'react-unity-renderer';
import ind from './index.module.css';
import png from './images/delete.png';
import png2 from './images/bg.png';

export function App() {
  return <view className={ind.helloClass}>
    Hello world {png} {png2}
  </view>
}

ReactUnity.render(<App />, RootContainer, null);
