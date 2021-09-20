import * as React from 'react';
import { Renderer } from '@reactunity/renderer';
import './index.scss';
import { Inventory } from './inventory';
import { Provider } from 'react-redux';
import { persistor, store } from './store';
import { PersistGate } from 'redux-persist/integration/react';

function Root() {
  return <view>
    <Inventory />
  </view>;
}


function Main() {
  return <PersistGate persistor={persistor}>

    <Provider store={store}>
      <Root />
    </Provider>
  </PersistGate>;
}

Renderer.render(<Main />);
