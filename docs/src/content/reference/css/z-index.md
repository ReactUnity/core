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
    <view />
    <view />
    <view />
    <view />
  </>;
}
```

```css active
view {
  flex-grow: 1;
  margin: 20px;
}

view:nth-child(1) {
  background-color: coral;
  scale: 3;
  opacity: 0.5;
  z-index: 20;
}

view:nth-child(2) {
  background-color: limegreen;
  z-index: 15;
}

view:nth-child(3) {
  background-color: aqua;
  opacity: 0.5;
  scale: 3;
  z-index: 5;
}

view:nth-child(4) {
  background-color: dodgerblue;
}
```

</Sandpack>
