---
title: <image>
layout: API
---

`<image>` creates an image component. Alternatively, `<rawimage>` creates a raw image component and `<svg>` creates a svg image component (requires `Unity.VectorGraphics` package).

<Sandpack>

```js App.js
export default function App() {
  return <image
    style={{ height: 200, objectFit: 'scale-down' }}
    source={imageAddress} />;
};
```

</Sandpack>

### Properties

source
: Source of the image. Can be a url or the `Texture2D` object.

fit
: Determines how to position the image inside the element.
