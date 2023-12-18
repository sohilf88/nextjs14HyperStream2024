import { AgGridReact } from "ag-grid-react"; // React Grid Logic
import "ag-grid-community/styles/ag-grid.css"; // Core CSS
import "ag-grid-community/styles/ag-theme-quartz.css"; // Theme
import { useState } from "react";
import { ColDef ,AgGridEvent} from "ag-grid-community";
import { createCamera } from "@/typescript.definations";
import { selectedCamera } from "@/reduxtoolkit/features/cameraSlice";
import { useAppDispatch } from "@/reduxtoolkit/store/Hooks";

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

  // get selected rows and add into ReduxToolkit
  function getSelectedRowsByCheckBox(event:AgGridEvent) {
    // console.log(event);
    dispatch(selectedCamera(event.api.getSelectedRows()));
  }
  return (
    <div className="ag-theme-quartz shadow-md" style={{ height: 550 }}>
      <AgGridReact
        defaultColDef={defaultCols}
        columnDefs={columnDefs}
        rowData={data}
        // enableAdvancedFilter={true}
        rowSelection={"multiple"}
        rowMultiSelectWithClick={true}
        pagination={true}
        onSelectionChanged={getSelectedRowsByCheckBox}
      />
    </div>
  );
}

export default SimpleTable;
