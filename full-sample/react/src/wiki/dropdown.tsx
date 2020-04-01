import * as React from 'react';
import { ReactUnity, Dropdown, DropdownItem } from 'react-unity-renderer';

class App extends React.Component<{}, {}> {
  render() {
    return (
      <view
        layout={{ Height: '100%', AlignItems: 'Center', JustifyContent: 'Center' }}>

        <Dropdown onChange={val => console.log(val)}>
          Select an option

          <DropdownItem value={5}>Option 1</DropdownItem>
          <DropdownItem value={10}>Option 2</DropdownItem>
          <DropdownItem value={15}>Option With Long Name</DropdownItem>
        </Dropdown>

      </view>
    );
  }
}
ReactUnity.render(<App />, RootContainer, null);
