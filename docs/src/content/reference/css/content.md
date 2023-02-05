---
title: Animation
layout: API
---

Adds content to `text` elements and pseudo elements `:before` and `:after`.

The value must be a string enclosed in quotes, like `"Hello world!"`.

<Sandpack>

```js App.js
export default function App() {
  return <>
    <view>
      <text>Hover to see different content</text>
    </view>
  </>;
}
```

```css style.css active
:root {
  justify-content: center;
  align-items: center;
  background-color: white;
  flex-direction: row;
}

view:before {
  content: "Before content!";
  margin-right: 10px;
}

view:after {
  content: "After content!";
  margin-left: 10px;
}

view:hover text {
  content: "Inside content!";
}
```

</Sandpack>
