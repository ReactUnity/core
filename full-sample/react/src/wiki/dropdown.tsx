import * as React from 'react';
import { Dropdown, DropdownItem } from 'react-unity-renderer';

export function App() {
  const triggerTemplate = <view style={{ fontColor: 'green' }}>Option 1</view>;

  return <view layout={{ Height: '100%', AlignItems: 'Center', JustifyContent: 'Center' }}>

    <Dropdown onChange={val => console.log(val)} layout={{ Width: 250 }}>
      Select an option

      <DropdownItem value={5} triggerTemplate={triggerTemplate}>Option 1</DropdownItem>
      <DropdownItem value={10}>Option 2</DropdownItem>
      <DropdownItem value={15}>Option With Long Name</DropdownItem>
    </Dropdown>
  </view>;
}
