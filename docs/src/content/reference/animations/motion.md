---
title: Rect Transform Animations (motion)
layout: API
---

The `motion` property is used to animate changes to the rect transform of an element. This property is unique to React Unity and does not exist in standard CSS.

The property must have the format `<duration> <delay> <timing-function>`. The properties can also be set individually as `motion-duration`, `motion-delay`, and `motion-timing-function`.

<Sandpack>

```js
export default function App() {
  const [big, setBig] = React.useState(false);

  return <>
    Click the button to toggle its size
    <button onClick={() => setBig(x => !x)} style={{ width: big ? 300 : 'auto' }}>
      Click
    </button>
  </>;
}
```

```css active
:root {
  align-items: flex-start;
}

button, button :text {
  motion: 0.6s 0.1s ease-in-out;
}
```

</Sandpack>
