---
title: Toggle
layout: API
---

<></>

<Sandpack>

```js
import { Toggle, ToggleGroup } from '@reactunity/material';
import '@reactunity/material/styles';

export default function App() {
  return <scroll class="main">
    <Toggle>Checkbox</Toggle>
    <Toggle indeterminate>Indeterminate</Toggle>

    Radio Group:
    <ToggleGroup>
      <Toggle>Option 1</Toggle>
      <Toggle>Option 2</Toggle>
      <Toggle>Option 3</Toggle>
    </ToggleGroup>

    Checkbox Group:
    <ToggleGroup multiple initialValue={['val1', 'val2']} showSelectAll>
      <Toggle value="val1">Option 1</Toggle>
      <Toggle value="val2">Option 2</Toggle>
      <Toggle value="val3">Option 3</Toggle>
    </ToggleGroup>
  </scroll>;
}
```

```css
.main > * {
  margin: 10px 20px;
}
```

</Sandpack>
