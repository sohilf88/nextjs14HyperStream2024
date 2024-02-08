"use client";
import "ag-grid-community/styles/ag-grid.css"; // Core CSS
import "ag-grid-community/styles/ag-theme-quartz.css"; // Theme
import { useState, useEffect } from "react";
import axios from "axios";
import SimpleTable from "@/components/Table/simpleTable";
import useColumn from "@/components/Table/useColumn";

const userDashboard = () => {
  // const [rowData, setRowData] = useState([]);
  axios.defaults.baseURL="http://localhost:5000/api/v1/";

  // const dataFromApi = async () => {
  //   const data = await axios.get("http://localhost:5000/api/v1/camera");
  //   // console.log(data.data.result)
  //   setRowData(data.data.result);
  // };

  // useEffect(() => {
  //   dataFromApi();
  // }, []);

  // const getSelectedRowsByCheckBox=(selectedRows)=>{
  //   console.log(selectedRows.api.getSelectedRows());
  // }
  return (
    <div>
      <div className="uppercase md:mx-4 px-1 sm:px-4 md:px-8 md:mt-10 xl:mt-20">
        {/* The AG Grid component */}

        <SimpleTable />
       
      </div>
    </div>
  );
};

export default userDashboard;
