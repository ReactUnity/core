---
title: <style>
layout: API
---

`<style>` component can be used to define scoped CSS. It is useful for defining CSS inside `<html>`.
It is recommended to use this sparingly in other situations.

<Sandpack>

```js App.js
const styleContent = `
  #style-this {
    color: crimson;
  }
`;

export default function App() {
  return <>
    <style content={styleContent} scope="parent" />

    <view id="style-this">
      Styled text
    </view>
  </>;
};
```

</Sandpack>

### Loading content from a URL

The content of this component can be loaded from a URL by defining the `source` property.

<Sandpack>

```js App.js

const url = 'https://reactunity.github.io/examples/style-content.css';

export default function App() {
  return <>
    <style source={url} scope="parent" />

    <view id="style-this">
      Styled text
    </view>
  </>;
};
```

</Sandpack>

### Scoping styles to an element

The styles defined in this component can be scoped to another element with a selector. `:parent` scopes to the style tag's parent, `:root` scopes to the root component, and other CSS selectors scope to a single component with that CSS query if found. The default scope is `:parent`.

<Sandpack>

```js App.js
const styleContent = `
  :scope .style-this {
    color: crimson;
  }
`;

export default function App() {
  return <>
    <view className="style-this">This should not be styled</view>

    <view id="scope-to-this">
      <view className="style-this">This should be styled</view>
    </view>

    <style content={styleContent} scope="#scope-to-this" />
  </>;
};
```

</Sandpack>
