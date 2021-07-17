import { ReactUnity, UnityEngine } from '../generated';
import { Style } from '../properties';
import { AssetReference } from '../properties/values';
import { ActionCallback, Events } from './events';


export interface View<T = ReactUnity.UGUI.UGUIComponent> extends Events<T> {
  name?: string;
  className?: string;
  style?: Style;
}

export interface Text extends View<ReactUnity.UGUI.TextComponent> { }

export interface Icon extends View<ReactUnity.UGUI.IconComponent> {
  set?: ReactUnity.UGUI.IconSet | string;
}

export interface Scroll extends View<ReactUnity.UGUI.ScrollComponent> { }

export interface Button extends View<ReactUnity.UGUI.ButtonComponent> {
  onClick?: ActionCallback<ReactUnity.UGUI.ButtonComponent>;
}

export interface Toggle extends View<ReactUnity.UGUI.ToggleComponent> {
  value?: boolean;
  onChange?: (val: boolean, sender: ReactUnity.UGUI.ToggleComponent) => void;
}

export interface Anchor extends View<ReactUnity.UGUI.AnchorComponent> {
  url?: string;
  /** Works in WebGL only */
  openInThisTab?: boolean;
}

export interface BaseImage<T = ReactUnity.UGUI.ImageComponent> extends View<T> {
}

export interface Image<T = ReactUnity.UGUI.ImageComponent> extends BaseImage<T> {
  source?: AssetReference;
}

export interface RawImage extends Image<ReactUnity.UGUI.RawImageComponent> { }
export interface Video extends Image<ReactUnity.UGUI.VideoComponent> { }
export interface SvgImage extends Image<ReactUnity.UGUI.SvgComponent> {
  preserveAspect?: boolean;
}

export interface Render<T = ReactUnity.UGUI.RenderComponent> extends BaseImage<T> {
  width: number;
  height: number;
  source?: never;
  camera?: UnityEngine.Camera | UnityEngine.GameObject;
  onMount?: (camera: UnityEngine.Camera, sender: T) => void;
  onUnmount?: (camera: UnityEngine.Camera, sender: T) => void;
}

export interface Object extends Render<ReactUnity.UGUI.ObjectComponent> {
  target: UnityEngine.GameObject;
}

export interface Prefab<T = ReactUnity.UGUI.PrefabComponent> {
  target?: UnityEngine.GameObject | UnityEngine.Component;
  onMount?: (camera: UnityEngine.GameObject, sender: T) => void;
  onUnmount?: (camera: UnityEngine.GameObject, sender: T) => void;
}

export interface Portal<T = ReactUnity.UGUI.PortalComponent> {
  target?: UnityEngine.GameObject | UnityEngine.Component | UnityEngine.Transform | ReactUnity.UGUI.UGUIComponent;
  onMount?: (camera: UnityEngine.Transform, sender: T) => void;
  onUnmount?: (camera: UnityEngine.Transform, sender: T) => void;
}
