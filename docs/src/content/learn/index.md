---
title: Quick Start
---

<Intro>

Welcome to the ReactUnity documentation! Here is an overview of what you can find on this site.

</Intro>

## Introduction

This is a tiny ReactUnity app. To get your first taste of ReactUnity, **edit the code below** and make it display your name:

<Sandpack>

```js
function Greeting({ name }) {
  return <text>Hello, {name}!</text>;
}

export default function App() {
  return (
    <view>
      <Greeting name="Divyesh" />
      <Greeting name="Sarah" />
      <Greeting name="Taylor" />
    </view>
  );
}
```

```css
:root {
  font-size: 32px;
}
```

</Sandpack>

## Rendering XML code

Instead of using React, ReactUnity lets you write HTMl-like code for static UIs. This UI can later be modified from code.

<Sandpack>

```html
<view class="items">
  <text>Hello, Divyesh!</text>
  <text>Hello, Sarah!</text>
  <text>Hello, Taylor!</text>
</view>
```

```css
.items {
  font-size: 32px;
}
```

</Sandpack>

XML code can also be embedded inside React code. See [`html` component reference](/reference/components/html) for details.
