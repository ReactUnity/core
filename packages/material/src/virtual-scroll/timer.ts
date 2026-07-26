export type TimeoutID = { id: any };

export function cancelTimeout(timeoutID: TimeoutID) {
  clearTimeout(timeoutID.id);
}

export function requestTimeout(callback: () => void, delay: number): TimeoutID {
  return { id: setTimeout(callback, delay) };
}
