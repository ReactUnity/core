import { UnityEngine as UE } from '@reactunity/renderer/editor';
import { ReactUnity } from "@reactunity/renderer/editor";
import { useRef, useEffect } from "react";

const len = importNamespace('UnityEngine').UIElements.StyleLength;

export function useDragManipulator(target: ReactUnity.Editor.Renderer.Components.EditorReactComponent, onDrag?: () => void, onDrop?: () => void) {
  const m_Start = useRef<UE.Vector2>();
  const m_Active = useRef(false);

  const CanStartManipulation = (e) => {
    return true;
  };

  const CanStopManipulation = (e) => {
    return true;
  };

  const OnMouseDown = (e: UE.UIElements.MouseDownEvent) => {
    if (m_Active.current) {
      e.StopImmediatePropagation();
      return;
    }

    if (!CanStartManipulation(e)) return;

    m_Start.current = e.mousePosition;
    m_Active.current = true;
    target.CaptureMouse();

    e.StopPropagation();
  };

  const OnMouseMove = (e: UE.UIElements.MouseMoveEvent) => {
    if (!m_Active.current || !target.HasMouseCapture()) return;

    const diff = new UnityEngine.Vector2(e.mousePosition.x - m_Start.current.x, e.mousePosition.y - m_Start.current.y);
    target.Element.style.top = new len(diff.y);
    target.Element.style.left = new len(diff.x);

    e.StopPropagation();
  };


  const OnMouseUp = (e: UE.UIElements.MouseUpEvent) => {
    if (!m_Active.current
      || !target.HasMouseCapture()
      || !CanStopManipulation(e))
      return;


    target.Element.style.top = new len(0);
    target.Element.style.left = new len(0);

    m_Active.current = false;
    target.ReleaseMouse();
    e.StopPropagation();
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
  }, [target]);
}
