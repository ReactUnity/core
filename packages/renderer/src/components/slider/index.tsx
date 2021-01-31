import { useState, useCallback, useEffect, ReactNode, ReactElement, useRef } from 'react';
import { AxisEventCallback, PointerEventCallback, View } from '../../../models/components';

export type SliderDirection = 'horizontal' | 'vertical' | 'horizontal-reverse' | 'vertical-reverse';
export type SliderMode = 'normal' | 'diff' | 'falloff';

export interface SliderProps extends View {
  onChange?: (value: number) => void;
  min?: number;
  max?: number;
  value?: number;
  step?: number;
  keyStep?: number;
  mode?: SliderMode;
  initialValue?: number;
  direction?: SliderDirection;
  children?: ReactNode | ((val: number) => ReactNode);
}

export function Slider({
  onChange, name, children, initialValue, value, direction = 'horizontal',
  mode = 'normal', min = 0, max = 1, step = 0, keyStep = null, ...otherProps
}: SliderProps): ReactElement {

  const [curValue, setCurValue] = useState(initialValue ?? value ?? min);
  const [innerValue, setInnerValue] = useState(curValue);

  const orientation = (direction === 'vertical' || direction === 'vertical-reverse') ? 'vertical' : 'horizontal';
  const isReverse = direction === 'vertical-reverse' || direction === 'horizontal-reverse';
  const sizeProp = orientation === 'horizontal' ? 'width' : 'height';
  const coordProp = orientation === 'horizontal' ? 'x' : 'y';
  const crossCoordProp = orientation === 'horizontal' ? 'y' : 'x';
  const range = max - min;

  const ref = useRef<any>();

  const moveStep = keyStep || step || (range / 10);
  const setValWithStep = useCallback((val: number) => {
    val = Math.max(min, Math.min(max, val));
    setInnerValue(val);
    if (step > 0) val = Math.round(val / step) * step;
    setCurValue(val);
  }, [min, max, step, setCurValue, setInnerValue]);

  const dragCallback: PointerEventCallback = useCallback(ev => {
    const mul = isReverse ? -1 : 1;
    let val = innerValue;

    if (mode === 'diff' || mode === 'falloff') {
      const diff = (ev.delta[coordProp] / 200) * range;

      if (mode === 'falloff') {
        const yDiff = Math.max(Math.abs(ev.pressPosition[crossCoordProp] - ev.position[crossCoordProp]) / 100, 1);

        val += mul * diff / (yDiff * yDiff);
      }
      else val += mul * diff;
    } else {
      const relPos = ref.current.GetRelativePosition(ev.position.x, ev.position.y);
      let relRatio = (relPos[coordProp] / ref.current.GameObject.transform.rect[sizeProp]);
      if (isReverse) relRatio = -relRatio;
      val = (relRatio + 0.5) * range + min;
    }

    setValWithStep(val);
  }, [innerValue, setValWithStep, mode, coordProp, crossCoordProp, sizeProp, isReverse, range, min]);

  const moveCallback: AxisEventCallback = useCallback((ev) => {
    let diff = ev.moveVector[coordProp] * moveStep;
    if (isReverse) diff = -diff;
    setValWithStep(curValue + diff);
  }, [coordProp, moveStep, isReverse, curValue, setValWithStep]);

  useEffect(() => {
    if (typeof value == 'number') setCurValue(value);
  }, [setCurValue, value]);

  useEffect(() => {
    if (onChange) onChange(curValue);
  }, [onChange, curValue]);

  const ratio = (curValue - min) / range;

  return <view tag="slider" name={name || '<Slider>'} {...otherProps} ref={ref} data-direction={direction} data-orientation={orientation}
    onDrag={dragCallback} onPointerClick={dragCallback} onPotentialDrag={dragCallback} onMove={moveCallback}>
    <view name="_track" />
    <view name="_fill" style={{ [sizeProp]: (ratio * 100) + '%' }}>
      <view name="_thumbContainer">
        <view name="_thumb">
          {typeof children === 'function' ? children(curValue) : children}
        </view>
      </view>
    </view>
  </view>;
}
