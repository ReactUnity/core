---
title: Cursor
layout: API
---


Sets the mouse cursor texture when an element is hovered. Compatible with [CSS syntax](https://developer.mozilla.org/en-US/docs/Web/CSS/cursor).

Valid values are:
- A named cursor: `default`, `none`, `pointer` etc.
- An image with hotspot offset: `url(res:myCursorImage) 12 6`

<Sandpack>

```js active
export default function App() {
  return <>
    Hover the boxes to see cursor

    <view className="items">
      <view style={{ cursor: 'pointer' }} />
      <view style={{ cursor: 'none' }} />
      <view style={{ cursor: 'move' }} />
      <view style={{ cursor: 'url(res:ReactUnity/sprites/check) 5 5' }} />
    </view>
  </>;
}
```

```css

:root {
  align-items: center;
}

.items {
  flex-direction: row;
  align-items: center;
}

.items > view {
  width: 100px;
  height: 100px;
  margin: 20px;
}

.items > view:nth-child(1) {
  background-color: coral;
}

.items > view:nth-child(2) {
  background-color: slategray;
}

.items > view:nth-child(3) {
  background-color: aqua;
}

.items > view:nth-child(4) {
  background-color: dodgerblue;
}
```

</Sandpack>
