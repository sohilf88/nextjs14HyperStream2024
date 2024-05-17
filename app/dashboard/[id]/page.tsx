"use client"
import "ag-grid-community/styles/ag-grid.css"; // Core CSS
import "ag-grid-community/styles/ag-theme-quartz.css"; // Theme
import SimpleTable from "@/components/Table/simpleTable";
import Header2 from "@/components/Header2";
import ResponsiveAppBar from "@/components/Header";
import useTableHook from "@/hooks/useTableHook";
import { axiosAuth } from "@/app/lib/axios";
import { useEffect, useState } from "react";
import { useAppDispatch } from "@/reduxtoolkit/store/Hooks";
import { getUserId } from "@/reduxtoolkit/features/cameraSlice";




const userDashboard = ({params}:any) => {
const [data,setData]=useState([])
  const {id}=params
  
const dispatch=useAppDispatch()
   
dispatch(getUserId(id))
//   async function getUserCamera(){
    
    
// //     if(id){
// //       const response=await axiosAuth.get(`/admin/cameras/specific?userId=${id}`)
// //       if(response.data){
// //         setData(response.data)
// //          console.log(response.data)
        
       
// //       }
// //     }
// //   }
// useEffect(()=>{
// getUserCamera()
// },[])
return (
    <div>
      <ResponsiveAppBar></ResponsiveAppBar>
      {/* <Header2></Header2> */}
      <div className="uppercase md:mx-4 px-1 sm:px-4 md:px-8 md:mt-2 xl:mt-7  ">
        {/* The AG Grid component */}
       
        <SimpleTable rowData={data}/>
       
      </div>
     
    
    </div>
  );
};

export default userDashboard;
