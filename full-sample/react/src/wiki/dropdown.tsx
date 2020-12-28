import * as React from 'react';
import style from './index.module.scss';
import { Dropdown, DropdownItem } from '@reactunity/renderer';

export function App() {
  const triggerTemplate = <view style={{ fontColor: 'green' }}>Option 1</view>;

  return <view className={style.app}>
    <Dropdown onChange={val => console.log(val)} style={{ width: 250 }}>
      Select an option

      <DropdownItem value={5} triggerTemplate={triggerTemplate}>Option 1</DropdownItem>
      <DropdownItem value={10}>Option 2</DropdownItem>
      <DropdownItem value={15}>Option With Long Name</DropdownItem>
    </Dropdown>
  </view>;
}
