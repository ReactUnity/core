---
title: Cursor
layout: API
---


Sets the mouse cursor texture when an element is hovered. Compatible with [CSS syntax](https://developer.mozilla.org/en-US/docs/Web/CSS/cursor).

Valid values are:
- A named cursor: `default`, `none`, `pointer` etc.
- An image with hotspot offset: `url(res:myCursorImage) 12 6`

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
}

view:nth-child(1) {
  background-color: coral;
  cursor: pointer;
}

view:nth-child(2) {
  background-color: limegreen;
  cursor: none;
}

view:nth-child(3) {
  background-color: aqua;
  cursor: move;
}

view:nth-child(4) {
  background-color: dodgerblue;
  cursor: url(res:ReactUnity/sprites/check) 5 5;
}
```

</Sandpack>
