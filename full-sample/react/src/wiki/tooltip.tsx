import * as React from 'react';
import style from './index.module.scss';
import { Tooltip } from '@reactunity/renderer';

export function App() {
  const tooltipContent =
    <view layout={{ Padding: 10 }} style={{ backgroundColor: new ColorNative(0.4, 0.4, 0.4), fontColor: 'white' }}>
      Cool tooltip
    </view>;

  return <view className={style.app}>
    <Tooltip tooltipContent={tooltipContent} position='bottom' offset={20}>
      Hover to see cool tooltip.
    </Tooltip>
  </view>;
}
