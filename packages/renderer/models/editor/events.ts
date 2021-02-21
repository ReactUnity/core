import { UnityEngine } from '../generated';

import ui = UnityEngine.UIElements;

export type ActionCallback = () => void;
export type BaseEventCallback = (e: ui.EventBase) => void;
export type PointerEventCallback = (e: ui.IMouseEvent) => void;
export type AxisEventCallback = (e: ui.WheelEvent) => void;
export type KeyEventCallback = (e: ui.IKeyboardEvent) => void;


export interface Events {
  onPointerClick?: BaseEventCallback;
  onPointerUp?: BaseEventCallback;
  onPointerDown?: BaseEventCallback;
  onPointerEnter?: BaseEventCallback;
  onPointerLeave?: BaseEventCallback;
  onPointerCancel?: BaseEventCallback;
  onPointerMove?: BaseEventCallback;
  onPointerOut?: BaseEventCallback;
  onPointerOver?: BaseEventCallback;
  onPointerCapture?: BaseEventCallback;
  onPointerCaptureOut?: BaseEventCallback;
  onPointerStationary?: BaseEventCallback;
  onMouseUp?: BaseEventCallback;
  onMouseDown?: BaseEventCallback;
  onMouseEnter?: BaseEventCallback;
  onMouseLeave?: BaseEventCallback;
  onMouseMove?: BaseEventCallback;
  onMouseOut?: BaseEventCallback;
  onMouseOver?: BaseEventCallback;
  onMouseCapture?: BaseEventCallback;
  onMouseCaptureOut?: BaseEventCallback;
  onMouseEnterWindow?: BaseEventCallback;
  onMouseLeaveWindow?: BaseEventCallback;
  onContextClick?: BaseEventCallback;
  onFocus?: BaseEventCallback;
  onBeforeFocus?: BaseEventCallback;
  onBlur?: BaseEventCallback;
  onBeforeBlur?: BaseEventCallback;
  onWheel?: BaseEventCallback;
  onKeyDown?: BaseEventCallback;
  onKeyUp?: BaseEventCallback;
  onInput?: BaseEventCallback;
  onDragEnter?: BaseEventCallback;
  onDragLeave?: BaseEventCallback;
  onDragExited?: BaseEventCallback;
  onDragPerform?: BaseEventCallback;
  onDragUpdated?: BaseEventCallback;
  onDetachFromPanel?: BaseEventCallback;
  onCustomStyleResolved?: BaseEventCallback;
  onExecuteCommand?: BaseEventCallback;
  onValidateCommand?: BaseEventCallback;
  onGeometryChanged?: BaseEventCallback;
  onIMGUI?: BaseEventCallback;
  onTooltip?: BaseEventCallback;
}
