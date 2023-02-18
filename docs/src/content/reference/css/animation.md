---
title: Animation
layout: API
---

Applies a keyframe animation to an element.

This property is completely compatible with [CSS animation](https://developer.mozilla.org/en-US/docs/Web/CSS/animation).

<Sandpack>

```js
export default function App() {
  return <>
    Click and hold the box to see a different animation
    <view />
  </>;
}
```

```css active
:root {
  justify-content: space-around;
  text-align: center;
  background-color: #a9b2ba;
}

view {
  align-self: center;
  width: 100px;
  height: 100px;
  background-color: coral;
  cursor: pointer;

  animation: rotateAnim 2s ease-in-out alternate infinite;
}

view:active {
  animation: scaleAnim 2s linear both;
}

@keyframes rotateAnim {
  from {
    rotate: -60deg;
  }
  to {
    rotate: 60deg;
  }
}

@keyframes scaleAnim {
  from {
    scale: 1;
  }
  40% {
    scale: 2.2;
  }
  to {
    scale: 1.6;
  }
}
```

</Sandpack>
