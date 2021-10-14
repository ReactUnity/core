import { RefAttributes } from 'react';
import { ReactUnity } from './generated';

type BaseCmp = ReactUnity.IReactComponent;

export type AnimationCallback<T = BaseCmp> = (ev: ReactUnity.Styling.Animations.AnimationEvent, sender: T) => void;
export type TransitionCallback<T = BaseCmp> = (ev: ReactUnity.Styling.Animations.TransitionEvent, sender: T) => void;

export interface BaseEvents<T = BaseCmp> {
  onAnimationRun?: AnimationCallback<T>;
  onAnimationStart?: AnimationCallback<T>;
  onAnimationIteration?: AnimationCallback<T>;
  onAnimationCancel?: AnimationCallback<T>;
  onAnimationEnd?: AnimationCallback<T>;

  onTransitionRun?: AnimationCallback<T>;
  onTransitionStart?: AnimationCallback<T>;
  onTransitionCancel?: AnimationCallback<T>;
  onTransitionEnd?: AnimationCallback<T>;
}

export type Textable = string | number | boolean | null | undefined;

export interface BaseCmpProps {
  id?: string;
  name?: string;
  class?: string;
  className?: string;
}

export interface StyleCmpProps extends BaseCmpProps {
  source?: string;
  active?: boolean;
  scope?: string | BaseCmp;
  importance?: number;
}

export interface ScriptCmpProps extends BaseCmpProps {
  source?: string;
}

export type StyleCmpDef = StyleCmpProps & RefAttributes<ReactUnity.StyleComponent> & { children?: Textable | Textable[] };
export type ScriptCmpDef = ScriptCmpProps & RefAttributes<ReactUnity.ScriptComponent> & { children?: Textable | Textable[] };

export interface BaseElements<BaseCmpType> {
  [key: string]: BaseCmpType | StyleCmpDef | ScriptCmpDef;
  style: StyleCmpDef;
  script: ScriptCmpDef;
}
