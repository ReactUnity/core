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

```js App.js
export default function App() {
  return <>
    <view />
    <view />
    <view />
    <view />
  </>;
}
```

```css style.css active
view {
  flex-grow: 1;
}

view:nth-child(1) {
  background-color: crimson;
}

view:nth-child(2) {
  background-color: #a5a5a5;
}

view:nth-child(3) {
  background-color: rgba(10, 10, 235, 0.4);
}

view:nth-child(4) {
  background-color: #00ff0033;
}
```

</Sandpack>
