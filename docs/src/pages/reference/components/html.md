---
title: <html>
layout: API
---

`<html>` component can take in an _html-like_ string as its content and will render that.
It can be used for high performance solutions where React is not needed.

`<style>` tag can be used to add CSS, and `<script>` tag can be used to add Javascript.
`style` property and event properties of components can be given as strings.

<Sandpack>

```js App.js
const htmlContent = `
  <view>
    <button onClick="console.log('hello there')"
      style="background-color: green; color: white;">
      Action button
    </button>
  </view>
`;

export default function App() {
  return <html content={htmlContent} />;
};
```

</Sandpack>

### Loading content from a URL

The content of this component can be loaded from a URL by defining the `source` property.

<Sandpack>

```js App.js

const url = 'https://reactunity.github.io/examples/html-content.html';

export default function App() {
  return <html source={url} />;
};
```

</Sandpack>
