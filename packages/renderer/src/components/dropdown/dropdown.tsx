import * as React from 'react';
import { DropdownItem } from './dropdown-item';
import { fullScreen, dropdownBottom, bottomEdge, transparentColor } from '../../helpers/common-layouts';
import { View, CursorType, Style } from '../../../models/components';

const dropdownMenuStyle: Style = { boxShadow: '0 3 7 6 black 5' };
const dropdownButtonStyle: Style = { backgroundColor: 'white', borderRadius: 0 };
const dropdownBackdropStyle: Style = { backgroundColor: transparentColor, cursor: CursorType.Default };

export interface DropdownProps<T = any> {
  onChange?: (value: T, ind: number) => void;
  autoClose?: boolean;
  children?: React.ReactNode;
}

export type DropdownFullProps<T = any> = DropdownProps<T> & View;

export function Dropdown<T = any>({ autoClose = true, onChange, name, style, children, ...otherProps }: DropdownFullProps<T>): React.ReactElement {
  const childrenArray = React.Children.toArray(children) as React.ReactElement[];
  const nonItems = childrenArray.filter(x => x?.type !== DropdownItem);
  const items: DropdownItem[] = childrenArray.filter(x => x?.type === DropdownItem) as any;

  const [opened, setOpened] = React.useState(false);
  const [selectedIndex, setSelectedIndex] = React.useState(-1);

  const selectedItem = items[selectedIndex];

  const toggle = () => setOpened(st => !st);
  const close = () => setOpened(false);

  const handleChildClick = (ind: number, value: any) => {
    onChange?.(value, ind);
    if (autoClose) close();
    setSelectedIndex(ind);
  }

  return <view name={name || '<Dropdown>'}>
    <button name="<Dropdown Trigger>" onClick={toggle} style={{ flexDirection: 'Column', alignItems: 'Stretch', ...style }} {...otherProps}>
      {selectedIndex < 0
        ? nonItems
        : (selectedItem.props?.triggerTemplate || selectedItem)
      }

      {opened && <view style={{ zIndex: 1000, ...bottomEdge }}>
        <button name="<Dropdown Backdrop>" onClick={close} style={{ ...dropdownBackdropStyle, ...fullScreen }} />

        <view name="<Dropdown Menu>" style={{ ...dropdownMenuStyle, ...dropdownBottom }}>
          {items.map((x, i) =>
            <button key={i} style={dropdownButtonStyle} onClick={() => handleChildClick(i, x.props.value)}>{x}</button>
          )}
        </view>
      </view>}
    </button>
  </view>;
}
