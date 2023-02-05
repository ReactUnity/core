---
title: Visibility
layout: API
---

Completely shows or hides the element.

Valid values are:
- Keyword values: `visible` or `hidden`
- Boolean `true` for visible and `false` for hidden (in JSX)

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
}

view:nth-child(1) {
  background-color: coral;
  visibility: visible;
}

view:nth-child(2) {
  background-color: limegreen;
  visibility: hidden;
}

view:nth-child(3) {
  background-color: aqua;
  visibility: visible;
}

view:nth-child(4) {
  background-color: dodgerblue;
  visibility: hidden;
}
```

</Sandpack>
