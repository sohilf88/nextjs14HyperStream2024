import { camera, cameraFeatureSlice, createCamera } from "@/typescript.definations"
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"

export const emptyCamera: camera = {
  _id:"",
    name:"",
    district:"",
    taluka:"",
    city:"",
    area:"",
    url:"",
    isActive:true,
    streamStart:"",
    streamEnd:"",
    isLive:false,
    streamId:""
};
const initialState = {
    data: [],
    selectedCamera: [],
    onRowSelected: null,
    id: null,
    currentCamera:emptyCamera
} as cameraFeatureSlice




export const cameraSlice = createSlice({
    name: "camera",
    initialState,
    reducers: {
        // used to get selected cameras from user dashboard table
        selectedCamera: (state, action: PayloadAction<camera[]>) => {
            state.selectedCamera = action.payload

        },
        // below reducer is used to update Camera in User Dashboard
        onRowSelectedSlice: (state, action: PayloadAction<camera | null>) => {
            state.onRowSelected = action.payload

        },
        getUserId: (state, action: PayloadAction<string>) => {
            state.id = action.payload
        },
        currentCameraDetail:(state, action: PayloadAction<camera>)=>{
            state.currentCamera=action.payload
        },
        clearCurrentCamera(state) {
      state.currentCamera = emptyCamera;
    }

    },


})
export default cameraSlice.reducer
export const { selectedCamera, onRowSelectedSlice, getUserId,currentCameraDetail,clearCurrentCamera } = cameraSlice.actions