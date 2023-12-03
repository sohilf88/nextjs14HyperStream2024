import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import {cameraSlice} from "../features/cameraSlice";
export const store = configureStore({
  reducer: {
    cameras:cameraSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

