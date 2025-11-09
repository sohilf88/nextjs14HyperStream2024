"use client"

import { PayloadAction, createSlice } from "@reduxjs/toolkit"

const initialState = {

    role:"",
    userId:""

}

export const userSlice = createSlice({
    name: "userRole",
    initialState,
    reducers: {

        handleUserRoles: (state, action: PayloadAction<string >) => {
            state.role = action.payload
            state.userId = action.payload
            
        },
        handleUserid: (state, action: PayloadAction<string >) => {
            
            state.userId = action.payload
            
        },
        
        


    }

})

export default userSlice.reducer
export const { handleUserRoles ,handleUserid} = userSlice.actions