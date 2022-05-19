import { RefAttributes } from 'react';
import { ReactUnity } from './generated';
import { AssetReferenceOrHttp } from './properties';

type BaseCmp = ReactUnity.IReactComponent;

export type AnimationCallback<T = BaseCmp> = (ev: ReactUnity.Styling.Animations.AnimationEvent, sender: T) => void;
export type TransitionCallback<T = BaseCmp> = (ev: ReactUnity.Styling.Animations.TransitionEvent, sender: T) => void;

export interface BaseEvents<T = BaseCmp> {
  onAnimationRun?: AnimationCallback<T>;
  onAnimationStart?: AnimationCallback<T>;
  onAnimationIteration?: AnimationCallback<T>;
  onAnimationCancel?: AnimationCallback<T>;
  onAnimationEnd?: AnimationCallback<T>;

  onTransitionRun?: TransitionCallback<T>;
  onTransitionStart?: TransitionCallback<T>;
  onTransitionCancel?: TransitionCallback<T>;
  onTransitionEnd?: TransitionCallback<T>;
}

export type Textable = string | number | boolean | null | undefined;

export interface BaseCmpProps {
  id?: string;
  name?: string;
  class?: string;
  className?: string;
}

export interface ContentSrcProps extends BaseCmpProps {
  content?: string;
  source?: AssetReferenceOrHttp;
}

export interface StyleCmpProps extends ContentSrcProps {
  active?: boolean;
  scope?: string | BaseCmp;
  importance?: number;
}


export type StyleCmpDef = StyleCmpProps & RefAttributes<ReactUnity.Styling.StyleComponent> & { children?: Textable | Textable[] };
export type ScriptCmpDef = ContentSrcProps & RefAttributes<ReactUnity.Scripting.ScriptComponent> & { children?: Textable | Textable[] };
export type HtmlCmpDef = ContentSrcProps & RefAttributes<ReactUnity.Html.HtmlComponent> & { children?: never };

export interface BaseElements<BaseCmpType> {
  [key: string]: BaseCmpType;
  style: BaseCmpType & StyleCmpDef;
  script: BaseCmpType & ScriptCmpDef;
  html: BaseCmpType & HtmlCmpDef;
};
