---
title: Background Image
layout: API
---

Sets the background image of a component.

### Valid values

- Url value. Examples:
  - From web address: `url(https://via.placeholder.com/350x150)`
  - From resources: `url(res:images/ui/exampleImage)`
  - Data url: `url(data:image/png;base64,9j4AAQSkZJRgABAQEBLAEsAAD...)`

### Example

<Sandpack>

```js
export default function App() {
  return <>
    <view />
  </>;
}
```

```css active
view {
  flex-grow: 1;
  background-image: url(res:star);
}
```

</Sandpack>
