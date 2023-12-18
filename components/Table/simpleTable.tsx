import { AgGridReact } from "ag-grid-react"; // React Grid Logic
import "ag-grid-community/styles/ag-grid.css"; // Core CSS
import "ag-grid-community/styles/ag-theme-quartz.css"; // Theme
import { useState } from "react";
import { ColDef } from "ag-grid-community";

function SimpleTable({columnDefs,data}) {
const [defaultCols, setDefaultCols] = useState<ColDef>({
    filter: true,
    floatingFilter: true,
    flex: 1,
  });

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
        sideBar={true}
        suppressMenuHide={true}
      />
    </div>
  );
}

export default SimpleTable;
