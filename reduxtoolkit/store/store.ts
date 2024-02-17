import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

import { cameraSlice } from "../features/cameraSlice";
import { modalSlice } from "../features/ModalSlice";

const persistConfig = {
  key: 'root',
  storage,
}

const rootReducer = combineReducers({
  cameras: cameraSlice.reducer,
  modal: modalSlice.reducer,
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

