import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from 'redux-persist'
// import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

import { cameraSlice } from "../features/cameraSlice";
import { modalSlice } from "../features/ModalSlice";

import createWebStorage from "redux-persist/lib/storage/createWebStorage";
import { userSlice } from "../features/userSlice";

const createNoopStorage = () => {
  return {
    getItem(_key:any) {
      return Promise.resolve(null);
    },
    setItem(_key: any, value: any) {
      return Promise.resolve(value);
    },
    removeItem(_key: any) {
      return Promise.resolve();
    },
  };
};

const storage = typeof window !== "undefined" ? createWebStorage("local") : createNoopStorage();

export default storage;
const persistConfig = {
  key: 'root',
  storage,
}

const rootReducer = combineReducers({
  cameras: cameraSlice.reducer,
  modal: modalSlice.reducer,
  userRole: userSlice.reducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)
export const store = configureStore({
  reducer: {

    root: persistedReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export let persistor = persistStore(store)
export type RootState = ReturnType<typeof store.getState>;

