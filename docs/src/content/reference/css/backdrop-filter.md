---
title: Backdrop Filter
layout: API
---

Check out the [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/backdrop-filter) for how to use.

<Sandpack>

```js
export default function App() {
  return <>
    <view className="el" onDrag={(x,t) => {
      t.Style.left = x.position.x - x.pressPosition.x;
      t.Style.bottom = x.position.y - x.pressPosition.y;
    }} />
  </>;
}

```

```css active
.el {
  margin: auto;
  width: 300px;
  height: 300px;
  background: rgba(0,0,0,0.02);
  cursor: move;
  box-shadow: 2px 2px 16px -8px black, 0 0 4px 24px inset rgba(0,0,0,0.06);
  backdrop-filter: blur(4px) grain(0.04) pixelate(4px) hue-rotate(-25deg);
}
```

</Sandpack>
