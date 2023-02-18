---
title: Rotate
layout: API
---

Rotates the element around its `transform-origin`.

Valid values are:

- Single angle value to rotate around Z-axis: `45deg`, `1.2rad`, `0.5turn` etc.
- 3-dimensional angles in the form `eulerX eulerY eulerZ`: `45deg 60deg 360deg` etc.

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

  animation: rotateAnim 5s infinite;
}

@keyframes rotateAnim {
  0% {
    rotate: 1;
  }

  20% {
    rotate: 30deg;
  }

  40% {
    rotate: 1.2rad;
  }

  60% {
    rotate: 0.625turn;
  }

  80% {
    rotate: 45deg 45deg 0.625turn;
  }

  100% {
    rotate: 1;
  }
}
```

</Sandpack>
