import * as React from 'react';
import { startAnimation, easing, Position, FlexDirection, YogaJustify, YogaAlign, TextOverflowModes } from '@reactunity/renderer';
import style from './index.module.scss';

export class App extends React.Component<{}, { val: number }> {
  clearAnimation: () => void;

  constructor(props) {
    super(props);
    this.state = { val: 0 };

    this.clearAnimation = startAnimation({
      duration: 1000,
      onTick: val => this.setState({ val }),
      easing: easing.easeInOutQuint,
      delay: 500,
      loop: true,
      loopMode: 'ping-pong',
    });
  }

  componentWillUnmount() {
    this.clearAnimation?.();
  }

  render() {
    const val = this.state.val;

    return <view style={{ flexDirection: FlexDirection.Row, height: '100%', alignItems: YogaAlign.Stretch, justifyContent: YogaJustify.SpaceAround }}>
      <view className={style.box1} style={{ borderRadius: val * 100 }}>
        <button style={{ width: Math.round((val * 150 + 130) / 2) * 2 }}>
          Width
        </button>

        <button style={{ backgroundColor: ['blue', val, 'yellow'] }}>
          Color
        </button>


        <button style={{ rotate: 180 * val }}>
          Rotate
        </button>

        <button style={{ boxShadow: `1 1 ${4 + 6 * val} ${14 * val} ${8 * val} black`, scale: 1.2 + val * 0.1, backgroundColor: 0.97 }}>
          Shadow
        </button>
      </view>

      <view className={style.box2} style={{ borderWidth: val * 10 + 2, borderColor: ['red', val, 'green'] }}>
        <button style={{ position: Position.Absolute, top: 50 + val * 150 }}>
          Position
        </button>

        <button style={{ fontSize: Math.round(val * 24 + 12), textOverflow: TextOverflowModes.Truncate, paddingHorizontal: 30 }}>
          Font size
        </button>

        <button style={{ scale: val * 2 }}>
          Scale
        </button>

        <button style={{ translate: [Math.random() * 10, Math.random() * 10].join() }}>
          Noise
        </button>
      </view>
    </view >;
  }
}
