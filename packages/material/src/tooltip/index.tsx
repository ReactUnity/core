import { ReactUnity, Renderer, YogaValue2Aux } from '@reactunity/renderer';
import clsx from 'clsx';
import React, { ReactNode, useCallback, useRef } from 'react';
import useAutoRef from '../util/hooks/use-auto-ref';
import style from './index.module.scss';

export type TooltipTrigger = 'hover' | 'press' | 'click';
export type TooltipPosition = 'left' | 'right' | 'top' | 'bottom';

const positions: Record<TooltipPosition, { anchor?: YogaValue2Aux, pivot?: YogaValue2Aux }> = {
  left: { anchor: 'left', pivot: 'right' },
  right: { anchor: 'right', pivot: 'left' },
  top: { anchor: 'top', pivot: 'bottom' },
  bottom: { anchor: 'bottom', pivot: 'top' },
};

export type TooltipProps = {
  content: ReactNode;
  target?: React.RefObject<ReactUnity.UGUI.UGUIComponent>;
  trigger?: TooltipTrigger;
  className?: string;
  anchor?: YogaValue2Aux;
  pivot?: YogaValue2Aux;
  offset?: number;
  position?: TooltipPosition;
  interactive?: boolean;
};

export function addTooltip(target: ReactUnity.UGUI.UGUIComponent, props: TooltipProps, hide: (() => void)) {
  target = props.target ? props.target.current : target;
  if (!target) return null;

  const tooltipAnchor = UnityBridge.createElement('view', '', HostContainer) as ReactUnity.UGUI.UGUIComponent;
  tooltipAnchor.ClassName = clsx(style.anchor, 'mat-tooltip-anchor', props.interactive && style.interactive);
  tooltipAnchor.Name = '<TooltipAnchor>';

  const tooltip = UnityBridge.createElement('view', '', HostContainer) as ReactUnity.UGUI.UGUIComponent;
  tooltip.ClassName = clsx(style.tooltip, 'mat-tooltip', props.className);
  tooltip.Name = '<Tooltip>';

  const pos = positions[props.position];

  tooltipAnchor.Style.Set('translate', props.anchor || pos?.anchor || 'bottom');
  tooltipAnchor.Style.Set('inset', -(props.offset || 5));

  const pivot = Interop.ReactUnity.Converters.AllConverters.YogaValue2Converter.Convert(props.pivot || pos?.pivot || 'top') as ReactUnity.Types.YogaValue2;
  const realPivot = pivot.GetType().ToString() === 'ReactUnity.Types.YogaValue2' ? pivot : Interop.ReactUnity.Types.YogaValue2.Center;
  tooltip.Style.Set('translate', realPivot.Negate());

  UnityBridge.appendChild(target, tooltipAnchor);

  if (props.trigger === 'click') {
    const backdrop = UnityBridge.createElement('portal', '', HostContainer) as ReactUnity.UGUI.UGUIComponent;
    backdrop.ClassName = clsx(style.backdrop, 'mat-tooltip-backdrop');
    backdrop.Name = '<TooltipBackdrop>';
    UnityBridge.addEventListener(backdrop, 'onPointerClick', hide);
    UnityBridge.appendChild(tooltipAnchor, backdrop);
  }

  UnityBridge.appendChild(tooltipAnchor, tooltip);
  Renderer.render(props.content, tooltip, true);
  return tooltipAnchor;
}

export function useTooltip(props: TooltipProps) {
  const trigger = props.trigger;
  const tooltipRef = useRef<ReactUnity.UGUI.UGUIComponent>();
  const clearRef = useRef<() => void>();
  const senderRef = useRef<ReactUnity.UGUI.UGUIComponent>();
  const propsRef = useAutoRef(props);


  const hide = useCallback(() => {
    tooltipRef.current?.Remove();
    tooltipRef.current = null;
  }, []);

  const show = useCallback(() => {
    tooltipRef.current?.Remove();
    tooltipRef.current = addTooltip(senderRef.current, propsRef.current, hide);
  }, [propsRef, hide]);

  const ref = useCallback((sender: ReactUnity.UGUI.UGUIComponent) => {
    senderRef.current = sender;
    clearRef.current?.();
    clearRef.current = null;

    if (!sender) return;

    const callbacks: (() => void)[] = [];
    clearRef.current = () => {
      for (const cb of callbacks) cb?.();
    };

    if (trigger === 'click') {
      callbacks.push(UnityBridge.addEventListener(sender, 'onPointerClick', show));
    }
    else if (trigger === 'press') {
      callbacks.push(UnityBridge.addEventListener(sender, 'onPointerDown', show));
      callbacks.push(UnityBridge.addEventListener(sender, 'onPointerUp', hide));
    }
    else { // hover
      callbacks.push(UnityBridge.addEventListener(sender, 'onPointerEnter', show));
      callbacks.push(UnityBridge.addEventListener(sender, 'onPointerExit', hide));
    }
  }, [trigger, show, hide]);

  return { ref, show, hide } as const;
}
