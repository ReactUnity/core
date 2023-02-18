---
title: Border Radius
layout: API
---

Changes the border radius of all four corners of the element's rectangle.

Alternatively, each corner can be set separately with the following properties:

- `border-top-left-radius`
- `border-top-right-radius`
- `border-bottom-right-radius`
- `border-bottom-left-radius`

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
  background-color: cornflowerblue;
  animation: borderRadiusAnim 6s infinite;
}

@keyframes borderRadiusAnim {
  0% {
    border-radius: 20%;
  }

  25% {
    border-radius: 50%;
  }

  50% {
    border-radius: 50%;
    border-top-left-radius: 20%;
    border-bottom-right-radius: 20%;
  }

  75% {
    border-radius: 20%;
    border-bottom-left-radius: 0;
  }

  100% {
    border-radius: 20%;
  }
}
```

</Sandpack>
