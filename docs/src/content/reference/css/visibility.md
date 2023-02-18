---
title: Visibility
layout: API
---

Completely shows or hides the element.

Valid values are:
- Keyword values: `visible` or `hidden`
- Boolean `true` for visible and `false` for hidden (in JSX)

<Sandpack>

```js
export default function App() {
  return <>
    Hover a box to make the other invisible

    <view className="items">
      <view style={{ background: 'coral' }} />
      <view style={{ background: 'slategray' }} />
      <view style={{ background: 'azure' }} />
    </view>
  </>;
}
```

```css active

:root {
  align-items: center;
}

.items {
  flex-direction: row;
  align-items: center;
  margin-top: 20px;
  cursor: pointer;
}

.items > * {
  width: 100px;
  height: 100px;
  margin: 20px;
}

.items:hover :not(:hover) {
  visibility: hidden;
}

```


</Sandpack>
