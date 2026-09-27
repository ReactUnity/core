---
packages:
  upm:com.reactunity.core:
    type: patch
---

### With `Pooling: All`, a pooled element comes back in the role it had

A pool used to hand back whichever element went in last, so a remount usually gave each element
someone else's role. Its background, border, shadow and mask graphics then had to be rebuilt for the
new one. Each spare is now filed under the `className` it had, and an element created with the same
`className` gets that spare first. When no spare matches, the pool falls back to the latest one as
before. This covers the default batched renderer. The `disableBatchRendering` path still gets the
latest spare, because its props arrive as a script object that is only read once the element exists.

`IPoolableComponent.PoolStack` is now a `PoolStack`, not a `Stack<IPoolableComponent>`.
`IPoolableComponent` also gains `PoolHint`: the `className` that files the component in its pool.

An element now parks at most two surplus box shadows and destroys the rest. Before this, every
pooled element kept as many shadows as any role had ever given it, and on the kitchen-sink Game HUD
the count grew from 165 to over 740 across 60 tab switches.

A revived element with no `className` also no longer reports the one it had before it was pooled.
