---
title: Box Shadow
layout: API
---

Creates a box shadow of the target element.

Check out the [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/box-shadow) for how to use.

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
:root {
  padding: 10px;
}

view {
  flex-grow: 1;
  margin: 20px auto;
  background-color: white;
  width: 300px;
}

view:nth-child(1) {
  box-shadow: 1px 1px 4px 0 black;
}

view:nth-child(2) {
  box-shadow: 0 5px 5px -3px rgb(0 0 0 / 20%), 0 8px 10px 1px rgb(0 0 0 / 14%), 0 3px 14px 2px rgb(0 0 0 / 12%);
}

view:nth-child(3) {
  border-radius: 50px;
  box-shadow: 1px 1px 4px 0 black inset;
}

view:nth-child(4) {
  box-shadow: 0 0 4px 3px black;
}
```

</Sandpack>
