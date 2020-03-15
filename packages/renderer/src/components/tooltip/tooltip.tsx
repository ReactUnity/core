import * as React from 'react';
import { PositionType, View } from '../../../models/components';

export interface TooltipProps {
  tooltipContent?: React.ReactNode;
}

export type TooltipFullProps = TooltipProps & View;

export class Tooltip extends React.Component<TooltipFullProps, { opened: boolean }> {
  static defaultProps: TooltipProps = {
  };

  constructor(props) {
    super(props);
    this.state = {
      opened: false,
    };
  }

  handleHoverIn = () => {
  }

  handleHoverOut = () => {
  }

  toggle = () => this.setState(st => ({ opened: !st.opened }));
  open = () => this.setState({ opened: true });
  close = () => this.setState({ opened: false });

  render() {
    const { tooltipContent, ...otherProps } = this.props;

    return (
      <view {...otherProps} onPointerEnter={this.open} onPointerExit={this.close}>
        {this.props.children}

        {this.state.opened &&
          <view name="<Tooltip>" layout={{
            PositionType: PositionType.Absolute,
            Top: -40,
          }} style={{ zOrder: 1003 }}>
            {tooltipContent}
          </view>
        }
      </view>
    );
  }
}
