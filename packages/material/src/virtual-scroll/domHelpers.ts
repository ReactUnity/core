import { ReactUnity } from '@reactunity/renderer';

export function getScrollbarSize(el: ReactUnity.UGUI.ScrollComponent): { verticalWidth: number, horizontalHeight: number } {
  return {
    verticalWidth: el.VerticalScrollbar.Thumb.ClientWidth,
    horizontalHeight: el.HorizontalScrollbar.Thumb.ClientHeight,
  };
}

export type RTLOffsetType =
  | 'negative'
  | 'positive-descending'
  | 'positive-ascending';

export function getRTLOffsetType(): RTLOffsetType {
  return 'positive-ascending';
}
