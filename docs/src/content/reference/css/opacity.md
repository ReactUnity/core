---
title: Opacity
layout: API
---

Changes the opacity of an element and its children.

Valid values are:
- A number between 0 and 1: `0`, `0.72`, `1` etc.
- Percentage: `40%`, `100%` etc.

<Sandpack>

```js App.js
export default function App() {
  return <>
    <view>Fancy Text</view>
    <view>Fancy Text</view>
    <view>Fancy Text</view>
    <view>Fancy Text</view>
  </>;
}
```

```css style.css active
view {
  flex-grow: 1;
  align-items: center;
  justify-content: center;
  background-color: coral;
  margin: 20px;
  color: black;
}

view:nth-child(1) {
  opacity: 0.15;
}

view:nth-child(2) {
  opacity: 0.45;
}

view:nth-child(3) {
  opacity: 90%;
}

view:nth-child(4) {
  opacity: 1;
}
```

</Sandpack>
