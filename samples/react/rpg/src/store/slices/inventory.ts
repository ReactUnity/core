import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PersistConfig } from "redux-persist";
import persistReducer from "redux-persist/es/persistReducer";
import { unityStorage } from "../storage";

import item1 from 'src/assets/icons/skoll/glock.png';
import item2 from 'src/assets/icons/skoll/stiletto.png';
import item3 from 'src/assets/icons/skoll/ak47.png';
import item4 from 'src/assets/icons/skoll/bowie-knife.png';

export interface ItemObject {
  image: string;
  tint?: string;
  slot: number;
}

const defaultItems: ItemObject[] = [
  { image: item1, slot: 4 },
  { image: item2, slot: 0 },
  { image: item3, slot: 1 },
  { image: item4, slot: 2 },
];

export interface InventoryModel {
  items: ItemObject[];
  size: number;
}


export const inventorySlice = createSlice({
  name: 'inventory',
  initialState: {
    items: defaultItems,
    size: 50,
  } as InventoryModel,
  reducers: {
    swapItems: (st, { payload: { slot1, slot2 } }: PayloadAction<{ slot1: number, slot2: number }>) => {
      const item1 = st.items.find(x => x.slot === slot1);
      const item2 = st.items.find(x => x.slot === slot2);

      if (item1) item1.slot = slot2;
      if (item2) item2.slot = slot1;
    }
  },
});

export const { swapItems } = inventorySlice.actions;

const persistConfig: PersistConfig<InventoryModel> = {
  storage: unityStorage,
  key: 'inventory',
  blacklist: ['items'],
};

export const inventoryReducer = persistReducer(persistConfig, inventorySlice.reducer);
