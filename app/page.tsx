"use client";
import "ag-grid-community/styles/ag-grid.css"; // Core CSS
import "ag-grid-community/styles/ag-theme-quartz.css"; // Theme

import axios from "axios";
import SimpleTable from "@/components/Table/simpleTable";



const userDashboard = () => {

  axios.defaults.baseURL="http://localhost:5000/api/v1/";

   return (
    <div>
      <div className="uppercase md:mx-4 px-1 sm:px-4 md:px-8 md:mt-2 xl:mt-7 3xl:mt-20 ">
        {/* The AG Grid component */}

        <SimpleTable />
       
      </div>
    </div>
  );
};

export default userDashboard;
