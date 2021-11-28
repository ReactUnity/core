---
title: <render>
layout: API
---

`<render>` can be used to create render texture components in UI which the camera can render to.

<Sandpack>

```js App.js
export default function App() {
  return <render
      height={200}
      width={200}
      style={{ width: 200, height: 200, backgroundColor: 'white', margin: 40, border: '4px yellow' }}
      camera={Globals.Camera} />;
};
```

</Sandpack>
