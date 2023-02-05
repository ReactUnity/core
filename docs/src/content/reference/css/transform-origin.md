---
title: Transform Origin
layout: API
---

Affects the pivot point for `scale` and `rotate`. By default it is at the center.

Valid values are:
- Positional keyword: `top`, `right`, `bottom`, `left`, `center`, `top left` etc.
- Pixel value: `50px 20px`
- Percentage values: `50% 20%`, `40px 50%` etc.

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
}

view {
  flex-grow: 1;
}

view:nth-child(1) {
  background-color: coral;
  scale: 0.9;
}

view:nth-child(3) {
  background-color: limegreen;
  transform-origin: 30px 30px;
  scale: 0.8;
}

view:nth-child(5) {
  background-color: aqua;
  transform-origin: top left;
  scale: 0.9 1.2;
}

view:nth-child(7) {
  background-color: dodgerblue;
  transform-origin: bottom right;
  scale: 0.5;
}
```

</Sandpack>
