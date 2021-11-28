---
title: Border
layout: API
---

Changes the border width of all sides of the element's rectangle.

Alternatively, each side can be set separately with the following properties:

- `border-top-width`
- `border-right-width`
- `border-bottom-width`
- `border-left-width`

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
view {
  flex-grow: 1;
  margin: 20px;
  background-color: cornflowerblue;
}

view:nth-child(1) {
  border-width: 10px;
}

view:nth-child(2) {
  border-width: 10px;
  border-bottom-width: 0;
}

view:nth-child(3) {
  border-right-width: 14px;
  border-bottom-width: 4px;
}

view:nth-child(4) {
  border-width: 4px;
  border-bottom-width: 20px;
  border-radius: 20px;
}
```

</Sandpack>
