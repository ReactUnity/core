import { Events, ActionCallback } from './events';
import { AssetReference } from '../properties/values';
import { Style } from '../properties';

export interface View extends Events {
  name?: string;
  className?: string;
  style?: Style;
  focusable?: boolean;
}

export interface Button extends View {
  onClick?: ActionCallback;
}

export interface Anchor extends View {
  url?: string;
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

export interface Image extends View {
  source?: AssetReference;
  fit?: ImageFitMode;
}

export interface Video extends Image {
}


export type ToggleEvent = (val: boolean) => void;

export interface Toggle extends View {
  onChange?: ToggleEvent;
  value?: boolean;
}
