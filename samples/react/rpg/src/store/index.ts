import { configureStore } from "@reduxjs/toolkit";
import persistStore from "redux-persist/es/persistStore";
import { inventoryReducer } from "./slices/inventory";

export const store = configureStore({
  reducer: {
    inventory: inventoryReducer,
  },
  devTools: false,

  middleware: getDefaultMiddleware => getDefaultMiddleware({
    serializableCheck: false,
    thunk: true,
    immutableCheck: false,
  }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;

