export type DiffResult = null | Record<string, any>;

export const styleStringSymbol = '__style_as_string__';

export function diffProperties(
  lastProps: Record<string, any>,
  nextProps: Record<string, any>,
  deepDiffing = 0,
): DiffResult {
  if (lastProps === nextProps) return null;
  let updatePayload: DiffResult = null;

  let propKey;
  for (propKey in lastProps) {
    if (
      nextProps.hasOwnProperty(propKey)
      || !lastProps.hasOwnProperty(propKey)
      || lastProps[propKey] == null
    ) {
      continue;
    }

    let prop = null;

    if (propKey === 'style' && typeof lastProps.style === 'string') {
      (updatePayload = updatePayload || {})[styleStringSymbol] = null;
    }

    const depth = deepDiffing > 0 ? deepDiffing : propKey === 'style' ? 1 : 0;
    if (depth > 0) {
      prop = diffProperties(lastProps[propKey], null, depth - 1);
      if (!prop) continue;
    }

    // For all other deleted properties we add it to the queue. We use
    // the whitelist in the commit phase instead.
    (updatePayload = updatePayload || {})[propKey] = prop;
  }
  for (propKey in nextProps) {
    const nextProp = nextProps[propKey];
    const lastProp = lastProps != null ? lastProps[propKey] : undefined;
    if (
      !nextProps.hasOwnProperty(propKey)
      || nextProp === lastProp
      || (nextProp == null && lastProp == null)
    ) {
      continue;
    }

    let prop = nextProp;

    if (propKey === 'style' && (typeof prop === 'string') !== (typeof lastProp === 'string')) {
      (updatePayload = updatePayload || {})[styleStringSymbol] = typeof prop === 'string' ? prop : null;
    }

    const depth = deepDiffing > 0 ? deepDiffing : propKey === 'style' ? 1 : 0;
    if (depth > 0) {
      prop = diffProperties(lastProp, nextProp, depth - 1);
      if (!prop) continue;
    }

    (updatePayload = updatePayload || {})[propKey] = prop;
  }

  return updatePayload;
}
