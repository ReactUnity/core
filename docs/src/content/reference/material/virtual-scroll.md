---
title: Virtual Scroll
layout: API
---

<Sandpack>

```js App.js active
import { FixedSizeList } from '@reactunity/material';
import '@reactunity/material/styles';

const Row = (props) =>
  <text style={props.style}>Row {props.index}</text>;

const FixedSizeExample = () => (
  <FixedSizeList
    height={450}
    itemCount={10000}
    itemSize={30}
    width={300}
    smoothness={0}
  >
    {Row}
  </FixedSizeList>
);

export default function App() {
  return <FixedSizeExample />;
}
```

```css style.css
scroll::scrollbar-thumb {
  box-shadow: 0 0 0 3px black;
  background-color: black;
}
```

</Sandpack>
