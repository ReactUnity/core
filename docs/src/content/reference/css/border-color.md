---
title: Border Color
layout: API
---

Changes the border color of all sides of the element's rectangle.

Alternatively, each side can be set separately with the following properties:

- `border-top-color`
- `border-right-color`
- `border-bottom-color`
- `border-left-color`

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
  border-width: 30px;
  animation: borderColorAnim 8s infinite;
}

@keyframes borderColorAnim {
  0% {
    border-color: black;
  }

  25% {
    border-color: transparent;
    border-bottom-color: #ff7edb;
  }

  50% {
    border-color: black;
    border-right-color: rgba(130, 85, 255, 0.363);
    border-bottom-color: hsla(46, 100%, 50%, 0.8);
    border-radius: 0;
  }

  75% {
    border-color: gold;
    border-bottom-color: red;
    border-radius: 60px;
  }

  100% {
    border-color: black;
    border-radius: 0;
  }
}
```

</Sandpack>
