import { UnityObject } from '../native/context';
import { Vector3Native, Vector2Native } from '../native/vectors';

export enum InputButton {
  Left = 0,
  Right = 1,
  Middle = 2
}

export enum FramePressState {
  Pressed = 0,
  Released = 1,
  PressedAndReleased = 2,
  NotChanged = 3
}

export interface RaycastResult {
  readonly module: UnityObject;
  readonly distance: number;
  readonly index: number;
  readonly depth: number;
  readonly sortingLayer: number;
  readonly sortingOrder: number;
  readonly worldPosition: Vector3Native;
  readonly worldNormal: Vector3Native;
  readonly screenPosition: Vector2Native;
  readonly displayIndex: number;
  readonly gameObject: UnityObject;
  readonly isValid: boolean;
}

export interface BaseEventData {
  readonly currentInputModule: UnityObject;
  readonly selectedObject: UnityObject;
}

export interface PointerEventData extends BaseEventData {

  readonly pointerPress: UnityObject;
  readonly pressEventCamera: UnityObject;
  readonly enterEventCamera: UnityObject;
  readonly button: InputButton;
  readonly dragging: boolean;
  readonly useDragThreshold: boolean;
  readonly scrollDelta: Vector2Native;
  readonly clickCount: number;
  readonly clickTime: number;
  readonly pressPosition: Vector2Native;
  readonly delta: Vector2Native;
  readonly position: Vector2Native;
  readonly pointerId: number;
  readonly eligibleForClick: boolean;
  readonly pointerPressRaycast: RaycastResult;
  readonly pointerCurrentRaycast: RaycastResult;
  readonly pointerDrag: UnityObject;
  readonly rawPointerPress: UnityObject;
  readonly lastPress: UnityObject;
  readonly pointerEnter: UnityObject;

  IsPointerMoving(): boolean;
  IsScrolling(): boolean;
}


export type ActionCallback = () => void;
export type BaseEventCallback = (e: BaseEventData) => void;
export type PointerEventCallback = (e: PointerEventData) => void;

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
  onMove?: BaseEventCallback;
  onUpdateSelected?: BaseEventCallback;
  onScroll?: BaseEventCallback;
  onDrag?: PointerEventCallback;
  onBeginDrag?: BaseEventCallback;
  onEndDrag?: BaseEventCallback;
  onPotentialDrag?: BaseEventCallback;
  onDrop?: BaseEventCallback;
};
