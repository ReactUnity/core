---
title: Z Index
layout: API
---

Allows showing certain elements in front of others.

Valid values are:
- Integer values: `0`, `100`, `762` etc.

<Sandpack>

```js
export default function App() {
  return <>
    Hover the box to bring it forward

    <view className="items">
      <view className="item1" />
      <view className="item2" />
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
  margin-top: 20px;
}

.item1 {
  width: 100px;
  height: 100px;
  background-color: coral;
}

.item2 {
  width: 80px;
  height: 80px;
  margin-left: -20px;
  background-color: slategray;
}

.item1, .item2 {
  transition: scale 200ms;
}

.item1:hover, .item2:hover {
  cursor: pointer;
  z-index: 10;
  scale: 1.1;
}

```

</Sandpack>
