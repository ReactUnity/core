---
title: Border
layout: API
---

Changes the border color of all sides of the element's rectangle.

Alternatively, each side can be set separately with the following properties:

- `border-top-color`
- `border-right-color`
- `border-bottom-color`
- `border-left-color`

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
  background-color: lightblue;
  border-width: 10px;
}

view:nth-child(1) {
  border-color: black;
}

view:nth-child(2) {
  border-color: transparent;
  border-bottom-color: #ff7edb;
}

view:nth-child(3) {
  border-right-color: rgba(130, 85, 255, 0.363);
  border-bottom-color: hsla(46, 100%, 50%, 0.8);
}

view:nth-child(4) {
  border-color: gold;
  border-bottom-color: red;
  border-radius: 20px;
}
```

</Sandpack>
