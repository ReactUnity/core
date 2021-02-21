import { ReactUnity, UnityEngine } from '../generated';

export type ActionCallback = () => void;
export type BaseEventCallback = (e: UnityEngine.EventSystems.BaseEventData) => void;
export type PointerEventCallback = (e: UnityEngine.EventSystems.PointerEventData) => void;
export type AxisEventCallback = (e: UnityEngine.EventSystems.AxisEventData) => void;
export type KeyEventCallback = (e: ReactUnity.EventHandlers.KeyEventData) => void;

export type Events = {
  onPointerClick?: PointerEventCallback;
  onPointerUp?: PointerEventCallback;
  onPointerDown?: PointerEventCallback;
  onPointerEnter?: PointerEventCallback;
  onPointerExit?: PointerEventCallback;
  onSubmit?: BaseEventCallback;
  onCancel?: BaseEventCallback;
  onSelect?: BaseEventCallback;
  onDeselect?: BaseEventCallback;
  onMove?: AxisEventCallback;
  onUpdateSelected?: BaseEventCallback;
  onScroll?: BaseEventCallback;
  onDrag?: PointerEventCallback;
  onBeginDrag?: PointerEventCallback;
  onEndDrag?: PointerEventCallback;
  onPotentialDrag?: PointerEventCallback;
  onDrop?: PointerEventCallback;
  onKeyDown?: KeyEventCallback;
};
