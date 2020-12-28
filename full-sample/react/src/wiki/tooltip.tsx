import * as React from 'react';
import style from './index.module.scss';
import { Tooltip } from '@reactunity/renderer';

export function App() {
  const tooltipContent =
    <view style={{ padding: 10, backgroundColor: 0.4, fontColor: 'white' }}>
      Cool tooltip
    </view>;

  return <view className={style.app}>
    <Tooltip tooltipContent={tooltipContent} position='bottom' offset={20}>
      Hover to see cool tooltip.
    </Tooltip>
  </view>;
}
