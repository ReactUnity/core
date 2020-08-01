import * as React from 'react';
import { ReactUnity } from 'react-unity-renderer';
import ind from './index.module.scss';
import png from './images/delete.png';
import png2 from './images/bg.png';

export function App() {
  return <scroll>
    <view>
      Hello world {png} {png2}
      <view className={ind.small}>
        Small font
      <text>Normal fornt</text>
        <view name="why" className={ind.asd}>100</view>
        <view className={ind.asdf}>100</view>
        <view>
          <view className={ind.asd}>30</view>
        </view>
      </view>
      <view className={ind.helloClass}>Big font</view>

      <input placeholder="Placeholder" />
    </view>

    <view className={ind.testImportant}>
      Important, should be 100
    </view>


    <view className={ind.testSibling}>
      <view>10</view>
      <view className={ind.sib0}>10</view>
      <view className={ind.sib1}>20</view>
      <view className={ind.sib2}>30</view>
      <view className={ind.sib2}>40</view>
    </view>

    <view className={ind.testNot}>
      <view>40</view>
      <view className={ind.not1}>30</view>
      <view className={ind.not2}>20</view>
      <view className={ind.not2}>50</view>
    </view>

    <view className={ind.testNth} layout={{ MaxWidth: 250 }}>
      {Array(50).fill(0).map((x, i) => <view key={i}>{i + 1}</view>)}
    </view>
  </scroll>;
}

ReactUnity.render(<App />, RootContainer, null);
