export type DiffResult = null | Array<string | any>;

const deepDiffProps = {
  style: 1,
  layout: 1,
  stateStyles: 2,
};

export function diffProperties(
  lastRawProps: Record<string, any>,
  nextRawProps: Record<string, any>,
  deepDiffing = 0,
): DiffResult {
  if (lastRawProps == nextRawProps) return null;
  let updatePayload: DiffResult = null;

  const lastProps = lastRawProps;
  const nextProps = nextRawProps;

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
    const depth = deepDiffing > 0 ? deepDiffing : deepDiffProps[propKey] || 0;
    if (depth > 0) {
      prop = diffProperties(lastProps[propKey], null, depth - 1);
      if (!prop) continue;
    }

    // For all other deleted properties we add it to the queue. We use
    // the whitelist in the commit phase instead.
    (updatePayload = updatePayload || []).push(propKey, prop);
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
    const depth = deepDiffing > 0 ? deepDiffing : deepDiffProps[propKey] || 0;
    if (depth > 0) {
      prop = diffProperties(lastProp, nextProp, depth - 1);
      if (!prop) continue;
    }

    (updatePayload = updatePayload || []).push(propKey, prop);
  }

  return updatePayload;
}
