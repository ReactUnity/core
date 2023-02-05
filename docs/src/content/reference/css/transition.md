---
title: Transition
layout: API
---

Allows gradually changing a CSS value when it changes.

This property is completely compatible with [CSS transition](https://developer.mozilla.org/en-US/docs/Web/CSS/transition).

<Sandpack>

```js App.js
export default function App() {
  return <>
    Hover the box to see the transition
    <view />
  </>;
}
```

```css style.css active
:root {
  justify-content: space-around;
  text-align: center;
  background-color: white;
}

view {
  align-self: center;
  width: 100px;
  height: 100px;
  background-color: coral;

  transition: width 1s, background-color 400ms 1s;
}

view:hover {
  width: 240px;
  background-color: cornflowerblue;
}
```

</Sandpack>
