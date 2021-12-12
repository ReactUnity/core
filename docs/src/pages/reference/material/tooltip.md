---
title: Tooltip
layout: API
---

<Sandpack>

```js App.js active
import { useDataTooltip } from '@reactunity/material';
import '@reactunity/material/styles';

export default function App() {
  const ttHover = useDataTooltip('hover');
  const ttPress = useDataTooltip('press');
  const ttClick = useDataTooltip('click');

  return <scroll class="main">
    <view class="tooltip-triggers">

      <view>
        Hover
        <Button ref={ttHover.register} data-tooltip-offset={20} data-tooltip-position="top" data-tooltip-content="This is shown on top">Top</Button>
        <Button ref={ttHover.register} data-tooltip-position="bottom" data-tooltip-content="This is shown on bottom">Bottom</Button>
        <Button ref={ttHover.register} data-tooltip-position="left" data-tooltip-content="This is shown on left">Left</Button>
        <Button ref={ttHover.register} data-tooltip-position="right" data-tooltip-content="This is shown on right">Right</Button>
        <Button ref={ttHover.register} data-tooltip-position="center" data-tooltip-content="This is shown on center">Center</Button>
        <Button ref={ttHover.register} data-tooltip-anchor="bottom right" data-tooltip-pivot="top left" data-tooltip-content="This is shown on right bottom corner">Custom</Button>
      </view>

      <view>
        Press
        <Button ref={ttPress.register} data-tooltip-offset={20} data-tooltip-position="top" data-tooltip-content="This is shown on top">Top</Button>
        <Button ref={ttPress.register} data-tooltip-position="bottom" data-tooltip-content="This is shown on bottom">Bottom</Button>
        <Button ref={ttPress.register} data-tooltip-position="left" data-tooltip-content="This is shown on left">Left</Button>
        <Button ref={ttPress.register} data-tooltip-position="right" data-tooltip-content="This is shown on right">Right</Button>
        <Button ref={ttPress.register} data-tooltip-position="center" data-tooltip-content="This is shown on center">Center</Button>
        <Button ref={ttPress.register} data-tooltip-anchor="bottom right" data-tooltip-pivot="top left" data-tooltip-content="This is shown on right bottom corner">Custom</Button>
      </view>

      <view>
        Click
        <Button ref={ttClick.register} data-tooltip-offset={20} data-tooltip-position="top" data-tooltip-content="This is shown on top">Top</Button>
        <Button ref={ttClick.register} data-tooltip-position="bottom" data-tooltip-content="This is shown on bottom">Bottom</Button>
        <Button ref={ttClick.register} data-tooltip-position="left" data-tooltip-content="This is shown on left">Left</Button>
        <Button ref={ttClick.register} data-tooltip-position="right" data-tooltip-content="This is shown on right">Right</Button>
        <Button ref={ttClick.register} data-tooltip-position="center" data-tooltip-content="This is shown on center">Center</Button>
        <Button ref={ttClick.register} data-tooltip-anchor="bottom right" data-tooltip-pivot="top left" data-tooltip-content="This is shown on right bottom corner">Custom</Button>
      </view>
    </view>
  </scroll>;
}
```

```css style.css
.tooltip-triggers > * {
  alignItems: center;
  margin: 10px;
}
.tooltip-triggers > * > * {
  margin: 5px;
}
```

</Sandpack>
