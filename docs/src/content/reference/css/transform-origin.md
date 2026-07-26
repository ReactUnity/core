---
title: Transform Origin
layout: API
---

Affects the pivot point for `scale` and `rotate`. By default it is at the center.

Valid values are:
- Positional keyword: `top`, `right`, `bottom`, `left`, `center`, `top left` etc.
- Pixel value: `50px 20px`
- Percentage values: `50% 20%`, `40px 50%` etc.

<Sandpack>

```js active
export default function App() {
  return <view className="items">
    <view style={{ transformOrigin: "initial" }} />
    <view style={{ transformOrigin: "40px 40px" }} />
    <view style={{ transformOrigin: "top left" }} />
    <view style={{ transformOrigin: "bottom right" }} />
  </view>;
}
```

```css

.items {
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

.items > view {
  width: 50px;
  height: 50px;
  margin: 25px;
  background-color: black;

  animation: rotate 2s infinite;
}

@keyframes rotate {
  from {
    rotate: 0;
  }
  to {
    rotate: 1turn;
  }
}
```

</Sandpack>
