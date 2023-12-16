"use client";
import { AgGridReact } from "ag-grid-react"; // React Grid Logic
import "ag-grid-community/styles/ag-grid.css"; // Core CSS
import "ag-grid-community/styles/ag-theme-quartz.css"; // Theme
import { useState, useEffect } from "react";
import axios from "axios";
import { createCamera } from "@/typescript.definations";

const AdminDashboard = () => {
  const [rowData, setRowData] = useState([]);

  const dataFromApi = async () => {
    const data = await axios.get("http://localhost:5000/api/v1/camera");
    // console.log(data.data.result)
    setRowData(data.data.result);
  };

  useEffect(() => {
    dataFromApi();
  }, []);
  // Column Definitions: Defines & controls grid columns.
  const [colDefs, setColDefs] = useState([
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
  const defaultColumns = {
    filter: true,
    floatingFilter: true,
    flex: 1,
    // rowMultiSelectWithClick:true
  };
  // const selectedROws=(getSelectedRows )=>{
  //   console.log(getSelectedRows )
  // }
  return (
    <div className="mt-5">
      <div
        className="ag-theme-quartz text-center uppercase"
        style={{ height: 550, marginLeft: "auto", marginRight: "auto" }}
      >
        {/* The AG Grid component */}
        <AgGridReact
          rowData={rowData}
          columnDefs={colDefs}
          defaultColDef={defaultColumns}
          enableAdvancedFilter={true}
          rowSelection={"multiple"}
          pagination={true}
          // onRowSelected={selectedROws}
        />
      </div>
    </div>
  );
};

export default AdminDashboard;
