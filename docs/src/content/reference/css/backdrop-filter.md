---
title: Backdrop Filter
layout: API
---

Check out the [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/backdrop-filter) for how to use.

<Sandpack>

```js
export default function App() {
  return <>
    <view className="el" />
  </>;
}
```

```css active
.el {
  margin: auto;
  width: 300px;
  height: 300px;
  border: 1px solid black;
  backdrop-filter: blur(4px) grain(0.1) pixelate(15px);
}

```

</Sandpack>
