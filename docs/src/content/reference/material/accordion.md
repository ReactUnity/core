---
title: Accordion
layout: API
---

<></>

<Sandpack>

```js
import { Accordion } from '@reactunity/material';
import '@reactunity/material/styles';

export default function App() {
  return <scroll class="main">
    <Accordion>
      <Accordion.Summary>
        <view>This is the accordion summary</view>
      </Accordion.Summary>

      <Accordion.Content>
        Accordion content
      </Accordion.Content>
    </Accordion>
  </scroll>;
}
```

```css
.main > * {
  margin: 10px 20px;
}
```

</Sandpack>
