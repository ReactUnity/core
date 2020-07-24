import { Style } from './styles';
import { Layout } from './yoga';
import { Events, ActionCallback } from './events';
import { AssetReference } from '../values/asset-reference';
import { UnityObject } from '../native/context';
import { Color } from '../values/color';

export interface StateStyles {
  hover?: Style;
  // focus?: Style;
  // active?: Style;
  // [key: string]: Style;
}

export interface StyleAndLayout {
  layout?: Layout;
  style?: Style;
  stateStyles?: StateStyles;
}

export interface View extends Events, StyleAndLayout {
  name?: string;
  className?: string;
}

export interface Button extends View {
  onClick?: ActionCallback;
}

export interface Anchor extends View {
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

export interface Image extends View {
  source?: AssetReference | UnityObject;
  fit?: ImageFitMode;
  tint?: Color;
}


export type ToggleEvent = (val: boolean) => void;

export interface Toggle extends View {
  onChange?: ToggleEvent;

  value?: boolean;
}
