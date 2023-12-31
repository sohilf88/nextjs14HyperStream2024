"use client"

import {createSlice} from "@reduxjs/toolkit"

const initialState={
    isOpen:false,
    isUpdate:false,
    
}

export const modalSlice=createSlice({
    name:"modal",
    initialState,
    reducers:{
        // modal open state
        handleOpen:(state)=>{
            state.isOpen=true
        },
        // modal close state
        handleClose:(state)=>{
            state.isOpen=false
        },
        // to add new camera and Change Modal update button name to New
        handleUpdate:(state)=>{
            state.isUpdate=true
        }
    }

})

export default modalSlice.reducer
export const {handleClose, handleOpen,handleUpdate}=modalSlice.actions