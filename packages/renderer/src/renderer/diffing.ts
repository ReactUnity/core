import { NativeContainerInstance, NativeInstance, InstanceTag } from '../../models/renderer';

export type DiffResult = null | Array<string | any>;

export function diffProperties(
  instance: NativeInstance,
  tag: InstanceTag,
  lastRawProps: Record<string, any>,
  nextRawProps: Record<string, any>,
  rootContainerElement: NativeContainerInstance,
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

    // For all other deleted properties we add it to the queue. We use
    // the whitelist in the commit phase instead.
    (updatePayload = updatePayload || []).push(propKey, null);
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

    (updatePayload = updatePayload || []).push(propKey, nextProp);
  }

  return updatePayload;
}
