import { camera, cameraFeatureSlice, createCamera } from "@/typescript.definations"
import {createSlice,createAsyncThunk,PayloadAction} from "@reduxjs/toolkit"
import axios from "axios"
const initialState={
    data:[],
    selectedCamera:[],
    onRowSelected:null,
} as cameraFeatureSlice




export const cameraSlice=createSlice({
    name:"camera",
    initialState,
    reducers:{
        // used to get selected cameras from user dashboard table
        selectedCamera:(state,action:PayloadAction<camera[] >)=>{
            state.selectedCamera=action.payload

        },
        // below reducer is used to update Camera in User Dashboard
        onRowSelectedSlice:(state,action:PayloadAction<camera |null>)=>{
            state.onRowSelected=action.payload

        }
    },
    

})
export default cameraSlice.reducer
export const {selectedCamera,onRowSelectedSlice}=cameraSlice.actions