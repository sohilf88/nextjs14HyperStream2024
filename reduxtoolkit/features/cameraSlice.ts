import { camera, cameraFeatureSlice, createCamera } from "@/typescript.definations"
import {createSlice,createAsyncThunk,PayloadAction} from "@reduxjs/toolkit"
import axios from "axios"
const initialState={
    data:[],
} as cameraFeatureSlice


// getallCameras from api using asyncThunk
export const getCameras=createAsyncThunk("get/cameras",async()=>{
const response=await axios.get("http://localhost:5000/api/v1/camera")
// const response=await fetch("localhost:5000/api/v1/cameras")
// const data=await response.json()
return response.data.result
})

// create camera
export const updateCamera=createAsyncThunk("update/camera",async(data:createCamera)=>{
    const response=await axios.post("http://localhost:5000/api/v1/camera/",{
    data:data
    })
})

//!todo update camera request by use of patch request pending


// todo => delete camera request pending


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
        builder.addCase(updateCamera.fulfilled,(state,action)=>{
            // action still pending
        })

    }

})
export default cameraSlice.reducer
// export const {}=cameraSlice.actions