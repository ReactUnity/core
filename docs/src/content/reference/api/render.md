---
title: render()
layout: API
---

<Intro>

`render` renders a piece of JSX into the `ReactUnityUGUI` component. It instructs React to change the UI so that it matches the passed JSX.

```js
render(<App />);
```

</Intro>

## Rendering the root component

In apps fully built with React, you will do this once at the top level of your app--to render the "root" component.

<Sandpack>

```js App.js active
import { render } from '@reactunity/renderer';

function Hello() {
  return <h1>Hello, world!</h1>;
}

render(<Hello />);
```

</Sandpack>
