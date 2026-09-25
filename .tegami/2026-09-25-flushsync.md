---
packages:
  npm:@reactunity/renderer:
    type: patch
---

### `flushSync` works again

`flushSync` from `@reactunity/renderer` threw `TypeError: not a function` on every call. It called
the reconciler's `flushSync`, which react-reconciler 0.33 renamed to `flushSyncFromReconciler`, and
the reconciler's typings still declare the old name, so nothing caught it. It now commits the
updates its callback schedules before it returns, including on roots rendered with
`disableBatchRendering`.
