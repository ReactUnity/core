---
title: Animation
layout: API
---

Adds content to `text` elements and pseudo elements `:before` and `:after`.

The value must be a string enclosed in quotes, like `"Hello world!"`.

<Sandpack>

```js
export default function App() {
  return <>
    <view className="test">
      <text>Hover to see different content</text>
    </view>
  </>;
}
```

```css active
.test {
  border: 1px solid black;
  padding: 12px;
  flex-direction: row;
}

.test:hover text {
  content: "Inside content!";
}

.test:before {
  content: "Before content!";
  margin-right: 10px;
}

.test:after {
  content: "After content!";
  margin-left: 10px;
}
```

</Sandpack>
