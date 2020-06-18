import * as React from 'react';
import { ReactUnity, Dropdown, DropdownItem } from 'react-unity-renderer';

export class App extends React.Component<{}, {}> {
  render() {
    return (
      <view layout={{ Height: '100%', AlignItems: 'Center', JustifyContent: 'Center' }}>

        <Dropdown autoClose={false} onChange={val => console.log(val)} layout={{ Width: 250 }}>
          Select an option

          <DropdownItem value={5}
            triggerTemplate={<view style={{ fontColor: 'green' }}>Option 1</view>}>
            Option 1
          </DropdownItem>
          <DropdownItem value={10}>Option 2</DropdownItem>
          <DropdownItem value={15}>Option With Long Name</DropdownItem>
        </Dropdown>

      </view>
    );
  }
}

export default () => ReactUnity.render(<App />, RootContainer, null);
