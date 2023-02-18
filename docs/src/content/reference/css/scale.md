---
title: Scale
layout: API
---

Scale the element around its `transform-origin`. Does not affect the layout.

Valid values are:
- Single number to scale uniformly: `0.8`, `1.6` etc.
- 2-dimensional value in the format `scaleX scaleY`: `1.5 2` etc.

<Sandpack>

```js
export default function App() {
  return <view className="items">
    <view className="item" />
  </view>;
}
```

```css active
.items {
  flex-direction: column;
  align-self: flex-start;
  margin: 100px auto;
  border: 1px solid gray;
}

.item {
  width: 100px;
  height: 100px;
  background-color: coral;

  animation: scaleAnim 4s infinite;
}

@keyframes scaleAnim {
  0% {
    scale: 1;
  }

  25% {
    scale: 2.2;
  }

  50% {
    scale: 3.4 1;
  }

  75% {
    scale: 0.5;
  }

  100% {
    scale: 1;
  }
}
```

</Sandpack>
