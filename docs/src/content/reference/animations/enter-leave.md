---
title: Enter/Leave Animations
layout: API
---

The CSS `:enter` and `:leave` pseudo selectors can be used with the `transition` property to animate the insertion and removal of elements.

When an element is inserted into the DOM, the `:enter` pseudo-class is applied to it. When an element is removed from the DOM, the `:leave` pseudo-class is applied to it. The duration these classes are applied can be controlled with the `state-duration` property.

<Sandpack>

```js
export default function App() {
  const [count, setCount] = React.useState(0);

  return <>
    <button onClick={() => setCount(x => x + 1)}>
      Add element
    </button>

    <button onClick={() => setCount(x => x - 1)}>
      Remove element
    </button>

    {Array.from({ length: count }).map((_, i) => (
      <view key={i} className="item">
        Element {i}
      </view>
    ))}
  </>;
}
```

```css active
:root {
  gap: 10px;
}

.item {
  flex-direction: row;
  align-items: center;
  transition: all 0.5s;

  state-duration: 0.5s;
}

.item:enter {
  state-duration: 0s;
  translate: -100px 0;
  opacity: 0;
}

.item:leave {
  translate: 100px 0;
  opacity: 0;
}
```

</Sandpack>
