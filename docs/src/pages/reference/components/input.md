---
title: <input>
layout: API
---

`<input>` creates a text input component.

<Sandpack>

```js App.js
const defaultValue = 'Default value';

export default function App() {
  return <input
    value={defaultValue}
    style={{ margin: 20 }}
    onChange={val => console.log(val)} />;
};
```

</Sandpack>

### Properties

onChange
: An event fired when string in the input is changed by the user
