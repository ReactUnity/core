import { ReactUnity, UnityEngine } from '../generated';

export type ActionCallback<T = ReactUnity.Components.ReactComponent> = (sender: T) => void;
export type BaseEventCallback<T = ReactUnity.Components.ReactComponent> = (ev: UnityEngine.EventSystems.BaseEventData, sender: T) => void;
export type PointerEventCallback<T = ReactUnity.Components.ReactComponent> = (ev: UnityEngine.EventSystems.PointerEventData, sender: T) => void;
export type AxisEventCallback<T = ReactUnity.Components.ReactComponent> = (ev: UnityEngine.EventSystems.AxisEventData, sender: T) => void;
export type KeyEventCallback<T = ReactUnity.Components.ReactComponent> = (ev: ReactUnity.EventHandlers.KeyEventData, sender: T) => void;

export interface Events<T = ReactUnity.Components.ReactComponent> {
  onPointerClick?: PointerEventCallback<T>;
  onPointerUp?: PointerEventCallback<T>;
  onPointerDown?: PointerEventCallback<T>;
  onPointerEnter?: PointerEventCallback<T>;
  onPointerExit?: PointerEventCallback<T>;
  onSubmit?: BaseEventCallback<T>;
  onCancel?: BaseEventCallback<T>;
  onSelect?: BaseEventCallback<T>;
  onDeselect?: BaseEventCallback<T>;
  onMove?: AxisEventCallback<T>;
  onUpdateSelected?: BaseEventCallback<T>;
  onScroll?: PointerEventCallback<T>;
  onDrag?: PointerEventCallback<T>;
  onBeginDrag?: PointerEventCallback<T>;
  onEndDrag?: PointerEventCallback<T>;
  onPotentialDrag?: PointerEventCallback<T>;
  onDrop?: PointerEventCallback<T>;
  onKeyDown?: KeyEventCallback<T>;
};
