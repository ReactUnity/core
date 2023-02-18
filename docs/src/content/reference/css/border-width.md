---
title: Border
layout: API
---

Changes the border width of all sides of the element's rectangle.

Alternatively, each side can be set separately with the following properties:

- `border-top-width`
- `border-right-width`
- `border-bottom-width`
- `border-left-width`

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
  background-color: coral;
  animation: borderWidthAnim 4s infinite;
}

@keyframes borderWidthAnim {
  0% {
    border-width: 20px;
  }

  25% {
    border-width: 20px;
    border-bottom-width: 0;
  }

  50% {
    border-width: 20px 60px 0 20px;
    border-radius: 0;
  }

  75% {
    border-width: 10px;
    border-bottom-width: 40px;
    border-radius: 40px;
  }

  100% {
    border-width: 20px;
    border-radius: 0;
  }
}

```

</Sandpack>
