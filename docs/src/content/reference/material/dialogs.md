---
title: Dialogs
layout: API
---

<></>

<Sandpack>

```js
import { Button, AlertDialog, ConfirmDialog, PromptDialog } from '@reactunity/material';
import '@reactunity/material/styles';

export default function App() {
  const [dlOpen, setDlOpen] = React.useState(0);

  return <scroll class="main">
    <view>
      <Button onClick={() => setDlOpen(1)}>Open Alert With Text Only</Button>
      <Button onClick={() => setDlOpen(2)}>Open Alert With Title Only</Button>
      <Button onClick={() => setDlOpen(3)}>Open Alert With Text & Title</Button>

      <AlertDialog open={dlOpen === 1} onClose={() => setDlOpen(0)} backdropClose text={'Some alert text'} />
      <AlertDialog open={dlOpen === 2} onClose={() => setDlOpen(0)} backdropClose title={'Some alert title'} />
      <AlertDialog open={dlOpen === 3} onClose={() => setDlOpen(0)} backdropClose text={'Some alert text'} title={'Some alert title'} />
    </view>

    <view>
      <Button onClick={() => setDlOpen(4)}>Open Confirm With Text Only</Button>
      <Button onClick={() => setDlOpen(5)}>Open Confirm With Title Only</Button>
      <Button onClick={() => setDlOpen(6)}>Open Confirm With Text & Title</Button>

      <ConfirmDialog open={dlOpen === 4} onClose={() => setDlOpen(0)} backdropClose text={'Some confirm text'} />
      <ConfirmDialog open={dlOpen === 5} onClose={() => setDlOpen(0)} backdropClose title={'Some confirm title'} />
      <ConfirmDialog open={dlOpen === 6} onClose={() => setDlOpen(0)} backdropClose text={'Some confirm text'} title={'Some confirm title'} />
    </view>

    <view>
      <Button onClick={() => setDlOpen(7)}>Open Prompt With Text Only</Button>
      <Button onClick={() => setDlOpen(8)}>Open Prompt With Title Only</Button>
      <Button onClick={() => setDlOpen(9)}>Open Prompt With Text & Title</Button>

      <PromptDialog open={dlOpen === 7} onClose={() => setDlOpen(0)} backdropClose text={'Some prompt text'} />
      <PromptDialog open={dlOpen === 8} onClose={() => setDlOpen(0)} backdropClose title={'Some prompt title'} />
      <PromptDialog placeholder="Some placeholder" open={dlOpen === 9} onClose={() => setDlOpen(0)} backdropClose text={'Some prompt text'} title={'Some prompt title'} />
    </view>
  </scroll>;
}
```

```css
.main > * {
  margin: 10px 20px;
}
```

</Sandpack>
