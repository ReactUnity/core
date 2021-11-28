---
title: <icon>
layout: API
---

`<icon>` can be used to create icon fonts. By default, material icons are available in ReactUnity.
This component behaves like `<text>` component, except its content must be a single valid icon name.

The list of default icons can be seen at [Google Fonts](https://fonts.google.com/icons?selected=Material+Icons).

<Sandpack>

```js App.js
export default function App() {
  return <view style={{ flexDirection: 'row' }}>
    <icon>person</icon>
    <icon>add</icon>
    <icon>done_all</icon>
    <icon style={{ fontSize: 32 }}>language</icon>
    <icon style={{ fontSize: 96 }}>
      keyboard_arrow_down
    </icon>
  </view>;
};
```

</Sandpack>
