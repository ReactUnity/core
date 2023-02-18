---
title: Appearance
layout: API
---

Remove native styling from elements which have it, such as button, input and toggle. This allows styling those element more accurately if desired.

Valid values are `none` or `button`.

<Sandpack>

```js active
export default function App() {
  return <>
    Click the buttons to see style differences

    <view className="test">
      <button style={{ appearance: 'button' }}>
        Appearance: button
      </button>

      <button style={{ appearance: 'none' }}>
        Appearance: none
      </button>
    </view>
  </>;
}
```

```css
:root {
  align-items: center;
}

.test {
  flex-direction: row;
  align-items: center;
}

.test > button {
  margin: 20px;
}
```

</Sandpack>
