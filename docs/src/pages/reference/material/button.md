---
title: Button
layout: API
---

<Sandpack>

```js App.js active
import { Button } from '@reactunity/material';

export default function App() {
  return <scroll class="main">
    <Button variant="filled" elevation={4}>
      Filled Button
    </Button>

    <Button variant="outlined">
      Outlined Button
    </Button>

    <Button variant="text">
      Text Button
    </Button>

    <Button variant="icon">
      <icon>person</icon>
    </Button>
  </scroll>;
}
```

```css style.css
.main > * {
  margin: 10px 20px;
  align-self: center;
}

.mat-button.mat-variant-icon {
  background: yellow;
  color: magenta;
}
```

</Sandpack>
