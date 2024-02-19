"use client"

import { PayloadAction, createSlice } from "@reduxjs/toolkit"

const initialState = {
    isOpen: false,
    isUpdate: false,
    isPlayAll: false,

}

export const modalSlice = createSlice({
    name: "modal",
    initialState,
    reducers: {
        // modal open state
        handleOpen: (state) => {
            state.isOpen = true
        },
        // modal close state
        handleClose: (state) => {
            state.isOpen = false
        },
        // to add new camera and Change Modal update button name to New
        handleUpdate: (state, action) => {
            state.isUpdate = action.payload
        },
        handlePlayAllCameras: (state, action: PayloadAction<boolean>) => {
            state.isPlayAll = action.payload
        }
    }

})

export default modalSlice.reducer
export const { handleClose, handleOpen, handleUpdate, handlePlayAllCameras } = modalSlice.actions