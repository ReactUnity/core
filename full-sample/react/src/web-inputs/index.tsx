import * as React from 'react';
import { ContentType } from '@reactunity/renderer';

export class App extends React.Component<{}, {}> {

  constructor(props) {
    super(props);
    this.state = {};
  }


  render() {
    return <view style={{ height: '100%', alignItems: 'Center', justifyContent: 'Center' }}>
      <input webSupport placeholder="Email" name="email" style={{ marginBottom: 20, minWidth: 300 }} />
      <input webSupport placeholder="Password" name="password" contentType={ContentType.Password} style={{ minWidth: 300 }} />
    </view>;
  }
}
