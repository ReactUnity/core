---
title: <script>
layout: API
---

`<script>` component can be used to run Javascript code when the element is rendered. It is useful inside `<html>`.
It is recommended to use this sparingly in other situations.

<Sandpack>

```js
const scriptContent = `
  let count = 0;

  setInterval(function () {
    count++;
    document.querySelector('#style-this').Style.color = count % 2 === 0 ? 'black' : 'crimson';
  }, 500);
`;

export default function App() {
  return <>
    <view id="style-this">
      Styled text
    </view>

    <script content={scriptContent} />
  </>;
};
```

</Sandpack>

### Loading content from a URL

The content of this component can be loaded from a URL by defining the `source` property.

<Sandpack>

```js

const url = 'https://reactunity.github.io/examples/script-content.js';

export default function App() {
  return <>
    <view id="style-this">
      Styled text
    </view>

    <script source={url} />
  </>;
};
```

</Sandpack>
