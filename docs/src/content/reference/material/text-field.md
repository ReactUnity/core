---
title: Text Field
layout: API
---

<Sandpack>

```js App.js active
import { TextField } from '@reactunity/material';
import '@reactunity/material/styles';

export default function App() {
  return <scroll class="main">
    <TextField placeholder="Standard" variant="standard" />
    <TextField placeholder="Outlined" variant="outlined" />
    <TextField placeholder="Filled" variant="filled" />
    <TextField placeholder="Password" contentType="password" />
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
