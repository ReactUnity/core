export type FontWeight = 'thin' | 100 | 'extra-light' | 200 | 'light' | 300 | 'regular' | 400
  | 'medium' | 500 | 'semi-bold' | 600 | 'bold' | 700 | 'heavy' | 800 | 'black' | 900;

export type FontStyles = 'normal' | 'bold' | 'italic' | 'underline' | 'lowercase' | 'uppercase'
  | 'smallcaps' | 'strikethrough' | 'superscript' | 'subscript' | 'highlight';

export type TextTransform = 'none' | 'lowercase' | 'uppercase' | 'smallcaps' | 'capitalize';

export type TextOverflowModes = 'overflow' | 'ellipsis' | 'masking' | 'truncate' | 'scroll-rect' | 'page' | 'linked';
export type PointerEvents = 'auto' | 'visible' | 'all' | 'none';
export type Visibility = 'visible' | 'hidden';
export type Appearance = 'none' | 'button' | 'input' | 'toggle';
export type NavigationMode = 'none' | 'horizontal' | 'vertical' | 'automatic' | 'explicit';
export type WhiteSpace = 'normal' | 'nowrap';
export type ObjectFit = 'fill' | 'contain' | 'cover' | 'none' | 'scale-down';

export type BackgroundBlendMode = 'normal' | 'multiply' | 'screen' | 'overlay' | 'darken' | 'lighten'
  | 'color-dodge' | 'color-burn' | 'hard-light' | 'soft-light' | 'difference' | 'exclusion' | 'hue'
  | 'saturation' | 'color' | 'luminosity';

export type CursorType = 'auto' | 'default' | 'none' | 'context-menu' | 'help' | 'pointer' | 'progress'
  | 'wait' | 'cell' | 'crosshair' | 'text' | 'vertical-text' | 'alias' | 'copy' | 'move' | 'no-drop'
  | 'not-allowed' | 'e-resize' | 'n-resize' | 'ne-resize' | 'nw-resize' | 's-resize' | 'se-resize'
  | 'sw-resize' | 'w-resize' | 'ew-resize' | 'ns-resize' | 'nesw-resize' | 'nwse-resize' | 'col-resize'
  | 'row-resize' | 'all-scroll' | 'zoom-in' | 'zoom-out' | 'grab' | 'grabbing';

export type TextAlign = 'top-left' | 'top' | 'top-right' | 'top-justified' | 'top-flush' | 'top-geo-aligned'
  | 'left' | 'center' | 'right' | 'justified' | 'flush' | 'center-geo-aligned' | 'bottom-left' | 'bottom'
  | 'bottom-right' | 'bottom-justified' | 'bottom-flush' | 'bottom-geo-aligned' | 'baseline-left' | 'baseline'
  | 'baseline-right' | 'baseline-justified' | 'baseline-flush' | 'baseline-geo-aligned' | 'midline-left' | 'midline'
  | 'midline-right' | 'midline-justified' | 'midline-flush' | 'midline-geo-aligned' | 'capline-left' | 'capline'
  | 'capline-right' | 'capline-justified' | 'capline-flush' | 'capline-geo-aligned' | 'converted';

export type TimingFunctionType = 'ease' | 'linear' | 'ease-in' | 'ease-out' | 'ease-in-out' | 'step-start' | 'step-end';
export type AnimationFillMode = 'none' | 'both' | 'forwards' | 'backwards';
export type AnimationDirection = 'normal' | 'reverse' | 'alternate' | 'alternate-reverse';
export type AnimationPlayState = 'running' | 'paused';
export type BackgroundSize = 'cover' | 'contain';
