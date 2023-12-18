import { ColDef } from "ag-grid-community";
import { useState } from "react";

function useColumn() {
  
  const [cameraColDefs, setCameraColDefs] = useState<ColDef[]>([
    {
      field: "name",
      headerName: "Name",
      editable: true,
      checkboxSelection: true,
      headerCheckboxSelection: true,
      
    },
    { field: "district", headerName: "District" },
    { field: "taluka", headerName: "Taluka" },
    { field: "city", headerName: "City" },
    { field: "area" },
  ]);
  return [cameraColDefs]
}

export default useColumn



  

  

  

 



