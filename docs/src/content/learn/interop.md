---
title: React - C# communication (Interop)
---

<Intro>

Interoperability (Interop for short) is the exchange of information between two systems. In the case of ReactUnity, the two systems are React (Javascript), and the Unity (C#). Interop refers to the exchange of data, function calls and events between these two systems.

</Intro>

## Ways to achieve interop

There are several ways to achieve interop in ReactUnity.

### `Globals` object

This method uses the `Globals` object to have two-way communication between React and C#. Also, `useGlobals` is a hook that is available in React side and it rerenders the component when `Globals` object changes.

API reference for `useGlobals` can be found [here](/reference/api/useglobals).

### `Interop` namespace

`Interop` is a namespace in React side that can be used to call C# and Unity static functions from React side. It allows doing C# operations without going out of Javascript.

`Interop` namespace exports some C# namespaces that you can use. These are: `System`, `Unity` and `UnityEngine`.


<Sandpack>

```js App.js
export default function App() {
  const ref = React.useRef();
  const randomize = () => {
    const r = Math.random();
    const g = Math.random();
    const b = Math.random();
    const color = new Interop.UnityEngine.Color(r, g, b);
    ref.current.Style.backgroundColor = color;
  };

  return <>
    <button onClick={randomize} ref={ref}>
      Randomize color
    </button>
  </>;
}
```

</Sandpack>
