import { AgGridReact } from "ag-grid-react"; // React Grid Logic
import "ag-grid-community/styles/ag-grid.css"; // Core CSS
import "ag-grid-community/styles/ag-theme-quartz.css"; // Theme
import { ColDef, AgGridEvent, ValueGetterParams } from "ag-grid-community"; //typeScript for ag grid
import { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { Box, Button, Modal ,ButtonGroup, Stack} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import SlowMotionVideoTwoToneIcon from '@mui/icons-material/SlowMotionVideoTwoTone';
import PlayCircleTwoToneIcon from '@mui/icons-material/PlayCircleTwoTone';
import Actions from "./Actions";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/reduxtoolkit/store/Hooks";
import ModalData from "@/components/ModalData";
import { handleClose,handleOpen } from "@/reduxtoolkit/features/ModalSlice";
import useTableHook from "@/hooks/useTableHook";


function SimpleTable() {
  const [rowData,formData,getAllCameraDataFromBackEnd,handleFormSubmit,handleClick,handleDataUpdateOnEditButton,deleteSingleCamera,]=useTableHook()
 
  const [gridReady, setGridReady] = useState(null);
  const dispatch = useAppDispatch();
  
  useEffect(() => {
    
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
  const { isOpen } = useAppSelector((store) => store.modal);

 
  function onGridReady(params: AgGridEvent) {
    // console.log(params)
  
  }
  const height=480;
  return (
    <>
    <div className="for-buttons md:mb-1 xl:mb-3 3xl:mb-14 ">
      <Stack justifyContent={"end"}  direction="row" spacing={3}>

      

      <Button color="secondary" size="large" onClick={()=>dispatch(handleOpen())}  variant="outlined" startIcon={<AddTwoToneIcon />}>Add Camera</Button>
      
      <Button   target="_blank" LinkComponent={Link} href="/user" size="large" variant="outlined" startIcon={<SlowMotionVideoTwoToneIcon/>}>Play Selected</Button>
      <Button target="_blank" LinkComponent={Link} href="/user" size="large" variant="outlined" color="success" startIcon={<PlayCircleTwoToneIcon/>}>Play All</Button>
      <Button size="large" variant="outlined" color="error" startIcon={<DeleteIcon />}>Delete Cameras</Button>
      
      </Stack>
    </div>
    
    <div className="ag-theme-quartz shadow-md" style={{ height: height }}>
      
      <AgGridReact
        defaultColDef={defaultCols}
        columnDefs={cameraColDefs}
        rowData={rowData}
        rowSelection={"multiple"}
        suppressRowDeselection={true}
        rowMultiSelectWithClick={true}
        pagination={true}
        // onRowSelected={onRowSelectedFunction}
        // onSelectionChanged={getSelectedRowsByCheckBox}
        // enableCellChangeFlash={true}
      />
      <Modal open={isOpen} onClose={() => dispatch(handleClose())}>
        <Box>
        <ModalData handleFormSubmit={handleFormSubmit} handleClick={handleClick} formData={formData}/>
        
        </Box>
      </Modal>
      <ToastContainer/>
    </div>
    </>
  );
}

export default SimpleTable;
