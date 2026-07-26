---
title: <button>
layout: API
---

`<button>` can be used to create clickable components.

<Sandpack>

```js
export default function App() {
  const light = Globals.Light;

  return <button
    style={{ margin: 20 }}
    onClick={() => light.enabled = !light.enabled}>
    Toggle Light
  </button>;
};
```

</Sandpack>
