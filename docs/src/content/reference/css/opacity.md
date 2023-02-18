---
title: Opacity
layout: API
---

Changes the opacity of an element and its children.

Valid values are:
- A number between 0 and 1: `0`, `0.72`, `1` etc.
- Percentage: `40%`, `100%` etc.

<Sandpack>

```js
export default function App() {
  return <>
    Hover the boxes to make them transparent

    <view className="items">
      <view className="item1" style={{ background: 'coral' }} />
      <view className="item2" style={{ background: 'slategray' }} />
      <view className="item3" style={{ background: 'aqua' }} />
    </view>
  </>;
}
```

```css active

:root {
  align-items: center;
}

.items {
  flex-direction: row;
  align-items: center;
}

.item1, .item2, .item3 {
  width: 100px;
  height: 100px;
  transition: opacity 200ms;
  cursor: pointer;
  margin: 20px;
}

.item1:hover {
  opacity: 0.4;
}

.item2:hover {
  opacity: 80%;
}

.item3:hover {
  opacity: 5%;
}

```

</Sandpack>
