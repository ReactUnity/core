---
title: useGlobals()
layout: API
---

`useGlobals` is a hook that returns the `Globals` object, which is the shared object dictionary between React and C# sides.

```js
const globals = useGlobals();
```

The hook will rerender the component it is used in when the `Globals` object changes in either side. Although the `Globals` object can be accessed directly, this hook is the recommended way to access it on React components.

<Sandpack>

```js App.js active
import { useGlobals } from '@reactunity/renderer';

Globals.testCount = 0;

function ForeignComponent() {
  return <button onClick={() => Globals.testCount++}>
    Increase count
  </button>;
}

function HookGlobalsUser() {
  const globals = useGlobals();

  return <text>
    Count with hook is: {globals.testCount}
  </text>;
}

function StaticGlobalsUser() {
  return <text>
    Count without hook is: {Globals.testCount}
  </text>;
}

export default function App() {
  return <>
    <ForeignComponent />
    <HookGlobalsUser />
    <StaticGlobalsUser />
  </>;
}
```

</Sandpack>

In the example, it can be seen that when `Globals` is used without hook, changes to it will not cause a rerender and UI may be out of sync with its state.
