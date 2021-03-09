import { UnityEngine } from "@reactunity/renderer";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PersistConfig, persistReducer } from "redux-persist";
import { RootState } from "..";
import { unityLocalStorage } from "../localStorage";

const persistConfig: PersistConfig<MainState> = {
  key: 'main',
  storage: unityLocalStorage,
  throttle: 500,
  // blacklist: ['zoom'],
};

interface MainState {
  positionX: number;
  positionY: number;
  zoom: number;
  startNode?: [number, number];
  endNode?: [number, number];
}


export const mainSlice = createSlice({
  name: 'main',
  initialState: {
    positionX: 0,
    positionY: 0,
    zoom: 1,
  } as MainState,
  reducers: {
    addPosition: (state, action: PayloadAction<UnityEngine.Vector2 | UnityEngine.Vector3>) => {
      state.positionX = state.positionX + action.payload.x;
      state.positionY = state.positionY + action.payload.y;

      if (state.startNode) state.startNode = [state.startNode[0] + action.payload.x, state.startNode[1] + action.payload.y];
      if (state.endNode) state.endNode = [state.endNode[0] + action.payload.x, state.endNode[1] + action.payload.y];
    },
    setStartNode: (state, action: PayloadAction<UnityEngine.Vector2>) => {
      if (action.payload) state.startNode = [action.payload.x / state.zoom, action.payload.y / state.zoom];
      else state.startNode = null;
    },
    setEndNode: (state, action: PayloadAction<UnityEngine.Vector2>) => {
      if (action.payload) state.endNode = [action.payload.x / state.zoom, action.payload.y / state.zoom];
      else state.endNode = null;
    },
    addZoom: (state, action: PayloadAction<number>) => {
      // const newZoom = state.zoom + action.payload;
      // state.zoom = Math.min(Math.max(newZoom, 0.2), 10);
      state.zoom = 1;
    }
  },
});

export const mainReducer = persistReducer(persistConfig, mainSlice.reducer);
// export const mainReducer = mainSlice.reducer;
export const selectPositionX = (x: RootState) => x.main.positionX || 0;
export const selectPositionY = (x: RootState) => x.main.positionY || 0;
export const selectZoom = (x: RootState) => x.main.zoom;

export const { addPosition, setStartNode, setEndNode, addZoom } = mainSlice.actions;
