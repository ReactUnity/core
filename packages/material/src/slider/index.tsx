import { ReactUnity } from '@reactunity/renderer';
import { AxisEventCallback, PointerEventCallback, View } from '@reactunity/renderer/ugui';
import clsx from 'clsx';
import React, { forwardRef, ReactNode, useCallback, useImperativeHandle, useLayoutEffect, useRef, useState } from 'react';
import { useAutoRef } from '../util/hooks/use-auto-ref';
import { ControlProps, ControlRef, useControlCheck } from '../util/hooks/use-control-check';
import style from './index.module.scss';

export type SliderDirection = 'horizontal' | 'vertical' | 'horizontal-reverse' | 'vertical-reverse';
export type SliderMode = 'normal' | 'diff' | 'falloff';
export type SliderValuePosition = 'auto' | 'top' | 'bottom' | 'left' | 'right' | 'center';
export type SliderChildCallback = (val: number) => ReactNode;

export interface SliderRef extends ControlRef<number> {
  root: ReactUnity.UGUI.ContainerComponent;
}

export interface SliderProps extends View, ControlProps<number> {
  min?: number;
  max?: number;
  step?: number;
  keyStep?: number;
  mode?: SliderMode;
  allowScroll?: boolean;
  scrollMultiplier?: number;
  direction?: SliderDirection;
  valuePosition?: SliderValuePosition;
  children?: ReactNode | SliderChildCallback;
}

const SliderChild = forwardRef(function _SliderChild(
  { callback, defaultValue }: { callback: SliderChildCallback; defaultValue: number },
  ref,
) {
  const [st, setSt] = useState(defaultValue);

  useImperativeHandle(ref, () => setSt);

  return <>{callback(st)}</>;
});

