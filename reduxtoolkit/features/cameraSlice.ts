import { camera, cameraFeatureSlice } from "@/typescript.definations"
import {createSlice,createAsyncThunk,PayloadAction} from "@reduxjs/toolkit"
import axios from "axios"
const initialState={
    data:[],
} as cameraFeatureSlice


// getALlCameras from api using asyncThunk
export const getCameras=createAsyncThunk("get/cameras",async(thunkAPI)=>{
const response=await axios.get("http://localhost:5000/api/v1/cameras")
// const response=await fetch("localhost:5000/api/v1/cameras")
// const data=await response.json()
return response.data.result
})


export const cameraSlice=createSlice({
    name:"camera",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(getCameras.fulfilled,(state,action:PayloadAction<camera[] >)=>{
             state.data.push(...action.payload)
        })
        builder.addCase(getCameras.rejected,(state)=>{
            state.data=state.data
        })
    }

})
export default cameraSlice.reducer
// export const {}=cameraSlice.actions