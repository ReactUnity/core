---
title: Slider
layout: API
---

<></>

<Sandpack>

```js App.js active
import { Slider } from '@reactunity/material';
import '@reactunity/material/styles';

export default function App() {
  return <scroll class="main">
    <Slider allowScroll direction="horizontal" mode="normal" max={100} />
    <Slider allowScroll direction="horizontal" mode="diff" max={100} />
    <Slider allowScroll direction="horizontal-reverse" mode="normal" max={100} />
    <Slider allowScroll direction="horizontal-reverse" mode="diff" max={100} />

    <view style={{ flexDirection: 'row' }}>
      <Slider allowScroll direction="vertical" mode="normal" max={100} step={20} />
      <Slider allowScroll direction="vertical" mode="diff" max={100} step={20} />
      <Slider allowScroll direction="vertical-reverse" mode="normal" max={100} step={20} />
      <Slider allowScroll direction="vertical-reverse" mode="diff" max={100} step={20} />
    </view>
  </scroll>;
}
```

```css style.css
.main > * {
  margin: 10px 20px;
}
```

</Sandpack>
