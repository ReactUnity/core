import { Action, configureStore, createSlice, getDefaultMiddleware, ThunkAction } from '@reduxjs/toolkit';
import { FLUSH, PAUSE, PERSIST, PersistConfig, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from 'redux-persist';

const persistConfig: PersistConfig<{ count: number }> = {
  key: 'counter',
  storage: {
    getItem: x => {
      const item = localStorage.getItem(x);
      if (item) {
        try {
          return Promise.resolve(JSON.parse(item));
        } catch { }
      }
      return Promise.resolve(null);
    },
    setItem: (x, v) => { localStorage.setItem(x, JSON.stringify(v)); return Promise.resolve(); },
    removeItem: (x) => { localStorage.removeItem(x); return Promise.resolve(); },
  },
};

const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    count: 0,
  },
  reducers: {
    increment: state => ({ count: (state.count || 0) + 1 }),
    decrement: state => ({ count: (state.count || 0) - 1 }),
  },
});

const counter = persistReducer(persistConfig, counterSlice.reducer);

export const { increment, decrement } = counterSlice.actions;

export const store = configureStore({
  reducer: {
    counter,
  },
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
  devTools: false,
});
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
export type AppThunkCreator<PayloadType = any, ReturnType = void> = (arg: PayloadType) => AppThunk<ReturnType>;

export const selectCount = (x: RootState) => x.counter.count;
