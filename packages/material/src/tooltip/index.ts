import { PositioningLiteral, ReactUnity, YogaValue2Aux, render } from '@reactunity/renderer';
import clsx from 'clsx';
import React, { ReactNode, useCallback, useLayoutEffect, useRef } from 'react';
import { useAutoRef } from '../util/hooks/use-auto-ref';
import style from './index.module.scss';

export type TooltipTrigger = 'hover' | 'press' | 'click' | 'focus' | 'active' | 'auto';
export type TooltipPosition = 'left' | 'right' | 'top' | 'bottom' | 'center';
type Position = PositioningLiteral | [number | string, number | string] | string;
type NormalizedPosition = readonly [string, string];

const positions: Record<TooltipPosition, { anchor?: YogaValue2Aux; pivot?: Position }> = {
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
  pivot?: Position;
  offset?: number;
  position?: TooltipPosition;
  interactive?: boolean;
  /*
   * Show tooltip after <delay> milliseconds
   */
  delay?: number;
};
export type TooltipPropsCallback = (el: ReactUnity.UGUI.UGUIComponent) => TooltipProps;

function parseFromPositioningLiteral(str: string) {
  let x: number;
  let y: number;
  var values = str.split(' ');

  if (values.length > 2) return;

  var hasDouble = values.length === 2;

  if (values.includes('top')) {
    x = 0.5;
    y = 0;
    if (hasDouble) {
      if (values.includes('left')) x = 0;
      else if (values.includes('right')) x = 1;
      else if (values.includes('center')) x = 0.5;
      else return;
    }
  } else if (values.includes('bottom')) {
    x = 0.5;
    y = 1;
    if (hasDouble) {
      if (values.includes('left')) x = 0;
      else if (values.includes('right')) x = 1;
      else if (values.includes('center')) x = 0.5;
      else return;
    }
  } else if (values.includes('left')) {
    if (hasDouble && !values.includes('center')) return;
    x = 0;
    y = 0.5;
  } else if (values.includes('right')) {
    if (hasDouble && !values.includes('center')) return;
    x = 1;
    y = 0.5;
  } else if (values.includes('center')) {
    if (hasDouble && values[0] !== values[1]) return;
    x = 0.5;
    y = 0.5;
  } else {
    return;
  }

  return [x * 100 + '%', y * 100 + '%'] as const;
}

function convert2DValue(val: Position): NormalizedPosition | undefined {
  if (!val) return;
  if (typeof val === 'string') {
    val = val.trim();
    if (!val) return;

    var sp = parseFromPositioningLiteral(val);
    if (sp) return sp;

    var values = val.split(' ');

    if (values.length === 2) {
      return values as unknown as NormalizedPosition;
    }

    return;
  }

  if (Array.isArray(val)) {
    if (!val.length) return;

    var v0 = val[0];
    var v1 = val[1];

    var v0f = typeof v0 === 'number' ? v0 + 'px' : v0;
    var v1f = typeof v1 === 'number' ? v1 + 'px' : v1;

    return [v0f, v1f] as const;
  }

  return;
}

function convertToTransform(val: Position, negate = false): string {
  const converted = convert2DValue(val);
  if (!converted) return '';

  const cx = negate ? (converted[0].startsWith('-') ? converted[0].substring(1) : '-' + converted[0]) : converted[0];
  const cy = negate ? (converted[1].startsWith('-') ? converted[1].substring(1) : '-' + converted[1]) : converted[1];

  return `${cx} ${cy}`;
}

function addTooltip(target: ReactUnity.UGUI.UGUIComponent, props: TooltipProps, withBackdrop: boolean, hide: () => void) {
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

  const pivotOriginal = props.pivot || pos?.pivot || 'top';
  tooltip.Style.Set('translate', convertToTransform(pivotOriginal, true));

  if (withBackdrop) {
    const backdrop = UnityBridge.createElement('portal', '', HostContainer) as ReactUnity.UGUI.UGUIComponent;
    backdrop.ClassName = clsx(style.backdrop, 'mat-tooltip-backdrop');
    backdrop.Name = '<TooltipBackdrop>';
    UnityBridge.addEventListener(backdrop, 'onPointerClick', hide);
    UnityBridge.appendChild(anchor, backdrop);
  }

  UnityBridge.appendChild(anchor, tooltip);
  render(props.content, { disableHelpers: true, hostContainer: tooltip });

  UnityBridge.appendChild(target, anchor);

  return anchor;
}

