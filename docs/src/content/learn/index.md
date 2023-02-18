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

### What is ReactUnity?

ReactUnity is a framework that lets you code UI using React and show it inside Unity.

ReactUnity is not a hack or a workaround. It is a legitimate way to use React. React framework is built in a way so that the React logic can be used in different platforms. In fact, all platforms which can run Javascript can have a framework like ReactUnity.

In Web development, it is ReactDOM. In native mobile (and desktop) applications, it is React Native. And in Unity, it is ReactUnity. There are actually more [Awesome React Renderers](https://github.com/chentsulin/awesome-react-renderer) you probably haven't heard of.

## How can I learn ReactUnity

To learn ReactUnity, you need to learn React first. You can start by the [official React documentation](https://reactjs.org/). If you already feel confident with React, you can keep reading this documentation.
