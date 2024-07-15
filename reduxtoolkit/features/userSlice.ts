"use client"

import { PayloadAction, createSlice } from "@reduxjs/toolkit"

const initialState = {

    roles: ["user"]

}

export const userSlice = createSlice({
    name: "userRole",
    initialState,
    reducers: {

        handleUserRoles: (state, action: PayloadAction<[]>) => {
            state.roles = action.payload
        },


    }

})

export default userSlice.reducer
export const { handleUserRoles } = userSlice.actions