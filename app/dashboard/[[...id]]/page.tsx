"use client"
import "ag-grid-community/styles/ag-grid.css"; // Core CSS
import "ag-grid-community/styles/ag-theme-quartz.css"; // Theme
import SimpleTable from "@/components/Table/simpleTable";

import ResponsiveAppBar from "@/components/Header";
import useTableHook from "@/hooks/useTableHook";
import { axiosAuth } from "@/app/lib/axios";
import { useEffect, useState } from "react";
import { useAppDispatch } from "@/reduxtoolkit/store/Hooks";
import { getUserId } from "@/reduxtoolkit/features/cameraSlice";


type paramsType={
  params:{
    id:string
  }
}

const userDashboard = ({params}:paramsType) => {

const {id}=params
  
const dispatch=useAppDispatch()
   
dispatch(getUserId(id))

return (
    <div>
      <ResponsiveAppBar></ResponsiveAppBar>
      {/* <Header2></Header2> */}
      <div className="uppercase md:mx-4 px-1 sm:px-4 md:px-8 md:mt-2 xl:mt-7  ">
        {/* The AG Grid component */}
       
        <SimpleTable/>
       
      </div>
     
    
    </div>
  );
};

export default userDashboard;
