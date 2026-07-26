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

```js
export default function App() {
  return <>
    Try clicking the buttons

    <view className="test">
      <button style={{ pointerEvents: 'all' }}>
        Pointer-events: all
      </button>

      <button style={{ pointerEvents: 'none' }}>
        Pointer-events: none
      </button>
    </view>
  </>;
}
```

```css active

:root {
  align-items: center;
}

.test {
  flex-direction: row;
  align-items: center;
}

.test > button {
  margin: 20px;
}

```

</Sandpack>
