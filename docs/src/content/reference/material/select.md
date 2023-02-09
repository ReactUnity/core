---
title: Select
layout: API
---

<></>

<Sandpack>

```js App.js active
import { Select } from '@reactunity/material';
import '@reactunity/material/styles';

export default function App() {
  return <scroll class="main">
    <Select placeholder={'Regular select'} initialValue="val1">
      <Select.Option value="val1">Option 1</Select.Option>
      <Select.Option value="val2">Option 2</Select.Option>
      <Select.Option value="val3">Option 3</Select.Option>
      <Select.Option value="val4">Option 4</Select.Option>
      <Select.Option value="val5">Option 5</Select.Option>
      <Select.Option value="val6">Option 6</Select.Option>
      <Select.Option value="val7">Option 7</Select.Option>
      <Select.Option value="val8">Option 8</Select.Option>
      <Select.Option value="val9">Option 9</Select.Option>
      <Select.Option value="val10">Option 10</Select.Option>
      <Select.Option value="val11">Option 11</Select.Option>
      <Select.Option value="val12">Option 12</Select.Option>
      <Select.Option value="val13">Option 13</Select.Option>
    </Select>

    <Select multiple initialValue={['val1', 'val2']} placeholder={'Multiple with initial value'}>
      <Select.Option value="val1">Option 1</Select.Option>
      <Select.Option value="val2">Option 2</Select.Option>
      <Select.Option value="val3">Option 3</Select.Option>
    </Select>

    <Select multiple chips initialValue={['val1', 'val2']} placeholder={'Chips selection'}>
      <Select.Option value="val1">Option 1</Select.Option>
      <Select.Option value="val2">Option 2</Select.Option>
      <Select.Option value="val3">Option 3</Select.Option>
      <Select.Option value="val4">Option 4</Select.Option>
      <Select.Option value="val5">Option 5</Select.Option>
    </Select>
  </scroll>;
}
```

```css style.css
:root {
  background: white;
}

.main > * {
  margin: 10px 20px;
}
```

</Sandpack>
