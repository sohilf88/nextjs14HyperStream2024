import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import {cameraSlice} from "../features/cameraSlice";
import {modalSlice} from "../features/ModalSlice";
export const store = configureStore({
  reducer: {
    cameras:cameraSlice.reducer,
    modal:modalSlice.reducer,
    
  },
});

export type RootState = ReturnType<typeof store.getState>;

