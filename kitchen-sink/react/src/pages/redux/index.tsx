import { Provider, useDispatch, useSelector } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { decrement, increment, persistor, selectCount, store } from '#src/store.ts';

export function Redux() {
  return (
    <Provider store={store}>
      <ReduxCore />
    </Provider>
  );
}

function ReduxCore() {
  const dispatch = useDispatch();
  const count = useSelector(selectCount);

  return (
    <PersistGate persistor={persistor}>
      <h1>Redux</h1>

      <view className={'items-center gap-4 self-start rounded-2xl bg-white p-8 ring-1 ring-slate-200'}>
        <view className={'text-6xl font-bold text-indigo-600'}>{count?.toString()}</view>

        <view className={'flex-row gap-3'}>
          <button className={'size-12 bg-slate-200 transition-colors hover:bg-slate-300'} onClick={() => dispatch(decrement())}>
            -
          </button>

          <button
            className={'size-12 bg-indigo-500 text-white transition-colors hover:bg-indigo-400'}
            onClick={() => dispatch(increment())}
          >
            +
          </button>
        </view>

        <view className={'text-sm text-slate-500'}>Persisted, so it survives a reload.</view>
      </view>
    </PersistGate>
  );
}
