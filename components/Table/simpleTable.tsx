"use client"

import { AgGridReact } from "ag-grid-react"; // React Grid Logic
// import "ag-grid-community/styles/ag-grid.css"; // Core CSS
// import "ag-grid-community/styles/ag-theme-quartz.css"; // Theme
import { ColDef, AgGridEvent, ValueGetterParams, RowSelectedEvent } from "ag-grid-community"; //typeScript for ag grid
import { useState, useEffect } from "react";

import { Box, Button, Modal ,ButtonGroup, Stack, Fab, TextField, InputLabel, Badge, Tooltip} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import SlowMotionVideoTwoToneIcon from '@mui/icons-material/SlowMotionVideoTwoTone';
import PlayCircleTwoToneIcon from '@mui/icons-material/PlayCircleTwoTone';
import Actions from "./Actions";

import { useAppDispatch, useAppSelector } from "@/reduxtoolkit/store/Hooks";
import ModalData from "@/components/ModalData";
import { handleClose,handleOpen, handlePlayAllCameras,handleSelectedCameras } from "@/reduxtoolkit/features/ModalSlice";
import useTableHook, { errorHandler } from "@/hooks/useTableHook";
import { onRowSelectedSlice, selectedCamera } from "@/reduxtoolkit/features/cameraSlice";
import { camera } from "@/typescript.definations";
import DriveFolderUploadTwoToneIcon from '@mui/icons-material/DriveFolderUploadTwoTone';
import { axiosAuth } from "@/app/lib/axios";
import axios from "axios"
import { toast } from "sonner";
import { useFormStatus } from "react-dom";

import DeleteTwoTone from "@mui/icons-material/DeleteTwoTone";
import Link from "next/link";

