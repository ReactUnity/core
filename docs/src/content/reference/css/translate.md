---
title: Translate
layout: API
---


Repositions the element without affecting its layout.

Valid values are:
- 2-dimensional pixel amount or percentage: `40px 50px`, `50% -50%`

<Sandpack>

```js
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

```css active
hr {
  border-bottom-width: 5px;
  z-index: 1;
}

view {
  flex-grow: 1;
  width: 50%;
}

view:nth-child(1) {
  background-color: coral;
  translate: 10px 10px;
}

view:nth-child(3) {
  background-color: limegreen;
  translate: 10% -5px;
}

view:nth-child(5) {
  background-color: aqua;
  translate: 20px 50px;
}

view:nth-child(7) {
  background-color: dodgerblue;
  translate: -50% 0;
}
```

</Sandpack>
