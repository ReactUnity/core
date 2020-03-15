import { NativeContainerInstance, NativeInstance, InstanceTag } from '../../models/renderer';

export type DiffResult = null | Array<string | any>;

export function diffProperties(
  lastRawProps: Record<string, any>,
  nextRawProps: Record<string, any>,
): DiffResult {
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
    if (propKey === 'style' || propKey === 'layout') {
      prop = diffProperties(lastProps[propKey], null);
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

    if (propKey === 'style' || propKey === 'layout') {
      prop = diffProperties(lastProp, nextProp);
      if (!prop) continue;
    }

    (updatePayload = updatePayload || []).push(propKey, prop);
  }

  return updatePayload;
}