const _Slider = forwardRef<SliderRef, SliderProps>(function _Slider(
  {
    onChange,
    onScroll,
    name,
    children,
    defaultValue,
    value,
    direction = 'horizontal',
    mode = 'normal',
    valuePosition = 'auto',
    min = 0,
    max = 1,
    step = 0,
    keyStep = null,
    allowScroll = false,
    scrollMultiplier = 1 / 6,
    readOnly,
    ...otherProps
  },
  ref,
) {
  const isControlled = useControlCheck({ value, defaultValue, onChange, readOnly });
  const init = defaultValue ?? value ?? min;
  const curValue = useRef(init);
  const innerValue = useRef(init);
  const onChangeRef = useAutoRef(onChange);

  const orientation = direction === 'vertical' || direction === 'vertical-reverse' ? 'vertical' : 'horizontal';
  const isReverse = direction === 'vertical-reverse' || direction === 'horizontal-reverse';
  const sizeProp = orientation === 'horizontal' ? 'width' : 'height';
  const coordProp = orientation === 'horizontal' ? 'x' : 'y';
  const crossCoordProp = orientation === 'horizontal' ? 'y' : 'x';
  const range = max - min;

  const elementRef = useRef<ReactUnity.UGUI.ContainerComponent>(undefined);
  const fillRef = useRef<ReactUnity.UGUI.ContainerComponent>(undefined);
  const childRef = useRef<(val: number) => void>(undefined);

  const moveStep = keyStep || step || range / 10;
  const setValWithStep = useCallback(
    (val: number, skipNotify?: boolean, skipControl?: boolean) => {
      const clampedVal = Math.max(min, Math.min(max, val));
      const steppedVal = step > 0 ? Math.round(clampedVal / step) * step : clampedVal;
      const oldValue = curValue.current;

      if ((!isControlled && !readOnly) || skipControl) {
        innerValue.current = clampedVal;
        curValue.current = steppedVal;

        if (fillRef.current) {
          const ratio = (curValue.current - min) / range;
          fillRef.current.Style.Set(sizeProp === 'width' ? 'height' : 'width', null);
          fillRef.current.Style.Set(sizeProp, `${ratio * 100}%`);
        }

        childRef.current?.(steppedVal);
      }

      if (!skipNotify && !readOnly && oldValue !== steppedVal) onChangeRef.current?.(steppedVal);
    },
    [min, max, step, sizeProp, range, isControlled, readOnly],
  );

  useLayoutEffect(() => {
    if (isControlled) setValWithStep(value, true, true);
  }, [value, isControlled]);

  const dragCallback: PointerEventCallback = useCallback(
    (ev) => {
      const mul = isReverse ? -1 : 1;
      let val = innerValue.current;

      if (mode === 'diff' || mode === 'falloff') {
        const diff = (ev.delta[coordProp] / 200) * range;

        if (mode === 'falloff') {
          const yDiff = Math.max(Math.abs(ev.pressPosition[crossCoordProp] - ev.position[crossCoordProp]) / 100, 1);

          val += (mul * diff) / (yDiff * yDiff);
        } else val += mul * diff;
      } else {
        const relPos = elementRef.current.GetRelativePosition(ev.position.x, ev.position.y);
        let relRatio = relPos[coordProp] / elementRef.current.RectTransform.rect[sizeProp];
        if ((coordProp === 'x' && isReverse) || (coordProp === 'y' && !isReverse)) relRatio = 1 - relRatio;
        val = relRatio * range + min;
      }

      setValWithStep(val);
    },
    [innerValue, setValWithStep, mode, coordProp, crossCoordProp, sizeProp, isReverse, range, min],
  );

  const moveCallback: AxisEventCallback = useCallback(
    (ev) => {
      let diff = ev.moveVector[coordProp] * moveStep;
      if (isReverse) diff = -diff;
      setValWithStep(curValue.current + diff);
    },
    [coordProp, moveStep, isReverse, setValWithStep],
  );

  const scrollCallback: PointerEventCallback = useCallback(
    (ev, sender) => {
      if (allowScroll) {
        const delta = Math.abs(ev.scrollDelta.y) > Math.abs(ev.scrollDelta.x) ? ev.scrollDelta.y : ev.scrollDelta.x;
        let diff = delta * moveStep * scrollMultiplier;
        if (isReverse) diff = -diff;
        setValWithStep(curValue.current + diff);
      }

      onScroll?.(ev, sender);
    },
    [moveStep, isReverse, setValWithStep, onScroll, allowScroll, scrollMultiplier],
  );

  useImperativeHandle(
    ref,
    () => ({
      getValue: () => curValue.current,
      setValue: setValWithStep,
      get root() {
        return elementRef.current;
      },
    }),
    [elementRef, curValue, setValWithStep],
  );

  return (
    <view
      name={name || '<Slider>'}
      {...otherProps}
      ref={elementRef}
      data-direction={direction}
      data-orientation={orientation}
      data-readonly={readOnly ? true : undefined}
      data-cursor={valuePosition}
      onDrag={dragCallback}
      onPointerClick={dragCallback}
      onPotentialDrag={dragCallback}
      onMove={moveCallback}
      onScroll={scrollCallback}
      className={clsx(style.host, otherProps.className, 'mat-slider')}
    >
      <view name="<Slider-Track>" className={clsx(style.track, 'mat-slider-track')}>
        <view
          name="<Slider-Fill>"
          className={clsx(style.fill, 'mat-slider-fill')}
          ref={fillRef}
          style={{ [sizeProp]: `${(100 * (curValue.current - min)) / range}%` }}
        >
          <view name="<Slider-Thumb-Container>" className={clsx(style.thumbContainer, 'mat-slider-thumb-container')}>
            <view name="<Slider-Thumb>" className={clsx(style.thumb, 'mat-slider-thumb')}>
              <view name="<Slider-Value>" className={clsx(style.value, 'mat-slider-value')}>
                {typeof children === 'function' ? (
                  <SliderChild defaultValue={curValue.current} callback={children as any} ref={childRef} />
                ) : (
                  children
                )}
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>
  );
});

export const Slider = React.memo(_Slider);
