import * as React from 'react';
import { DropdownItem } from './dropdown-item';
import { fullScreen, dropdownBottom, bottomEdge, transparentColor } from '../../helpers/common-layouts';
import { View } from '../../../models/components';

export interface DropdownProps {
  onChange?: (value: any, ind: number) => void;
  autoClose?: boolean;
}

export type DropdownFullProps = DropdownProps & View;

export class Dropdown extends React.Component<DropdownFullProps, { opened: boolean; selectedIndex: number }> {
  static defaultProps: DropdownProps = {
    autoClose: true,
  };

  constructor(props) {
    super(props);
    this.state = {
      opened: false,
      selectedIndex: -1,
    };
  }

  handleChildClick = (ind, value) => {
    if (this.props.onChange) this.props.onChange(value, ind);
    if (this.props.autoClose) this.close();
    this.setState({ selectedIndex: ind })
  }

  toggle = () => this.setState(st => ({ opened: !st.opened }));
  open = () => this.setState({ opened: true });
  close = () => {
    console.log('Dropdown Closed');
    this.setState({ opened: false });
  }

  render() {
    const children = React.Children.toArray(this.props.children) as React.ReactElement[];
    const nonItems = children.filter(x => x?.type !== DropdownItem);
    const items: DropdownItem[] = children.filter(x => x?.type === DropdownItem) as any;
    const selectedItem = items[this.state.selectedIndex];

    const { autoClose, onChange, name, ...otherProps } = this.props;

    return (
      <view name={name || '<Dropdown>'}>
        <button name="<Dropdown Trigger>" onClick={this.toggle} {...otherProps}>
          {this.state.selectedIndex < 0
            ? nonItems
            : (selectedItem.props?.triggerTemplate || selectedItem)
          }

          {this.state.opened && <view layout={bottomEdge} style={{ zOrder: 1000 }}>
            <button name="<Dropdown Backdrop>" onClick={this.close} layout={fullScreen} style={{ backgroundColor: transparentColor }} />

            <view name="<Dropdown Menu>" layout={dropdownBottom}>
              {items.map((x, i) =>
                <button style={{ backgroundColor: ColorNative.white, borderRadius: 0 }} onClick={this.handleChildClick.bind(this, i, x.props.value)}>{x}</button>
              )}
            </view>
          </view>}
        </button>
      </view>
    );
  }
}
