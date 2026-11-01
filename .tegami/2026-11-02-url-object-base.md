---
packages:
  upm:com.reactunity.core:
    type: patch
  npm:@reactunity/renderer:
    type: patch
---

### `new URL(path, base)` accepts a URL object as the base

`URL` only took a string base, so passing a `URL` instance threw `no overload method matched for
URL.constructor` on QuickJS and a missing-constructor error on ClearScript. Jint already accepted
it. react-router 8.3.1 resolves every `navigate()` target against `history.createURL('/')`, so every
`useNavigate` call failed on those two engines. A `URL` base now resolves the same way as its `href`.
