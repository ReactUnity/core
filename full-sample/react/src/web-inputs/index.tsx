import * as React from 'react';
import { ContentType } from 'react-unity-renderer';

export class App extends React.Component<{}, {}> {

  constructor(props) {
    super(props);
    this.state = {};
  }


  render() {
    return <view layout={{ Height: '100%', AlignItems: 'Center', JustifyContent: 'Center' }}>
      <input webSupport placeholder="Email" name="email" layout={{ MarginBottom: 20, MinWidth: 300 }} />
      <input webSupport placeholder="Password" name="password" contentType={ContentType.Password} layout={{ MinWidth: 300 }} />
    </view>;
  }
}