export function useTooltip(props: TooltipProps | TooltipPropsCallback, trigger: TooltipTrigger = 'auto') {
  const tooltipRef = useRef<ReactUnity.UGUI.UGUIComponent>(undefined);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  const callbacksRef = useRef<(() => void)[]>([]);
  const elementsRef = useRef<ReactUnity.UGUI.UGUIComponent[]>([]);
  const propsRef = useAutoRef(props);
  const clearAll = useCallback(() => {
    const callbacks = callbacksRef.current;
    for (const cb of callbacks) cb?.();
    callbacks.length = 0;
  }, []);

  const hide = useCallback(() => {
    if (timeoutRef.current >= 0) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    tooltipRef.current?.Remove();
    tooltipRef.current = null;
  }, []);

  const show = useCallback(
    (target: ReactUnity.UGUI.UGUIComponent, properties?: TooltipProps, withBackdrop = false) => {
      hide();
      return (tooltipRef.current = addTooltip(target, properties, withBackdrop, hide));
    },
    [hide],
  );

  const showWithCurrent = useCallback(
    (ev: any, sender: ReactUnity.UGUI.UGUIComponent) => {
      const calculatedProps = typeof propsRef.current === 'function' ? propsRef.current(sender) : propsRef.current;
      const withBackdrop = trigger === 'click';
      const delay = calculatedProps.delay;

      if (delay > 0) {
        timeoutRef.current = setTimeout(() => {
          setImmediate(() => {
            show(sender, calculatedProps, withBackdrop);
          });
        }, delay);
      } else {
        show(sender, calculatedProps, withBackdrop);
      }
    },
    [show, trigger, propsRef],
  );

  useLayoutEffect(() => {
    return clearAll;
  }, [trigger, clearAll]);

  const register = useCallback(
    (el: ReactUnity.UGUI.UGUIComponent) => {
      if (!el) return;
      elementsRef.current.push(el);

      const callbacks = callbacksRef.current;

      if (trigger === 'click') {
        callbacks.push(UnityBridge.addEventListener(el, 'onPointerClick', showWithCurrent));
      } else if (trigger === 'press' || trigger === 'active') {
        // TODO: improve active to handle key presses
        callbacks.push(UnityBridge.addEventListener(el, 'onPointerDown', showWithCurrent));
        callbacks.push(UnityBridge.addEventListener(el, 'onPointerUp', hide));
      } else if (trigger === 'focus') {
        callbacks.push(UnityBridge.addEventListener(el, 'onSelect', showWithCurrent));
        callbacks.push(UnityBridge.addEventListener(el, 'onDeselect', hide));
      } else if (trigger === 'hover') {
        callbacks.push(UnityBridge.addEventListener(el, 'onPointerEnter', showWithCurrent));
        callbacks.push(UnityBridge.addEventListener(el, 'onPointerExit', hide));
      } else {
        // auto
        // TODO: improve auto to handle mobile/gamepad differently (active and focus)
        callbacks.push(UnityBridge.addEventListener(el, 'onPointerEnter', showWithCurrent));
        callbacks.push(UnityBridge.addEventListener(el, 'onPointerExit', hide));
      }
    },
    [trigger, showWithCurrent, hide],
  );

  return { register, show, hide, clearAll } as const;
}

export function useDataTooltip(trigger: TooltipTrigger = 'hover') {
  const props: TooltipPropsCallback = (el) => propsProxy(el.Data);

  return useTooltip(props, trigger);
}

function propsProxy(data: ReactUnity.Reactive.ReactiveObjectRecord) {
  return new Proxy(data, {
    get(tg, prop) {
      if (typeof prop === 'symbol') return data[prop as any];
      return data.GetValueOrDefault('tooltip-' + prop);
    },
  }) as unknown as TooltipProps;
}
