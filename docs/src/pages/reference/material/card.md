---
title: Paper
layout: API
---

<Sandpack>

```js App.js active
import { Card } from '@reactunity/material';

export default function App() {
  return <scroll class="main">
    <Card elevation={1}>
      <Card.Content>
        Card with elevation 1
      </Card.Content>
    </Card>

    <Card elevation={3}>
      <Card.Content>
        Card with elevation 3
      </Card.Content>
    </Card>

    <Card elevation={8}>
      <Card.Content>
        Card with elevation 8
      </Card.Content>
    </Card>
  </scroll>;
}
```

```css style.css
.main > * {
  margin: 10px 20px;
}
```

</Sandpack>
