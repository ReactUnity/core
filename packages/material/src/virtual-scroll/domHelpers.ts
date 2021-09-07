
export function getScrollbarSize(): number {
  // TODO:
  return 10;
}

export type RTLOffsetType =
  | 'negative'
  | 'positive-descending'
  | 'positive-ascending';

export function getRTLOffsetType(): RTLOffsetType {
  return 'positive-ascending';
}
