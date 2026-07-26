---
title: Color
layout: API
---

Sets the text color inside a component.

<Sandpack>

```js
export default function App() {
  return <>
    <view>Fancy Text</view>
    <view>Fancy Text</view>
    <view>Fancy Text</view>
    <view>Fancy Text</view>
  </>;
}
```

```css active
view {
  flex-grow: 1;
  justify-content: center;
  font-size: 48px;
}

view:nth-child(1) {
  color: crimson;
}

view:nth-child(2) {
  color: #a5a5a5;
}

view:nth-child(3) {
  color: rgba(10, 10, 235, 0.7);
}

view:nth-child(4) {
  color: #550055aa;
}
```

</Sandpack>
