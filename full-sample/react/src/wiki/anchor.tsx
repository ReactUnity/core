import * as React from 'react';
import { ReactUnity, FlexDirection, CursorType } from 'react-unity-renderer';

export class App extends React.Component<{}, {}> {
  render() {
    return (
      <view
        layout={{ Height: '100%', AlignItems: 'Center', JustifyContent: 'Center', FlexDirection: FlexDirection.Column }}>

        <anchor url="https://www.google.com.tr/" openInThisTab>Open Google in this tab</anchor>

        <anchor url="https://www.google.com.tr/">Open Google in new tab</anchor>

        <anchor url="https://www.google.com.tr/" style={{ cursor: CursorType.NotAllowed }} onPointerDown={(e) => e.Use()}>Cancel event</anchor>
      </view>
    );
  }
}

export default () => ReactUnity.render(<App />, RootContainer, null);
