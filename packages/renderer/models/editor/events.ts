import { BaseEvents } from '../base-events';
import { ReactUnity, UnityEngine } from '../generated';

import ui = UnityEngine.UIElements;

type BaseCmp = ReactUnity.UIToolkit.UIToolkitComponent;
export type Handler<T, TSender = BaseCmp> = (ev: T, sender: TSender) => void;
export type ActionCallback<TSender = BaseCmp> = (sender: TSender) => void;
export type BaseEventCallback = (e: ui.EventBase) => void;

export interface Events<TSender = BaseCmp> extends BaseEvents<TSender> {
  onClick?: Handler<ui.ClickEvent, TSender>;
  onPointerUp?: Handler<ui.PointerUpEvent, TSender>;
  onPointerDown?: Handler<ui.PointerDownEvent, TSender>;
  onPointerEnter?: Handler<ui.PointerEnterEvent, TSender>;
  onPointerLeave?: Handler<ui.PointerLeaveEvent, TSender>;
  onPointerCancel?: Handler<ui.PointerCancelEvent, TSender>;
  onPointerMove?: Handler<ui.PointerMoveEvent, TSender>;
  onPointerOut?: Handler<ui.PointerOutEvent, TSender>;
  onPointerOver?: Handler<ui.PointerOverEvent, TSender>;
  onPointerCapture?: Handler<ui.PointerCaptureEvent, TSender>;
  onPointerCaptureOut?: Handler<ui.PointerCaptureOutEvent, TSender>;
  onPointerStationary?: Handler<ui.PointerStationaryEvent, TSender>;
  onMouseUp?: Handler<ui.MouseUpEvent, TSender>;
  onMouseDown?: Handler<ui.MouseDownEvent, TSender>;
  onMouseEnter?: Handler<ui.MouseEnterEvent, TSender>;
  onMouseLeave?: Handler<ui.MouseLeaveEvent, TSender>;
  onMouseMove?: Handler<ui.MouseMoveEvent, TSender>;
  onMouseOut?: Handler<ui.MouseOutEvent, TSender>;
  onMouseOver?: Handler<ui.MouseOverEvent, TSender>;
  onMouseCapture?: Handler<ui.MouseCaptureEvent, TSender>;
  onMouseCaptureOut?: Handler<ui.MouseCaptureOutEvent, TSender>;
  onMouseEnterWindow?: Handler<ui.MouseEnterWindowEvent, TSender>;
  onMouseLeaveWindow?: Handler<ui.MouseLeaveWindowEvent, TSender>;
  onContextClick?: Handler<ui.ContextClickEvent, TSender>;
  onFocus?: Handler<ui.FocusEvent, TSender>;
  onFocusIn?: Handler<ui.FocusInEvent, TSender>;
  onBlur?: Handler<ui.BlurEvent, TSender>;
  onFocusOut?: Handler<ui.FocusOutEvent, TSender>;
  onWheel?: Handler<ui.WheelEvent, TSender>;
  onKeyDown?: Handler<ui.KeyDownEvent, TSender>;
  onKeyUp?: Handler<ui.KeyUpEvent, TSender>;
  onInput?: Handler<ui.InputEvent, TSender>;
  onDragEnter?: Handler<ui.DragEnterEvent, TSender>;
  onDragLeave?: Handler<ui.DragLeaveEvent, TSender>;
  onDragExited?: Handler<ui.DragExitedEvent, TSender>;
  onDragPerform?: Handler<ui.DragPerformEvent, TSender>;
  onDragUpdated?: Handler<ui.DragUpdatedEvent, TSender>;
  onDetachFromPanel?: Handler<ui.DetachFromPanelEvent, TSender>;
  onCustomStyleResolved?: Handler<ui.CustomStyleResolvedEvent, TSender>;
  onExecuteCommand?: Handler<ui.ExecuteCommandEvent, TSender>;
  onValidateCommand?: Handler<ui.ValidateCommandEvent, TSender>;
  onGeometryChanged?: Handler<ui.GeometryChangedEvent, TSender>;
  onIMGUI?: Handler<ui.IMGUIEvent, TSender>;
  onTooltip?: Handler<ui.TooltipEvent, TSender>;
}
