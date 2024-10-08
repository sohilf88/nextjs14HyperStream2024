import { camera, cameraFeatureSlice, createCamera } from "@/typescript.definations"
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"

const initialState = {
    data: [],
    selectedCamera: [],
    onRowSelected: null,
    id: null
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
        }
    },


})
export default cameraSlice.reducer
export const { selectedCamera, onRowSelectedSlice, getUserId } = cameraSlice.actions