// Counted, because the failure this guards against is a second evaluation and not an error: the
// chunk below imports this file back, the way a code-split bundle shares its runtime.
globalThis.__probe_evals = (globalThis.__probe_evals || 0) + 1;

export const tag = 'entry';

import('./self-chunk.js').then((m) => {
  globalThis.__probe_tag = m.viaEntry;
});
