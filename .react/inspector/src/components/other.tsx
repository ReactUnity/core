import { UnityEngine as UE } from '@reactunity/renderer/editor';
import type { StylePropComponentProps } from '../props';

export function sliderComponent(min = 0, max = 1) {
  return (props: StylePropComponentProps<number>) => <slider {...props} min={min} max={max} showInput />;
}

export function sliderintComponent(min = 0, max = 1000) {
  return (props: StylePropComponentProps<number>) => <sliderint {...props} min={min} max={max} showInput />;
}

export function enumComponent(typeName: string) {
  return (props: StylePropComponentProps<number>) => <enum {...props} type={typeName} />;
}

export function flagsComponent(typeName: string) {
  return (props: StylePropComponentProps<number>) => <flags {...props} type={typeName} />;
}

export function objectComponent(typeName: string) {
  return (props: StylePropComponentProps<UE.Object>) => <object {...props} type={typeName} />;
}
