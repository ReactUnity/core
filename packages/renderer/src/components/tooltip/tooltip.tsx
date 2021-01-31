import * as React from 'react';
import { Position, View, YogaValueAux } from '../../../models/components';

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
    top: 'top',
    bottom: 'bottom',
    left: 'left',
    right: 'right',
  };

  static childPositionProp = {
    top: 'bottom',
    bottom: 'top',
    left: 'right',
    right: 'left',
  };

  static yogaZeroPercent = 0;

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
          <view style={{ position: Position.Absolute, [containerProp]: Tooltip.yogaZeroPercent }}>
            <view name="<Tooltip>" style={{ position: Position.Absolute, zIndex: 1003, [childProp]: offset }}>
              {tooltipContent}
            </view>
          </view>
        }
      </view>
    );
  }
}
