---
title: render()
layout: API
---

<Intro>

`render` renders a piece of JSX into the `ReactUnityUGUI` component. It instructs React to change the UI so that it matches the passed JSX.

```js
Renderer.render(<App />);
```

</Intro>

## Rendering the root component

In apps fully built with React, you will do this once at the top level of your app--to render the "root" component.

<Sandpack>

```js App.js active
import { Renderer } from '@reactunity/renderer';

function Hello() {
  return <h1>Hello, world!</h1>;
}

Renderer.render(<Hello />);
```

</Sandpack>

<!---

## Updating the rendered tree

You can call `render` more than once. As long as the component tree structure matches up with what was previously rendered, React will preserve the state. Notice how you can type in the input:

<Sandpack>

```js App.js active
import { Renderer } from '@reactunity/renderer';

function App({ counter }) {
  return (
    <>
      <text>Hello, world! {counter}</text>
      <input placeholder="Type something here" />
    </>
  );
}

let i = 0;
Renderer.render(<App counter={i++} />);
setInterval(() => {
  Renderer.render(<App counter={i++} />);
}, 1000);

```

</Sandpack>

-->
