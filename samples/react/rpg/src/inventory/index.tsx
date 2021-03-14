import * as React from 'react';
import style from './index.module.scss';

const items = new Array(50).fill(null);

export function Inventory() {
  return <scroll className={style.host}>
    <view className={style.frame}>
      <view className={style.items}>
        {items.map((x, i) =>
          <view key={i} className={style.itemSlot}>
          </view>)}
      </view>
    </view>
  </scroll>;
}
