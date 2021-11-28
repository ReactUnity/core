---
title: <text>
layout: API
---

`<text>` creates a component whose only content is text. It is useful for creating interpolated text and being able to style text nodes.

<Sandpack>

```js App.js
const name = 'John Doe';

export default function App() {
  return <text style={{ color: 'green' }}>
    Hello {name}
  </text>;
};
```

</Sandpack>

### Rich-text support

By default, text component allows [rich-text](http://digitalnativestudios.com/textmeshpro/docs/rich-text). Rich-text can be disabled by setting `richText={false}`.

<Sandpack>

```js App.js
const name = 'John Doe';

export default function App() {
  return <>
    <text style={{ marginBottom: 20 }}>
      {`Yes! This is <#998855>rich-text</color> with color`}
    </text>

    <text richText={false}>
      {`Sorry, no <b>rich-text</b> here`}
    </text>
  </>;
};
```

</Sandpack>
