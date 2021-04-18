import { ReactUnity as RU, UnityEngine as UE } from '@reactunity/renderer/editor';
import clsx from 'clsx';
import { useRef } from 'react';
import type { StylePropComponentProps } from '../props';

export function BoxShadowField({ className, label, onChange, value }: StylePropComponentProps<RU.Styling.Types.ShadowDefinition>) {
  const blurRef = useRef<RU.Editor.Components.BaseFieldComponent<any, number>>();
  const offsetRef = useRef<RU.Editor.Components.BaseFieldComponent<any, UE.Vector2>>();
  const spreadRef = useRef<RU.Editor.Components.BaseFieldComponent<any, UE.Vector2>>();
  const colorRef = useRef<RU.Editor.Components.BaseFieldComponent<any, UE.Color>>();

  const changed = () => {
    const blur = blurRef.current.Element.value;
    const spread = spreadRef.current.Element.value;
    const color = colorRef.current.Element.value;
    const offset = offsetRef.current.Element.value;
    const val = new ReactUnity.Styling.Types.ShadowDefinition(offset, spread, color, blur, false);
    onChange?.({ newValue: val });
  };

  return <view className={clsx(className)}>
    <text className={clsx('unity-base-field__label', 'unity-composite-field__label')}>{label}</text>

    <color label="Color" value={value?.color} onChange={changed} ref={colorRef} />
    <float label="Blur" value={value?.blur} onChange={changed} ref={blurRef} />
    <vector2 label="Offset" value={value?.offset} onChange={changed} ref={offsetRef} />
    <vector2 label="Spread" value={value?.spread} onChange={changed} ref={spreadRef} />
  </view>;
}
