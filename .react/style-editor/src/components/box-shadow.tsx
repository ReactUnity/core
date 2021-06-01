import { ReactUnity as RU, UnityEngine as UE } from '@reactunity/renderer/editor';
import clsx from 'clsx';
import { useRef } from 'react';
import type { StylePropComponentProps } from '../props';

export function BoxShadowField({ className, label, onChange, value }: StylePropComponentProps<RU.Types.BoxShadowList>) {
  const blurRef = useRef<RU.Editor.Components.BaseFieldComponent<any, UE.Vector2>>();
  const offsetRef = useRef<RU.Editor.Components.BaseFieldComponent<any, UE.Vector2>>();
  const spreadRef = useRef<RU.Editor.Components.BaseFieldComponent<any, UE.Vector2>>();
  const colorRef = useRef<RU.Editor.Components.BaseFieldComponent<any, UE.Color>>();
  const insetRef = useRef<RU.Editor.Components.BaseFieldComponent<any, boolean>>();

  const changed = () => {
    const blur = blurRef.current.Element.value;
    const spread = spreadRef.current.Element.value;
    const color = colorRef.current.Element.value;
    const offset = offsetRef.current.Element.value;
    const inset = insetRef.current.Element.value;
    const val = new ReactUnity.Types.BoxShadowList(new ReactUnity.Types.BoxShadow(offset, blur, spread, color, inset));
    onChange?.({ newValue: val });
  };

  const item = value?.Items?.[0];

  return <view className={clsx(className)}>
    <text className={clsx('unity-base-field__label', 'unity-composite-field__label')}>{label}</text>

    <color label="Color" value={item?.color} onChange={changed} ref={colorRef} />
    <vector2 label="Blur" value={item?.blur} onChange={changed} ref={blurRef} />
    <vector2 label="Offset" value={item?.offset} onChange={changed} ref={offsetRef} />
    <vector2 label="Spread" value={item?.spread} onChange={changed} ref={spreadRef} />
    <toggle label="Inset" value={item?.inset} onChange={changed} ref={insetRef} />
  </view>;
}
