"use client"

import { PayloadAction, createSlice } from "@reduxjs/toolkit"

const initialState = {

    role: "user"

}

export const userSlice = createSlice({
    name: "userRole",
    initialState,
    reducers: {

        handleUserRoles: (state, action: PayloadAction<string>) => {
            state.role = action.payload
        },


    }

})

export default userSlice.reducer
export const { handleUserRoles } = userSlice.actions