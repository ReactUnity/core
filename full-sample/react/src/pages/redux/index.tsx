import { Provider, useDispatch, useSelector } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { decrement, increment, persistor, selectCount, store } from 'src/store';

export function Redux() {
  return <Provider store={store}>
    <ReduxCore />
  </Provider>;
}


function ReduxCore() {
  const dispatch = useDispatch();
  const count = useSelector(selectCount);

  return <PersistGate persistor={persistor}>
    <view>Count: {count?.toString()}</view>
    <button onClick={() => dispatch(increment())}>Increment</button>
    <button onClick={() => dispatch(decrement())}>Decrement</button>
  </PersistGate>;
}
