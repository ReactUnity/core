import { ReactUnity } from './generated';

type BaseCmp = ReactUnity.IReactComponent;

export type AnimationCallback<T = BaseCmp> = (ev: ReactUnity.Animations.AnimationEvent, sender: T) => void;
export type TransitionCallback<T = BaseCmp> = (ev: ReactUnity.Animations.TransitionEvent, sender: T) => void;

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
