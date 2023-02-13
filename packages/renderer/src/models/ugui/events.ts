import { BaseEvents } from '../base';
import { ReactUnity, UnityEngine } from '../generated';

type BaseCmp = ReactUnity.UGUI.UGUIComponent;
export type ActionCallback<T = BaseCmp> = (sender: T) => void;
export type BaseEventCallback<T = BaseCmp> = (ev: UnityEngine.EventSystems.BaseEventData, sender: T) => void;
export type PointerEventCallback<T = BaseCmp> = (ev: UnityEngine.EventSystems.PointerEventData, sender: T) => void;
export type AxisEventCallback<T = BaseCmp> = (ev: UnityEngine.EventSystems.AxisEventData, sender: T) => void;
export type KeyEventCallback<T = BaseCmp> = (ev: ReactUnity.UGUI.EventHandlers.KeyEventData, sender: T) => void;
export type ResizeEventCallback<T = BaseCmp> = (ev: ReactUnity.UGUI.EventHandlers.ResizeEventData, sender: T) => void;

export interface Events<T = BaseCmp> extends BaseEvents<T> {
  onPointerClick?: PointerEventCallback<T>;
  onPointerUp?: PointerEventCallback<T>;
  onPointerDown?: PointerEventCallback<T>;
  onPointerEnter?: PointerEventCallback<T>;
  onPointerExit?: PointerEventCallback<T>;
  onPointerMove?: PointerEventCallback<T>;
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
  onResize?: ResizeEventCallback<T>;

  onDoubleClick?: PointerEventCallback<T>;
  onContextMenu?: PointerEventCallback<T>;

  /**
   * @alias onPointerClick
   */
  onClick?: PointerEventCallback<T>;

  /**
   * @alias onPointerUp
   */
  onMouseUp?: PointerEventCallback<T>;

  /**
   * @alias onPointerDown
   */
  onMouseDown?: PointerEventCallback<T>;

  /**
   * @alias onPointerEnter
   */
  onMouseEnter?: PointerEventCallback<T>;

  /**
   * @alias onPointerExit
   */
  onMouseLeave?: PointerEventCallback<T>;

  /**
   * @alias onPointerMove
   */
  onMouseMove?: PointerEventCallback<T>;

  /**
   * @alias onPointerEnter
   */
  onMouseOver?: PointerEventCallback<T>;

  /**
   * @alias onPointerExit
   */
  onMouseOut?: PointerEventCallback<T>;

  /**
   * @alias onSelect
   */
  onFocus?: BaseEventCallback<T>;

  /**
   * @alias onDeselect
   */
  onBlur?: BaseEventCallback<T>;
};
