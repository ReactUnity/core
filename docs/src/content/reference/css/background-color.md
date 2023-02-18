---
title: Background
layout: API
---

Sets the background color of a component.

### Valid values

- Known color name: `red`, `limegreen`, `transparent`
- Hex color: `#a5a5a5`, `#777`, `#00ff0033`
- RGBA color: `rgba(23, 16, 168, 0.3)`
- CSS keywords: `inherit`

<Sandpack>

```js
export default function App() {
  return <>
    <view className="test" />
  </>;
}
```

```css active
.test {
  width: 240px;
  height: 160px;
  margin: 40px auto;
  border: 1px solid black;
  animation: backgroundColorAnim 8s infinite;
}

@keyframes backgroundColorAnim {
  0% {
    background-color: crimson;
  }

  25% {
    background-color: #a5a5a5;
  }

  50% {
    background-color: rgba(10, 10, 235, 0.4);
  }

  75% {
    background-color: #00ff0033;
  }

  100% {
    background-color: crimson;
  }
}
```

</Sandpack>
