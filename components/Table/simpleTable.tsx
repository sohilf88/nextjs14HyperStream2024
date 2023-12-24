import { AgGridReact } from "ag-grid-react"; // React Grid Logic
import "ag-grid-community/styles/ag-grid.css"; // Core CSS
import "ag-grid-community/styles/ag-theme-quartz.css"; // Theme
import { useState } from "react";
import { ColDef, AgGridEvent,CellValueChangedEvent,RowValueChangedEvent, RowSelectedEvent } from "ag-grid-community";
import { Modal} from "@mui/material";
import { createCamera } from "@/typescript.definations";
import { selectedCamera } from "@/reduxtoolkit/features/cameraSlice";
import { useAppDispatch, useAppSelector } from "@/reduxtoolkit/store/Hooks";
import ModalData from "@/components/ModalData";
import {handleClose} from "@/reduxtoolkit/features/ModalSlice"


function SimpleTable({
  columnDefs,
  data,
}: {
  columnDefs: ColDef[];
  data: createCamera[];
}) {
  const [defaultCols, setDefaultCols] = useState<ColDef>({
    filter: true,
    floatingFilter: true,
    flex: 1,
    
  });
  const dispatch = useAppDispatch();
  // below state is for MUI-Modal only
  const {isOpen}=useAppSelector((store)=>store.modal)

  // get selected rows and add into ReduxToolkit
  function getSelectedRowsByCheckBox(event: AgGridEvent) {
    // console.log(event);
    dispatch(selectedCamera(event.api.getSelectedRows()));
  }

  function onRowSelected(event: RowSelectedEvent) {
    console.log(event.data);
  }

  return (
    <div className="ag-theme-quartz shadow-md" style={{ height: 550 }}>
      <AgGridReact
        defaultColDef={defaultCols}
        columnDefs={columnDefs}
        rowData={data}
        // enableAdvancedFilter={true}
        rowSelection={"multiple"}
        // rowMultiSelectWithClick={true}
        pagination={true}
        onSelectionChanged={getSelectedRowsByCheckBox}
        onRowSelected={onRowSelected}
      />
       <Modal open={isOpen} onClose={()=>dispatch(handleClose())}>
        <ModalData />
      </Modal>
    </div>
  );
}

export default SimpleTable;
