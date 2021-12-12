---
title: Paper
layout: API
---

<Sandpack>

```js App.js active
import { Paper } from '@reactunity/material';
import '@reactunity/material/styles';

export default function App() {
  return <scroll class="main">
    <Paper elevation={1}>
      Paper with elevation 1
    </Paper>

    <Paper elevation={3}>
      Paper with elevation 3
    </Paper>

    <Paper elevation={8}>
      Paper with elevation 8
    </Paper>
  </scroll>;
}
```

```css style.css
.main > * {
  margin: 10px 20px;
}
```

</Sandpack>
