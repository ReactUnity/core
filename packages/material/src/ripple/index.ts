import { ReactUnity, UnityEngine } from '@reactunity/renderer';
import { PointerEventCallback, UGUIElements } from '@reactunity/renderer/ugui';
import React, { useCallback, useRef } from 'react';
import style from './index.module.scss';

type Props = UGUIElements['view'];
export type RippleBaseProps = {
  onPointerDown?: PointerEventCallback<any>;
  onPointerUp?: PointerEventCallback<any>;
  noRipple?: boolean;
  centered?: boolean;
  target?: React.RefObject<ReactUnity.UGUI.UGUIComponent>;
};

export function addRipple(containerElement: ReactUnity.UGUI.UGUIComponent, pressPosition?: UnityEngine.Vector2) {
  if (!containerElement) return null;
  const ripple = UnityBridge.createElement('view', '', HostContainer) as unknown as ReactUnity.UGUI.UGUIComponent;
  ripple.ClassName = `${style.ripple} mat-ripple`;
  ripple.Name = '<Ripple>';

  const w = containerElement.RectTransform.rect.width;
  const h = containerElement.RectTransform.rect.height;
  const maxDimension = Math.max(w, h);

  if (pressPosition) {
    const pos = containerElement.GetRelativePosition(pressPosition.x, pressPosition.y);
    ripple.Style.Set('left', pos.x);
    ripple.Style.Set('top', pos.y);

    const hw = w / 2;
    const hh = h / 2;

    const rx = pos.x > hw ? 0 : w;
    const ry = pos.y > hh ? 0 : h;

    const dx = rx - pos.x;
    const dy = ry - pos.y;

    const mag = Math.sqrt(dx * dx + dy * dy) * 2.1;

    ripple.Style.Set('width', mag);
    ripple.Style.Set('height', mag);
  } else {
    ripple.Style.Set('position', 'inset');
    ripple.Style.Set('left', '50%');
    ripple.Style.Set('top', '50%');
    ripple.Style.Set('width', maxDimension);
    ripple.Style.Set('height', maxDimension);
  }

  containerElement.ClassList.Add(style.rippleParent);
  UnityBridge.appendChild(containerElement, ripple);
  return ripple;
}

export function useRipple({ onPointerDown, onPointerUp, noRipple, centered, target }: RippleBaseProps) {
  const rippleRef = useRef<ReactUnity.UGUI.UGUIComponent>();

  const pointerDown: Props['onPointerDown'] = useCallback((ev, sender) => {
    onPointerDown?.call(null, ev, sender);

    if (!noRipple) {
      rippleRef.current?.Remove();
      rippleRef.current = addRipple(target ? target.current : sender, centered ? null : ev.pressPosition);
    }
  }, [noRipple, onPointerDown, centered, target]);

  const pointerUp: Props['onPointerUp'] = useCallback((...args) => {
    onPointerUp?.apply(null, args);
    rippleRef.current?.Remove();
    rippleRef.current = null;
  }, [onPointerUp]);

  return { onPointerDown: pointerDown, onPointerUp: pointerUp };
}
