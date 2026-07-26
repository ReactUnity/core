---
title: Mask
layout: API
---

Sets the mask image of a component.

See [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/mask) for usage.

<Sandpack>

```js
export default function App() {
  return <>
    <view />
  </>;
}
```

```css active
view {
  flex-grow: 1;
  mask-image: url(res:star);
  background-color: red;
}
```

</Sandpack>
