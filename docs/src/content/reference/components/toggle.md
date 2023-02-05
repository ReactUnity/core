---
title: <toggle>
layout: API
---

`<toggle>` creates a boolean toggle component.

<Sandpack>

```js App.js
export default function App() {
  const light = Globals.Light;

  return <view style={{
    flexDirection: 'row',
    justifyContent: 'center',
  }}>
    <toggle
      onChange={val => light.enabled = val}
      value={light.enabled} />

    Toggle light
  </view>;
};
```

</Sandpack>

### Properties

- **value**: Initial value of the toggle.
- **onChange**: Event to call when the value changes.
