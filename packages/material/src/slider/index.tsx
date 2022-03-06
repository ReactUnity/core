import { ReactUnity } from '@reactunity/renderer';
import { AxisEventCallback, PointerEventCallback, View } from '@reactunity/renderer/ugui';
import clsx from 'clsx';
import React, { forwardRef, ReactElement, ReactNode, useCallback, useImperativeHandle, useRef, useState } from 'react';
import style from './index.module.scss';

export type SliderDirection = 'horizontal' | 'vertical' | 'horizontal-reverse' | 'vertical-reverse';
export type SliderMode = 'normal' | 'diff' | 'falloff';
export type SliderChildCallback = ((val: number) => ReactNode);

export interface SliderProps extends View {
  onChange?: (value: number) => void;
  min?: number;
  max?: number;
  value?: number;
  step?: number;
  keyStep?: number;
  mode?: SliderMode;
  initialValue?: number;
  allowScroll?: boolean;
  scrollMultiplier?: number;
  direction?: SliderDirection;
  children?: ReactNode | SliderChildCallback;
}

const SliderChild = forwardRef(
  function _SliderChild({ callback, initialValue }: { callback: SliderChildCallback, initialValue: number }, ref) {
    const [st, setSt] = useState(initialValue);

    useImperativeHandle(ref, () => setSt);

    return <>
      {callback(st)}
    </>;
  });

function _Slider({
  onChange, onScroll, name, children, initialValue, value, direction = 'horizontal',
  mode = 'normal', min = 0, max = 1, step = 0, keyStep = null, allowScroll = false,
  scrollMultiplier = 1 / 6, ...otherProps
}: SliderProps): ReactElement {

  const curValue = useRef(initialValue ?? value ?? min);
  const innerValue = useRef(curValue.current);

  const orientation = (direction === 'vertical' || direction === 'vertical-reverse') ? 'vertical' : 'horizontal';
  const isReverse = direction === 'vertical-reverse' || direction === 'horizontal-reverse';
  const sizeProp = orientation === 'horizontal' ? 'width' : 'height';
  const coordProp = orientation === 'horizontal' ? 'x' : 'y';
  const crossCoordProp = orientation === 'horizontal' ? 'y' : 'x';
  const range = max - min;

  const ref = useRef<ReactUnity.UGUI.ContainerComponent>();
  const fillRef = useRef<ReactUnity.UGUI.ContainerComponent>();
  const childRef = useRef<(val: number) => void>();

  const moveStep = keyStep || step || (range / 10);
  const setValWithStep = useCallback((val: number) => {
    val = Math.max(min, Math.min(max, val));
    innerValue.current = val;
    if (step > 0) val = Math.round(val / step) * step;

    const oldValue = curValue.current;
    curValue.current = val;
    if (oldValue !== val) onChange?.(val);

    if (fillRef.current) {
      const ratio = (curValue.current - min) / range;
      fillRef.current.Style.Set(sizeProp === 'width' ? 'height' : 'width', null);
      fillRef.current.Style.Set(sizeProp, (ratio * 100) + '%');
    }

    childRef.current?.(val);
  }, [min, max, step, sizeProp, range]);

  const dragCallback: PointerEventCallback = useCallback(ev => {
    const mul = isReverse ? -1 : 1;
    let val = innerValue.current;

    if (mode === 'diff' || mode === 'falloff') {
      const diff = (ev.delta[coordProp] / 200) * range;

      if (mode === 'falloff') {
        const yDiff = Math.max(Math.abs(ev.pressPosition[crossCoordProp] - ev.position[crossCoordProp]) / 100, 1);

        val += mul * diff / (yDiff * yDiff);
      }
      else val += mul * diff;
    } else {
      const relPos = ref.current.GetRelativePosition(ev.position.x, ev.position.y);
      let relRatio = (relPos[coordProp] / (ref.current.RectTransform.rect[sizeProp]));
      if ((coordProp === 'x' && isReverse) || (coordProp === 'y' && !isReverse))
        relRatio = 1 - relRatio;
      val = relRatio * range + min;
    }

    setValWithStep(val);
  }, [innerValue, setValWithStep, mode, coordProp, crossCoordProp, sizeProp, isReverse, range, min]);

  const moveCallback: AxisEventCallback = useCallback((ev) => {
    let diff = ev.moveVector[coordProp] * moveStep;
    if (isReverse) diff = -diff;
    setValWithStep(curValue.current + diff);
  }, [coordProp, moveStep, isReverse, setValWithStep]);

  const scrollCallback: PointerEventCallback = useCallback((ev, sender) => {
    if (allowScroll) {
      const delta = Math.abs(ev.scrollDelta.y) > Math.abs(ev.scrollDelta.x) ? ev.scrollDelta.y : ev.scrollDelta.x;
      let diff = delta * moveStep * scrollMultiplier;
      if (isReverse) diff = -diff;
      setValWithStep(curValue.current + diff);
    }

    onScroll?.(ev, sender);
  }, [moveStep, isReverse, setValWithStep, onScroll, allowScroll, scrollMultiplier]);

  return <view name={name || '<Slider>'} {...otherProps} ref={ref} data-direction={direction} data-orientation={orientation}
    onDrag={dragCallback} onPointerClick={dragCallback} onPotentialDrag={dragCallback} onMove={moveCallback} onScroll={scrollCallback}
    className={clsx(style.host, otherProps.className, 'mat-slider')}>
    <view name="<Slider-Track>" className={clsx(style.track, 'mat-slider-track')}>
      <view name="<Slider-Fill>" className={clsx(style.fill, 'mat-slider-fill')} ref={fillRef} style={{ [sizeProp]: (curValue.current - min) / range }}>
        <view name="<Slider-Thumb-Container>" className={clsx(style.thumbContainer, 'mat-slider-thumb-container')}>
          <view name="<Slider-Thumb>" className={clsx(style.thumb, 'mat-slider-thumb')}>
            {typeof children === 'function' ?
              <SliderChild initialValue={curValue.current} callback={children as any} ref={childRef} /> :
              children}
          </view>
        </view>
      </view>
    </view>
  </view>;
}

export const Slider = React.memo(_Slider);
