---
title: Border Radius
layout: API
---

Changes the border radius of all four corners of the element's rectangle.

Alternatively, each corner can be set separately with the following properties:

- `border-top-left-radius`
- `border-top-right-radius`
- `border-bottom-right-radius`
- `border-bottom-left-radius`

<Sandpack>

```js App.js
export default function App() {
  return <>
    <view />
    <view />
    <view />
    <view />
  </>;
}
```

```css style.css active
:root {
  background-color: #fafafa;
  padding: 10px;
}

view {
  flex-grow: 1;
  margin: 20px;
  background-color: coral;
}

view:nth-child(1) {
  border-radius: 10px;
}

view:nth-child(2) {
  border-radius: 50%;
}

view:nth-child(3) {
  border-top-left-radius: 20%;
  border-bottom-right-radius: 20%;
}

view:nth-child(4) {
  border-radius: 40px;
  border-bottom-left-radius: 0;
}
```

</Sandpack>
