---
packages:
  upm:com.reactunity.core:
    type: patch
---

### `PoolingType.All` pools elements under the default renderer, and a reused one starts clean

Under `PoolingType.All`, the batched renderer (the default) never pooled an element. It sends the
pool key of an element without a `pool` prop as `null`, and the command reader turned that into
`""`, which means `pool={false}`. The unbatched renderer pooled them all along, so the two
disagreed. A missing key now reaches the context as `null` and pools under `All` in both. `pool={false}`
still opts an element out. `Basic`, the default, only pools text and pseudo elements and is
unchanged.

A reused element also used to keep every prop its previous owner set that the new one does not,
because a create command carries only the props that are present. Styles were already reset. Props
were not, so a reused element could still be hidden by `active={false}`, still checked or disabled,
still pointing at another element's `href`, camera, prefab target, video, SVG content or icon set,
or still limited by an input's `characterLimit` and `contentType`. Each UGUI element now puts its
props back to what a new one has. An element with a camera, prefab target or video lets go of it
when it is unmounted, not when it is reused.

- A pooled element is dropped from the ref table, so its old ref id no longer resolves to whatever
  element reuses it.
- An element whose `Pool()` refuses it is destroyed. It used to be left in the scene.
- Disposing a context no longer pools anything, so a portal under `All` is destroyed with its
  context. Before, it was pooled and outlived the context.
- A reused scrollbar has its `data-horizontal`/`data-vertical`/`data-direction` again, and an
  input no longer drives a scrollbar that went back to the pool.
- UIToolkit and Editor elements are no longer pooled under `All`. A `VisualElement` is cheap to
  build, and each kind has native fields a reuse would have to reset one by one. Text and pseudo
  elements are pooled as before.
