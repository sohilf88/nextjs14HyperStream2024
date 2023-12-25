import { AgGridReact } from "ag-grid-react"; // React Grid Logic
import "ag-grid-community/styles/ag-grid.css"; // Core CSS
import "ag-grid-community/styles/ag-theme-quartz.css"; // Theme
import { ColDef, AgGridEvent, RowSelectedEvent } from "ag-grid-community"; //typeScript for ag grid
import { useState } from "react";

import { Modal } from "@mui/material";
import { createCamera } from "@/typescript.definations";
import {
  selectedCamera,
  onRowSelected,
} from "@/reduxtoolkit/features/cameraSlice";
import { useAppDispatch, useAppSelector } from "@/reduxtoolkit/store/Hooks";
import ModalData from "@/components/ModalData";
import { handleClose } from "@/reduxtoolkit/features/ModalSlice";

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
  const { isOpen } = useAppSelector((store) => store.modal);

  // get no.of selected rows and add into ReduxToolkit
  function getSelectedRowsByCheckBox(event: AgGridEvent) {
    // console.log(event);
    dispatch(selectedCamera(event.api.getSelectedRows()));
  }
  // select single row for and display into modal via ReduxToolkit Camera Slice with Reducer onRowSelected
  function onRowSelectedFunction(event: RowSelectedEvent) {
    dispatch(onRowSelected(event.data));
    // console.log(event.data);
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
        onRowSelected={onRowSelectedFunction}
      />
      <Modal open={isOpen} onClose={() => dispatch(handleClose())}>
        <ModalData />
      </Modal>
    </div>
  );
}

export default SimpleTable;
