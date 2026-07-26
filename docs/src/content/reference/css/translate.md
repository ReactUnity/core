---
title: Translate
layout: API
---


Repositions the element without affecting its layout.

Valid values are:
- 2-dimensional pixel amount or percentage: `40px 50px`, `50% -50%`

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

  animation: translateAnim 4s infinite;
}

@keyframes translateAnim {
  0% {
    translate: 0px 0px;
  }

  25% {
    translate: 220px 40px;
  }

  50% {
    translate: 200px 200px;
  }

  75% {
    translate: -50px 80px;
  }

  100% {
    translate: 0px 0px;
  }
}
```

</Sandpack>
