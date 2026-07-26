import { render } from '@reactunity/renderer';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import './index.scss';
import { Inventory } from './inventory';
import { persistor, store } from './store';

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

render(<Main />);
