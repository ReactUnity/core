export type AnimationOptionsBase = {
  delay?: number;
  interval?: number;
  duration: number;
  easing?: (t: number) => number;

  onTick: (value: number) => void;
  onStart?: () => void;
  onEnd?: () => void;

  loop?: number | boolean;
  loopMode?: 'normal' | 'ping-pong';

  from?: never;
  to?: never;
};

export type AnimationOptionsExtend = Omit<AnimationOptionsBase, 'from' | 'to'> & {
  from: number;
  to: number;
};

export function startAnimation(options: AnimationOptionsBase | AnimationOptionsExtend) {
  let onStart = options.onStart;
  const loop = options.loop;
  const loopMode = options.loopMode;
  let loopCount = 0;
  let normal = true;

  const start = () => {
    if (onStart) {
      options.onStart();
      onStart = null;
    }
    const startTime = Date.now();
    let t = 0;
    loopCount++;

    const from = options.from || 0;
    let to = options.to;
    if (to == null) to = 1;

    const easing = options.easing;

    const interval = setInterval(() => {
      const timeDiff = Date.now() - startTime;

      t = Math.min(timeDiff / options.duration, 1);
      let e = easing ? easing(t) : t;
      if (!normal) e = 1 - e;
      options.onTick(e * (to - from));

      if (t >= 1) {
        clearTimeout(interval);

        if (loop == true || loopCount < loop) {
          if (loopMode === 'ping-pong') normal = !normal;
          start();
        } else {
          options.onEnd && options.onEnd();
        }
      }
    }, options.interval || 0);
  };

  if (options.delay != null) setTimeout(start, options.delay);
  else start();
}
