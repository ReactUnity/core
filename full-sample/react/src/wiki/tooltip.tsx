import * as React from 'react';
import { Tooltip } from '@reactunity/renderer';

export function App() {
  const tooltipContent =
    <view layout={{ Padding: 10 }} style={{ backgroundColor: new ColorNative(0.4, 0.4, 0.4), fontColor: 'white' }}>
      Cool tooltip
    </view>;

  return <view layout={{ Height: '100%', AlignItems: 'Center', JustifyContent: 'Center' }}>
    <Tooltip tooltipContent={tooltipContent} position='bottom' offset={20}>
      Hover to see cool tooltip.
    </Tooltip>
  </view>;
}
