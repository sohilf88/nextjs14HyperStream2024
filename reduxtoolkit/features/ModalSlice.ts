"use client"

import {createSlice} from "@reduxjs/toolkit"

const initialState={
    isOpen:false,
    
}

export const modalSlice=createSlice({
    name:"modal",
    initialState,
    reducers:{
        handleOpen:(state)=>{
            state.isOpen=true
        },
        handleClose:(state)=>{
            state.isOpen=false
        }
    }

})

export default modalSlice.reducer
export const {handleClose, handleOpen}=modalSlice.actions