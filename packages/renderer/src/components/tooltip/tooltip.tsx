import * as React from 'react';
import { PositionType, View, YogaValueAux } from '../../../models/components';

export type TooltipPosition = 'left' | 'right' | 'top' | 'bottom';

export interface TooltipProps {
  tooltipContent?: React.ReactNode;
  position?: TooltipPosition;
  offset?: YogaValueAux;
}

export type TooltipFullProps = TooltipProps & View;

export class Tooltip extends React.Component<TooltipFullProps, { opened: boolean }> {
  static defaultProps: TooltipProps = {
    position: 'bottom',
    offset: 10,
  };

  static containerPositionProp = {
    top: 'Top',
    bottom: 'Bottom',
    left: 'Left',
    right: 'Right',
  };

  static childPositionProp = {
    top: 'Bottom',
    bottom: 'Top',
    left: 'Right',
    right: 'Left',
  };

  static yogaZeroPercent = YogaValue.Point(0);

  constructor(props) {
    super(props);
    this.state = {
      opened: false,
    };
  }

  toggle = () => this.setState(st => ({ opened: !st.opened }));
  open = () => this.setState({ opened: true });
  close = () => this.setState({ opened: false });

  render() {
    const { tooltipContent, position, offset, ...otherProps } = this.props;

    const containerProp = Tooltip.containerPositionProp[position];
    const childProp = Tooltip.childPositionProp[position];

    return (
      <view {...otherProps} onPointerEnter={this.open} onPointerExit={this.close}>
        {this.props.children}

        {this.state.opened && tooltipContent &&
          <view layout={{ PositionType: PositionType.Absolute, [containerProp]: Tooltip.yogaZeroPercent }}>
            <view name="<Tooltip>" layout={{ PositionType: PositionType.Absolute, [childProp]: offset }}
              style={{ zOrder: 1003 }}>
              {tooltipContent}
            </view>
          </view>
        }
      </view>
    );
  }
}
