---
title: <rawimage>
layout: API
---

`<rawimage>` creates an rawimage component.

<Sandpack>

```js
import { useState, useEffect } from 'react';

export default function App() {
  return (
    <rawimage
      style={{ height: 300 }}
      source='https://picsum.photos/200' />
  );
};
```

</Sandpack>

### Properties

- **source**: Source of the image. Can be a url, the `Texture2D` object or the `Sprite` object.
