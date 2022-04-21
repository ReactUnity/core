import { ReactUnity, Renderer, YogaValue2Aux } from '@reactunity/renderer';
import clsx from 'clsx';
import React, { ReactNode, useCallback, useRef } from 'react';
import { useAutoRef } from '../util/hooks/use-auto-ref';
import style from './index.module.scss';

export type TooltipTrigger = 'hover' | 'press' | 'click';
export type TooltipPosition = 'left' | 'right' | 'top' | 'bottom' | 'center';

const positions: Record<TooltipPosition, { anchor?: YogaValue2Aux, pivot?: YogaValue2Aux }> = {
  left: { anchor: 'left', pivot: 'right' },
  right: { anchor: 'right', pivot: 'left' },
  top: { anchor: 'top', pivot: 'bottom' },
  bottom: { anchor: 'bottom', pivot: 'top' },
  center: { anchor: 'center', pivot: 'center' },
};

export type TooltipProps = {
  content: ReactNode;
  target?: React.RefObject<ReactUnity.UGUI.UGUIComponent>;
  className?: string;
  anchor?: YogaValue2Aux;
  pivot?: YogaValue2Aux;
  offset?: number;
  position?: TooltipPosition;
  interactive?: boolean;
};
export type TooltipPropsCallback = ((el: ReactUnity.UGUI.UGUIComponent) => TooltipProps);

function addTooltip(target: ReactUnity.UGUI.UGUIComponent, props: TooltipProps, withBackdrop: boolean, hide: (() => void)) {
  target = props.target ? props.target.current : target;
  if (!target) return null;

  const anchor = UnityBridge.createElement('view', '', HostContainer) as ReactUnity.UGUI.UGUIComponent;
  anchor.ClassName = clsx(style.anchor, 'mat-tooltip-anchor', props.interactive && style.interactive);
  anchor.Name = '<TooltipAnchor>';

  const tooltip = UnityBridge.createElement('view', '', HostContainer) as ReactUnity.UGUI.UGUIComponent;
  tooltip.ClassName = clsx(style.tooltip, 'mat-tooltip', props.className);
  tooltip.Name = '<Tooltip>';

  const pos = positions[props.position];

  anchor.Style.Set('translate', props.anchor || pos?.anchor || 'bottom');
  anchor.Style.Set('inset', -(props.offset || 5));

  const pivot = Interop.ReactUnity.Converters.AllConverters.YogaValue2Converter.Convert(props.pivot || pos?.pivot || 'top') as ReactUnity.Types.YogaValue2;
  const realPivot = pivot.GetType().ToString() === 'ReactUnity.Types.YogaValue2' ? pivot : Interop.ReactUnity.Types.YogaValue2.Center;
  tooltip.Style.Set('translate', realPivot.Negate());

  UnityBridge.appendChild(target, anchor);

  if (withBackdrop) {
    const backdrop = UnityBridge.createElement('portal', '', HostContainer) as ReactUnity.UGUI.UGUIComponent;
    backdrop.ClassName = clsx(style.backdrop, 'mat-tooltip-backdrop');
    backdrop.Name = '<TooltipBackdrop>';
    UnityBridge.addEventListener(backdrop, 'onPointerClick', hide);
    UnityBridge.appendChild(anchor, backdrop);
  }

  UnityBridge.appendChild(anchor, tooltip);
  Renderer.render(props.content, { disableHelpers: true, hostContainer: tooltip });
  return anchor;
}

export function useTooltip(props: TooltipProps | TooltipPropsCallback, trigger: TooltipTrigger = 'hover') {
  const tooltipRef = useRef<ReactUnity.UGUI.UGUIComponent>();
  const callbacksRef = useRef<(() => void)[]>([]);
  const elementsRef = useRef<ReactUnity.UGUI.UGUIComponent[]>([]);
  const propsRef = useAutoRef(props);
  const clearAll = useCallback(() => {
    const callbacks = callbacksRef.current;
    for (const cb of callbacks) cb?.();
  }, []);


  const hide = useCallback(() => {
    tooltipRef.current?.Remove();
    tooltipRef.current = null;
  }, []);

  const show = useCallback((target: ReactUnity.UGUI.UGUIComponent, properties?: TooltipProps, withBackdrop: boolean = false) => {
    tooltipRef.current?.Remove();
    return tooltipRef.current = addTooltip(target, properties, withBackdrop, hide);
  }, [hide]);

  const showWithCurrent = useCallback((ev: any, sender: ReactUnity.UGUI.UGUIComponent) => {
    const calculatedProps = typeof propsRef.current === 'function' ? propsRef.current(sender) : propsRef.current;
    show(sender, calculatedProps, trigger === 'click');
  }, [show, trigger, propsRef]);

  const register = useCallback((el: ReactUnity.UGUI.UGUIComponent) => {
    if (!el) return;
    elementsRef.current.push(el);

    const callbacks = callbacksRef.current;

    if (trigger === 'click') {
      callbacks.push(UnityBridge.addEventListener(el, 'onPointerClick', showWithCurrent));
    }
    else if (trigger === 'press') {
      callbacks.push(UnityBridge.addEventListener(el, 'onPointerDown', showWithCurrent));
      callbacks.push(UnityBridge.addEventListener(el, 'onPointerUp', hide));
    }
    else { // hover
      callbacks.push(UnityBridge.addEventListener(el, 'onPointerEnter', showWithCurrent));
      callbacks.push(UnityBridge.addEventListener(el, 'onPointerExit', hide));
    }
  }, [trigger, showWithCurrent, hide]);

  return { register, show, hide, clearAll } as const;
}

export function useDataTooltip(trigger: TooltipTrigger = 'hover') {
  const props: TooltipPropsCallback = (el) => propsProxy(el.Data);

  return useTooltip(props, trigger);
}

function propsProxy(data: ReactUnity.Helpers.WatchableObjectRecord) {
  return new Proxy(data, {
    get(tg, prop) {
      if (typeof prop === 'symbol') return data[prop as any];
      return data['tooltip-' + prop];
    },
  }) as unknown as TooltipProps;
}
