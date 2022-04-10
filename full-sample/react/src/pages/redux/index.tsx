import React from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { decrement, increment, persistor, selectCount, store } from 'src/store';

export function Redux() {
  const dispatch = useDispatch();
  const count = useSelector(selectCount);

  return <Provider store={store}>
    <PersistGate persistor={persistor}>
      <view>Count: {count?.toString()}</view>
      <button onClick={() => dispatch(increment())}>Increment</button>
      <button onClick={() => dispatch(decrement())}>Decrement</button>

    </PersistGate>
  </Provider>;
}
