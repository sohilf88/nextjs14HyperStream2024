"use client"
import { AgGridReact } from "ag-grid-react"; // React Grid Logic
import "ag-grid-community/styles/ag-grid.css"; // Core CSS
import "ag-grid-community/styles/ag-theme-quartz.css"; // Theme
import { ColDef, AgGridEvent, ValueGetterParams, RowSelectedEvent } from "ag-grid-community"; //typeScript for ag grid
import { useState, useEffect } from "react";

import { Box, Button, Modal ,ButtonGroup, Stack, Fab, TextField} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import SlowMotionVideoTwoToneIcon from '@mui/icons-material/SlowMotionVideoTwoTone';
import PlayCircleTwoToneIcon from '@mui/icons-material/PlayCircleTwoTone';
import Actions from "./Actions";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/reduxtoolkit/store/Hooks";
import ModalData from "@/components/ModalData";
import { handleClose,handleOpen, handlePlayAllCameras,handleSelectedCameras } from "@/reduxtoolkit/features/ModalSlice";
import useTableHook from "@/hooks/useTableHook";
import { onRowSelectedSlice, selectedCamera } from "@/reduxtoolkit/features/cameraSlice";
import { camera } from "@/typescript.definations";


function SimpleTable() {
  const [rowData,formData,getAllCameraDataFromBackEnd,handleFormSubmit,handleClick,handleDataUpdateOnEditButton,deleteSingleCamera,setFormData,setRowData]=useTableHook()
 
  const [gridReady, setGridReady] = useState(null);
  const [rowSelected,setRowSelected]=useState<camera[]| null>([])
  const [isSelected,setIsSelected]=useState(false)
  const dispatch = useAppDispatch();

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
  useEffect(() => {
    // component is mounted and window is available
    handleWindowResize();
    window.addEventListener('resize', handleWindowResize);
    // unsubscribe from the event on component unmount
    return () => window.removeEventListener('resize', handleWindowResize);
  }, []);
  

  useEffect(() => {
    // @ts-ignore
    getAllCameraDataFromBackEnd();
  }, []);

  const [defaultCols, setDefaultCols] = useState<ColDef>({
    filter: true,
    floatingFilter: true,
    flex: 1,
  });

  
  const [cameraColDefs, setCameraColDefs] = useState<ColDef[]>([
    {
      field: "name",
      headerName: "Name",

      checkboxSelection: true,
      headerCheckboxSelection: true,
      headerCheckboxSelectionFilteredOnly: true,
    },
    { field: "district", headerName: "District" },
    { field: "taluka", headerName: "Taluka" },
    { field: "city", headerName: "City" },
    { field: "area" },
    {
      field: "Action",
      filter: false,
      editable: false,
      maxWidth: 150,
      cellRenderer: (parmas:ValueGetterParams) => {
        return <Actions deleteCamera={deleteSingleCamera} handleDataUpdateOnEditButton={handleDataUpdateOnEditButton} params={parmas} />;
      },
    },
  ]);
  
  // below state is for MUI-Modal only
  const { isOpen } = useAppSelector((store) => store.root.modal);
//  const { selectedCamera } = useAppSelector((store) => store.root.cameras)
 
  function onGridReady(params: AgGridEvent) {
   
   
  
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
// table dynamic size based upon windows resolution

 

  // let height=480;
//   if(window.innerWidth>1600){
//     height=620;
//   }else {
//    height=480
//   }
//  console.log(window.innerWidth)
  function playAllCamerasinNewTabOnClick(){
  dispatch(handlePlayAllCameras(true))
  window.open('/user', '_blank', 'noopener')

}
function playselectedCamerasinNewTabOnClick(){
  dispatch(handlePlayAllCameras(false))
  window.open('/user/selected', '_blank', 'noopener')

}

// check length of selected cameras is 0 or not

 
  useEffect(()=>{
if(rowSelected!=null && rowSelected.length >0){
  setIsSelected(true)
 }
 if(rowSelected?.length===0 ){
  setIsSelected(false)
 }
  },[rowSelected])

  return (
    <>
    <div className="for-buttons md:mb-1 xl:mb-3 3xl:mb-5 ">
     
      <Stack justifyContent={"end"}  direction="row" spacing={3}>
      
      
 
      <Button color="secondary" size="large" onClick={()=>dispatch(handleOpen())}  variant="contained" startIcon={<AddTwoToneIcon />}>Add Camera</Button>
      
      <Button
      disabled={!isSelected}
         onClick={
        playselectedCamerasinNewTabOnClick
    } size="large" variant="contained"  startIcon={<SlowMotionVideoTwoToneIcon/>}>Play Selected</Button>
      <Button  onClick={playAllCamerasinNewTabOnClick} size="large" variant="contained"  color="success" startIcon={<PlayCircleTwoToneIcon/>}>Play All</Button>
      <Button disabled={!isSelected} size="large" variant="contained"  color="error" startIcon={<DeleteIcon />}>Delete Cameras</Button>
     
      
      
      </Stack>
    </div>
    
    <div className="ag-theme-quartz-dark shadow-xs" style={{ height: height }}>
      
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
