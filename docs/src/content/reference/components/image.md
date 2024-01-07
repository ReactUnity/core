---
title: <image>
layout: API
---

`<image>` creates an image component. Alternatively, `<rawimage>` creates a raw image component and `<svg>` creates a svg image component (requires `Unity.VectorGraphics` package).

<Sandpack>

```js
export default function App() {
  const imageAddress = 'https://picsum.photos/200';
  return <image
    style={{ height: 300, objectFit: 'fit' }}
    source={imageAddress} />;
};
```

</Sandpack>

### Properties

- **source**: Source of the image. Can be a url, the `Texture2D` object or the `Sprite` object.
- **fit**: Determines how to position the image inside the element.
