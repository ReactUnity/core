import { ReactUnity, UnityEngine } from '../generated';
import { Style } from '../properties';
import { AssetReference } from '../properties/values';
import { ActionCallback, Events } from './events';


export interface View<T = ReactUnity.Components.ReactComponent> extends Events<T> {
  name?: string;
  className?: string;
  style?: Style;
}

export interface Text extends Events<ReactUnity.Components.TextComponent> { }
export interface Scroll extends Events<ReactUnity.Components.ScrollComponent> { }

export interface Button extends View<ReactUnity.Components.ButtonComponent> {
  onClick?: ActionCallback<ReactUnity.Components.ButtonComponent>;
}

export interface Toggle extends View<ReactUnity.Components.ToggleComponent> {
  value?: boolean;
  onChange?: (val: boolean, sender: ReactUnity.Components.ToggleComponent) => void;
}

export interface Anchor extends View<ReactUnity.Components.AnchorComponent> {
  url?: string;
  /** Works in WebGL only */
  openInThisTab?: boolean;
}


export enum ImageFitMode {
  Center = 0,
  CenterCrop = 1,
  CenterInside = 2,
  FitCenter = 3,
  FitStart = 4,
  FitEnd = 5,
  Fill = 6,
}

export interface BaseImage<T = ReactUnity.Components.ImageComponent> extends View<T> {
  fit?: ImageFitMode;
}

export interface Image<T = ReactUnity.Components.ImageComponent> extends BaseImage<T> {
  source?: AssetReference;
}

export interface RawImage extends Image<ReactUnity.Components.RawImageComponent> { }
export interface Video extends Image<ReactUnity.Components.VideoComponent> { }
export interface SvgImage extends Image<ReactUnity.Components.SvgComponent> {
  preserveAspect?: boolean;
}

export interface Render extends BaseImage<ReactUnity.Components.RenderComponent> {
  width: number;
  height: number;
  source?: never;
  camera?: UnityEngine.Camera | UnityEngine.GameObject;
  onMount?: (camera: UnityEngine.Camera, sender: ReactUnity.Components.RenderComponent) => void;
  onUnmount?: (camera: UnityEngine.Camera, sender: ReactUnity.Components.RenderComponent) => void;
}
