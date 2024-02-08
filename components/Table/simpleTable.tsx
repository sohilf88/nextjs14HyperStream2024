import { AgGridReact } from "ag-grid-react"; // React Grid Logic
import "ag-grid-community/styles/ag-grid.css"; // Core CSS
import "ag-grid-community/styles/ag-theme-quartz.css"; // Theme
import { ColDef, AgGridEvent, RowSelectedEvent } from "ag-grid-community"; //typeScript for ag grid
import { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { Box, Modal } from "@mui/material";
import { createCamera } from "@/typescript.definations";
import Actions from "./Actions";
import {
  selectedCamera,
  onRowSelectedSlice,
} from "@/reduxtoolkit/features/cameraSlice";
import { useAppDispatch, useAppSelector } from "@/reduxtoolkit/store/Hooks";
import ModalData from "@/components/ModalData";
import { handleClose,handleOpen,handleUpdate } from "@/reduxtoolkit/features/ModalSlice";
import useTableHook from "@/hooks/useTableHook";


function SimpleTable() {
  const [rowData,formData,getAllCameraDataFromBackEnd,createNewCameraOnSubmit,handleClick,handleDataUpdate,deleteSingleCamera,updateSingleCamera]=useTableHook()
 
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

  // function handleUpdate (oldData:any)  {
  //   setFormData(oldData)
  //   dispatch(handleOpen())
  //   dispatch(handleUpdate())
  // }
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
      cellRenderer: (parmas) => {
        return <Actions deleteCamera={deleteSingleCamera} handleDataUpdate={handleDataUpdate} params={parmas} />;
      },
    },
  ]);
  
  // below state is for MUI-Modal only
  const { isOpen } = useAppSelector((store) => store.modal);

 
  function onGridReady(params: AgGridEvent) {
    
    setGridReady(params);
  }
  return (
    <div className="ag-theme-quartz shadow-md" style={{ height: 550 }}>
      <button onClick={()=>dispatch(handleOpen())}>ADD</button>
      <AgGridReact
        defaultColDef={defaultCols}
        columnDefs={cameraColDefs}
        rowData={rowData}
        // enableAdvancedFilter={true}
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
        <ModalData updateSingleCamera={handleDataUpdate} onSubmit={createNewCameraOnSubmit} handleClick={handleClick} formData={formData}/>
        
        </Box>
      </Modal>
      <ToastContainer/>
    </div>
  );
}

export default SimpleTable;