function SimpleTable() {
  const {role}=useAppSelector((store)=>store.root.userRole)
  const [rowData,formData,getAllCameraDataFromBackEnd,handleFormSubmit,handleClick,handleDataUpdateOnEditButton,deleteSingleCamera,setFormData,disableSelectedCamera,setRowData,]=useTableHook()
 
  const [gridReady, setGridReady] = useState<AgGridEvent>();
  const [rowSelected,setRowSelected]=useState<camera[]| null>([])
  const [isSelected,setIsSelected]=useState(false)
  const [isDeleted,setIsDeleted]=useState(false)
  const dispatch = useAppDispatch();
 
  
  
// multiple Camera delete Function
async function deleteMultipleCameras(){
  let deleteMultiples=[] as string[]
  rowSelected && rowSelected.map((row:camera)=>{
    deleteMultiples?.push(row._id as string)
   
  })
  try {
    
    setIsDeleted(true)

  const response=await axiosAuth.delete("/camera/deletemany",{data:{deleteMultiples}})
  // console.log(response.status)
  if(response){
    // @ts-ignore
    
    getAllCameraDataFromBackEnd()
    setIsDeleted(false)
    toast.error(` Removed successfully,Total deleted count =${response.data.message} `)
  }
    
  } catch (error) {
    // console.log(error)
    setIsDeleted(false)
    errorHandler(error)
  }
 
}
  // for table height size
  const [width, setWidth] = useState(0)
  // const [heightofViewport, setheightofViewport] = useState(0)

  const handleWindowResize = () => {
    setWidth(window.innerWidth);
    // setheightofViewport(window.innerHeight);
  }
  if(width>1600){
    var height=640
  }else{
    height=480
  }
  // useEffect(() => {
  //   // component is mounted and window is available
  //   handleWindowResize();
  //   window.addEventListener('resize', handleWindowResize);
  //   // unsubscribe from the event on component unmount
  //   return () => window.removeEventListener('resize', handleWindowResize);
  // }, []);
  
  // file upload function
   const onSubmit = async (formData:FormData) => {
    const file=formData.get("file")
    // console.log(file)
    if (!file) return

    try {
      const data = new FormData()
      
      data.set('file', file)
     const response =await axiosAuth.post("/camera/bulk-import",data)
      // console.log(response.data)
     if(response.data){
      // @ts-ignore
     await getAllCameraDataFromBackEnd()
      toast.success(response.data.message)
     }
      
    } catch (error) {
      // Handle errors here
      errorHandler(error)
    }
  } 
  // form Data for file input
 const Fileupload=()=>{
  const {pending}=useFormStatus()
  return (
    <>
    
      <label htmlFor="file" className="flex items-center  text-white">
        
       <Tooltip arrow title="click to upload csv">
      {/* <DriveFolderUploadTwoToneIcon className="w-6 h-6 "/> */}
      
      <input required  name="file"  id="file" type="file" className="w-full  text-sm text-gray-300
        file:me-4 file:py-2 file:px-6
        file:rounded-sm file:border-1
        file:text-sm file:font-semibold
        file:bg-blue-600 file:text-white
        hover:file:bg-blue-700
        file:disabled:opacity-50 file:disabled:pointer-events-none
        
             
      "/>
      </Tooltip>
      
    </label>
    
    
    <Tooltip title="click to uplad" arrow placement="bottom-end">
      <span>
    <Button size="large" type="submit" disabled={pending} color="warning" variant="text">{pending ?"uploading...":"upload"}</Button>
    </span>
    </Tooltip>
    </>
  )
 }
  useEffect(() => {
    // @ts-ignore
     getAllCameraDataFromBackEnd();
    
    //  setIsPlayAll(gridReady?.api.paginationGetRowCount()===0)
     handleWindowResize();
    window.addEventListener('resize', handleWindowResize);

    // unsubscribe from the event on component unmount
    return () => window.removeEventListener('resize', handleWindowResize);
  }, []);

  const [defaultCols, setDefaultCols] = useState<ColDef>({
    filter: true,
    floatingFilter: true,
    flex: 1,
  });

  // socket configuration

 

  const [cameraColDefs, setCameraColDefs] = useState<ColDef[]>([
    {
      field: "name",maxWidth:240,
      headerName: "Name",
      
      checkboxSelection: true,
      headerCheckboxSelection: true,
      headerCheckboxSelectionFilteredOnly: true,
    },
    { field: "district", headerName: "District", },
    { field: "taluka", headerName: "Taluka"},
    { field: "city", headerName: "City", },
    { field: "area",maxWidth:360 },
    {
      field: "Action",
      filter: false,
      editable: false,
      maxWidth: 240,
      
      cellRenderer: (parmas:ValueGetterParams) => {
        
        return <Actions getUser={getAllCameraDataFromBackEnd} deleteCamera={deleteSingleCamera} handleDataUpdateOnEditButton={handleDataUpdateOnEditButton}  params={parmas} />;
      },
    },
  ]);
  
  // below state is for MUI-Modal only
  const { isOpen } = useAppSelector((store) => store.root.modal);
//  const { selectedCamera } = useAppSelector((store) => store.root.cameras)
 
  function onGridReady(params: AgGridEvent) {
   
   setGridReady(params)
  
  }


  // get no.of selected rows and add into ReduxToolkit
  function getSelectedRowsByCheckBox(event: AgGridEvent) {
    setRowSelected(event.api.getSelectedRows())
    dispatch(selectedCamera(event.api.getSelectedRows()));
  }
  // select single row for and display into modal via ReduxToolkit Camera Slice with Reducer onRowSelected
  function onRowSelectedFunction(event: RowSelectedEvent) {
    if (event.node.isSelected()) {
      dispatch(onRowSelectedSlice(event.data));
     
    }
  }

  function playAllCamerasinNewTabOnClick(){
  dispatch(handlePlayAllCameras(true))
  window.open('/user', '_blank', 'noopener')

}
function playselectedCamerasinNewTabOnClick(){
  dispatch(handlePlayAllCameras(false))
  window.open('/user/selected', '_blank', 'noopener')

}
// function disabledCamera(){
//   dispatch(handlePlayAllCameras(false))
//   window.open('/dashboard/disabled', '_blank', 'noopener')

// }

// check length of selected cameras is 0 or not

 
  useEffect(()=>{
if(rowSelected!=null && rowSelected.length >0){
  setIsSelected(true)
 }
 if(rowSelected?.length===0 ){
  setIsSelected(false)
 }
  },[rowSelected])
 
 
  // function runSocket(){
  //  const socket=io("http://localhost:5000")
  //  socket.on("connection",(data)=>{
  //   socket.on("web",(data)=>{
  //     console.log(data)
  //   })
  //  })
  //  socket.emit("publish","rowSelected")
   
  // }
  // useEffect(()=>{
  //  runSocket()
  // },[])

  return (
    <>
    <div className="for-buttons md:mb-1 xl:mb-3 3xl:mb-5 ">
    
     
     <main className="flex gap-5 items-center ">
        <section></section>
    
    
              

         
  <form className="flex max-w-xs" action={onSubmit}>
    <Fileupload></Fileupload>
     
     
  </form>
 <Button color="secondary" size="large" onClick={()=>dispatch(handleOpen())}  variant="contained" startIcon={<AddTwoToneIcon />}>Add Camera</Button>
  
        
          
         
     
      <div className=" flex flex-1 gap-5  justify-end">
    <Button
      disabled={!isSelected}
         onClick={
        playselectedCamerasinNewTabOnClick
    } size="large" variant="contained"  startIcon={<SlowMotionVideoTwoToneIcon/>}>Play Selected</Button>
        {/* @ts-ignore */}
      <Button disabled={rowData?.length===0}  onClick={playAllCamerasinNewTabOnClick} size="large" variant="contained"  color="success" startIcon={<PlayCircleTwoToneIcon/>}>Play All</Button>
    </div>       
    
        <div className="  justify-end flex gap-5" >
          
           <Button onClick={deleteMultipleCameras} type="button"  disabled={!isSelected} size="large" variant="contained"  color="error" startIcon={<DeleteIcon />}>{isDeleted?"deleting...":"Delete many"}</Button>
        
            {/* <Tooltip title="Recycle bin">
                    <Badge badgeContent={1} color="success">
 

      <Fab onClick={disabledCamera} color="error" size="small" aria-label="RecyclingTwoTone">
  <DeleteTwoTone />
</Fab>
</Badge>
          </Tooltip> */}
      
     
     
        </div>
      
      
 
      
     
      
      
      </main>
      
    </div>
    
    <div className="ag-theme-quartz-dark shadow-lg" style={{ height: height,maxWidth:"90%",margin:"auto",textAlign:"center",textShadow:"revert-layer",color:"green" }}>
      
      <AgGridReact
        defaultColDef={defaultCols}
        columnDefs={cameraColDefs}
        //@ts-ignore
        rowData={rowData} 
        rowSelection={"multiple"}
        suppressRowDeselection={true}
        rowMultiSelectWithClick={true}
        pagination={true}
        onGridReady={onGridReady}
        onRowSelected={onRowSelectedFunction}
        onSelectionChanged={getSelectedRowsByCheckBox}
        
        
        
        // enableCellChangeFlash={true}
      />
      <Modal open={isOpen} onClose={() => dispatch(handleClose())}>
        <Box>
        <ModalData handleFormSubmit={handleFormSubmit} handleClick={handleClick} formData={formData} setFormData={setFormData}/>
        
        </Box>
      </Modal>
     
    </div>
    </>
  );
}

export default SimpleTable;
