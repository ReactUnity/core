---
title: Appearance
layout: API
---

Remove native styling from elements which have it, such as button, input and toggle. This allows styling those element more accurately if desired.

Valid values are `none` or `button`.

<Sandpack>

```js App.js
export default function App() {
  return <>
    <button>Appearance: button</button>
    <button>Appearance: none</button>
    Click the buttons to see style differences
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

button:nth-child(1) {
  appearance: button;
}

button:nth-child(2) {
  appearance: none;
}
```

</Sandpack>
