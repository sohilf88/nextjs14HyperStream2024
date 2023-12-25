import { ColDef } from "ag-grid-community";
import { useState } from "react";
import Actions from "./Actions";

function useColumn() {
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
      cellRenderer: () => {
        return <Actions />;
      },
    },
  ]);
  return [cameraColDefs];
}

export default useColumn;
