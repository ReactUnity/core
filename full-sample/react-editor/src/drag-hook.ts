import { ReactUnity, UnityEngine as UE } from '@reactunity/renderer/editor';
import { useEffect, useRef } from "react";

type BaseEl = ReactUnity.Editor.Components.EditorComponent;

export function useDragManipulator<T extends BaseEl = BaseEl>(
  target: T,
  onDragStart?: (ev: UE.UIElements.MouseDownEvent, sender: T) => void,
  onDrag?: (ev: UE.UIElements.MouseDownEvent, startEv: UE.UIElements.MouseDownEvent, sender: T) => void,
  onDragEnd?: (ev: UE.UIElements.MouseUpEvent, startEv: UE.UIElements.MouseDownEvent, sender: T) => void,
  canStartManipulation?: (ev: UE.UIElements.MouseDownEvent) => boolean,
  canStopManipulation?: (ev: UE.UIElements.MouseUpEvent) => boolean,
) {
  const startEv = useRef<UE.UIElements.MouseDownEvent>();
  const isActive = useRef(false);

  const OnMouseDown = (ev: UE.UIElements.MouseDownEvent) => {
    if (isActive.current) {
      ev.StopImmediatePropagation();
      return;
    }

    if (canStartManipulation && !canStartManipulation(ev)) return;

    startEv.current = ev;
    isActive.current = true;
    target.CaptureMouse();

    ev.StopPropagation();

    onDragStart?.(ev, target);
  };

  const OnMouseMove = (ev: UE.UIElements.MouseMoveEvent) => {
    if (!isActive.current || !target.HasMouseCapture()) return;

    ev.StopPropagation();
    onDrag?.(ev, startEv.current, target);
  };


  const OnMouseUp = (ev: UE.UIElements.MouseUpEvent) => {
    if (!isActive.current
      || !target.HasMouseCapture()
      || (canStopManipulation && !canStopManipulation(ev)))
      return;

    isActive.current = false;
    startEv.current = null;
    target.ReleaseMouse();
    ev.StopPropagation();

    onDragEnd?.(ev, startEv.current, target);
  };

  useEffect(() => {
    if (!target) return;

    target.SetEventListener("onMouseDown", Callback(OnMouseDown));
    target.SetEventListener("onMouseMove", Callback(OnMouseMove));
    target.SetEventListener("onMouseUp", Callback(OnMouseUp));

    return () => {
      target.SetEventListener("onMouseDown", null);
      target.SetEventListener("onMouseMove", null);
      target.SetEventListener("onMouseUp", null);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target]);
}
