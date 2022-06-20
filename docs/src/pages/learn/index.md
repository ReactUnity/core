---
title: Quick Start
---

<Intro>

Welcome to the ReactUnity documentation! Here is an overview of what you can find on this site.

</Intro>

## Introduction

This is a tiny ReactUnity app. To get your first taste of ReactUnity, **edit the code below** and make it display your name:

<Sandpack>

```js App.js active
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

</Sandpack>

## How can I learn ReactUnity

To learn ReactUnity, you need to learn React first. You can start by the [official React documentation](https://reactjs.org/). If you already feel confident with React, then you can keep reading this documentation.
