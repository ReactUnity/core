import { Action, configureStore, getDefaultMiddleware, ThunkAction } from '@reduxjs/toolkit';
import { persistStore } from 'redux-persist';
import { mainReducer } from './slices/main';

export const store = configureStore({
  reducer: {
    main: mainReducer,
  },
  middleware: getDefaultMiddleware({
    immutableCheck: false,
    serializableCheck: false,
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

