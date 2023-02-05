---
title: Pointer Events
layout: API
---

Allows an element and its children to ignore pointer events.

Valid values are:
- `auto` or `visible`: allow pointer events only when the element is visible
- `all`: always allow pointer events
- `none`: ignore all pointer events

<Sandpack>

```js App.js
export default function App() {
  return <>
    <button>Pointer-events: all</button>
    <button>Pointer-events: none</button>

    Try clicking the buttons
  </>;
}
```

```css style.css active
:root {
  justify-content: space-around;
  align-items: center;
  background-color: white;
}

button {
  background-color: cornflowerblue;
  color: white;
}

button:active {
  background-color: red;
}

button:nth-child(1) {
  pointer-events: all;
}

button:nth-child(2) {
  pointer-events: none;
}
```

</Sandpack>
