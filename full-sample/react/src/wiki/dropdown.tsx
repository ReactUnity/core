import * as React from 'react';
import { Dropdown, DropdownItem } from 'react-unity-renderer';
import style from './index.module.scss';

export function App() {
  const triggerTemplate = <view style={{ fontColor: 'green' }}>Option 1</view>;

  return <view className={style.app}>
    <Dropdown onChange={val => console.log(val)} layout={{ Width: 250 }}>
      Select an option

      <DropdownItem value={5} triggerTemplate={triggerTemplate}>Option 1</DropdownItem>
      <DropdownItem value={10}>Option 2</DropdownItem>
      <DropdownItem value={15}>Option With Long Name</DropdownItem>
    </Dropdown>
  </view>;
}
