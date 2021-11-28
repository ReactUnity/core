---
title: Scale
layout: API
---

Scale the element around its `transform-origin`. Does not affect the layout.

Valid values are:
- Single number to scale uniformly: `0.8`, `1.6` etc.
- 2-dimensional value in the format `scaleX scaleY`: `1.5 2` etc.

<Sandpack>

```js App.js
export default function App() {
  return <>
    <view />
    <hr />
    <view />
    <hr />
    <view />
    <hr />
    <view />
  </>;
}
```

```css style.css active
hr {
  border-bottom-width: 5px;
  z-index: 1;
  width: 100%;
}

:root {
  align-items: center;
}

view {
  flex-grow: 1;
  width: 50%;
}

view:nth-child(1) {
  background-color: coral;
  scale: 1;
}

view:nth-child(3) {
  background-color: limegreen;
  scale: 2.2;
}

view:nth-child(5) {
  background-color: aqua;
  transform-origin: top left;
  scale: 3.4 1;
}

view:nth-child(7) {
  background-color: dodgerblue;
  transform-origin: bottom right;
  scale: 0.5;
}
```

</Sandpack>
