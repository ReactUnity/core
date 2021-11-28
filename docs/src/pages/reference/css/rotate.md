---
title: Rotate
layout: API
---

Rotates the element around its `transform-origin`.

Valid values are:

- Single angle value to rotate around Z-axis: `45deg`, `1.2rad`, `0.5turn` etc.
- 3-dimensional angles in the form `eulerX eulerY eulerZ`: `45deg 60deg 360deg` etc.

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
  justify-content: space-around;
}

view {
  width: 50px;
  height: 50px;
}

view:nth-child(1) {
  background-color: coral;
  rotate: 30deg;
}

view:nth-child(3) {
  background-color: limegreen;
  rotate: 1rad;
}

view:nth-child(5) {
  background-color: aqua;
  transform-origin: top left;
  rotate: 0.125turn;
}

view:nth-child(7) {
  background-color: dodgerblue;
  transform-origin: bottom right;
  rotate: 45deg 45deg 0;
}
```

</Sandpack>
