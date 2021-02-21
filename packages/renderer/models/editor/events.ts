import { UnityEngine } from '../generated';

import ui = UnityEngine.UIElements;

export type Handler<T> = (ev: T) => void;
export type ActionCallback = () => void;
export type BaseEventCallback = (e: ui.EventBase) => void;


export interface Events {
  onClick?: Handler<ui.ClickEvent>;
  onPointerUp?: Handler<ui.PointerUpEvent>;
  onPointerDown?: Handler<ui.PointerDownEvent>;
  onPointerEnter?: Handler<ui.PointerEnterEvent>;
  onPointerLeave?: Handler<ui.PointerLeaveEvent>;
  onPointerCancel?: Handler<ui.PointerCancelEvent>;
  onPointerMove?: Handler<ui.PointerMoveEvent>;
  onPointerOut?: Handler<ui.PointerOutEvent>;
  onPointerOver?: Handler<ui.PointerOverEvent>;
  onPointerCapture?: Handler<ui.PointerCaptureEvent>;
  onPointerCaptureOut?: Handler<ui.PointerCaptureOutEvent>;
  onPointerStationary?: Handler<ui.PointerStationaryEvent>;
  onMouseUp?: Handler<ui.MouseUpEvent>;
  onMouseDown?: Handler<ui.MouseDownEvent>;
  onMouseEnter?: Handler<ui.MouseEnterEvent>;
  onMouseLeave?: Handler<ui.MouseLeaveEvent>;
  onMouseMove?: Handler<ui.MouseMoveEvent>;
  onMouseOut?: Handler<ui.MouseOutEvent>;
  onMouseOver?: Handler<ui.MouseOverEvent>;
  onMouseCapture?: Handler<ui.MouseCaptureEvent>;
  onMouseCaptureOut?: Handler<ui.MouseCaptureOutEvent>;
  onMouseEnterWindow?: Handler<ui.MouseEnterWindowEvent>;
  onMouseLeaveWindow?: Handler<ui.MouseLeaveWindowEvent>;
  onContextClick?: Handler<ui.ContextClickEvent>;
  onFocus?: Handler<ui.FocusEvent>;
  onFocusIn?: Handler<ui.FocusInEvent>;
  onBlur?: Handler<ui.BlurEvent>;
  onFocusOut?: Handler<ui.FocusOutEvent>;
  onWheel?: Handler<ui.WheelEvent>;
  onKeyDown?: Handler<ui.KeyDownEvent>;
  onKeyUp?: Handler<ui.KeyUpEvent>;
  onInput?: Handler<ui.InputEvent>;
  onDragEnter?: Handler<ui.DragEnterEvent>;
  onDragLeave?: Handler<ui.DragLeaveEvent>;
  onDragExited?: Handler<ui.DragExitedEvent>;
  onDragPerform?: Handler<ui.DragPerformEvent>;
  onDragUpdated?: Handler<ui.DragUpdatedEvent>;
  onDetachFromPanel?: Handler<ui.DetachFromPanelEvent>;
  onCustomStyleResolved?: Handler<ui.CustomStyleResolvedEvent>;
  onExecuteCommand?: Handler<ui.ExecuteCommandEvent>;
  onValidateCommand?: Handler<ui.ValidateCommandEvent>;
  onGeometryChanged?: Handler<ui.GeometryChangedEvent>;
  onIMGUI?: Handler<ui.IMGUIEvent>;
  onTooltip?: Handler<ui.TooltipEvent>;
}
