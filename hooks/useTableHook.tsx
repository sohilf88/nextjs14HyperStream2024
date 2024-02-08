"use client"

import axios from "axios";
import { useState } from "react"
import { useAppDispatch, useAppSelector } from "@/reduxtoolkit/store/Hooks";
import { toast } from 'react-toastify';
import { handleClose, handleOpen,handleUpdate } from "@/reduxtoolkit/features/ModalSlice";
import { camera, createCamera } from "@/typescript.definations";

function useTableHook() {
    const dispatch = useAppDispatch();
    const initialState={
    _id:"",
    name:"",
    district:"",
    taluka:"",
    city:"",
    area:"",
    url:""
  }
    // rowData is used to fill the userTable 
    const [rowData, setRowData] = useState([]);
    // modal table data using formData
    const [formData,setFormData]=useState(initialState)

//   handleClick is used to get data from modal Input
  function handleClick(e: React.ChangeEvent<HTMLInputElement>){
    setFormData({
      ...formData,
    
    [e.target.name]:e.target.value
    })

  }
// fetch All Camera Details from backend database 
   const getAllCameraDataFromBackEnd = async () => {
    const data = await axios.get("camera");
    // console.log(data.data.result)
    setRowData(data.data.result);
  };

//   this is used to create new Camera detail
  async function createNewCameraOnSubmit(e: React.ChangeEvent<HTMLInputElement>){
    e.preventDefault()
   
    try {
       const response= await axios.post("camera/",{
        name:formData.name,
        district:formData.district,
        taluka:formData.taluka,
        area:formData.area,
        city:formData.city,
        url:formData.url
      })
       dispatch(handleClose())
      if(response.status===200){
        getAllCameraDataFromBackEnd()
        setFormData(initialState)
       
      }
        
    } catch (error) {
      const errorResult = (error as Error).message;
    //   console.log(errorResult)
      toast.error(errorResult)
      
      
    }
    
  }

  async function deleteSingleCamera(_id:string){

        try {
       const response= await axios.delete(`camera/${_id}`)
       
      if(response.status===200){
        
        getAllCameraDataFromBackEnd()
       

        
        
        
      }
        
    } catch (error) {
      const errorResult = (error as Error).message;
    //   console.log(errorResult)
      toast.error(errorResult)
      
    }
    
  }

  async function updateSingleCamera(data:camera){

        try {
       const response= await axios.patch(`camera/${data._id}`,{
        name:data.name,
        district:data.district,
        taluka:data.taluka,
        area:data.area,
        city:data.city,
        url:data.url
       })
       
      if(response.status===200){
        
        getAllCameraDataFromBackEnd()
    
      }
        
    } catch (error) {
      const errorResult = (error as Error).message;
    //   console.log(errorResult)
      toast.error(errorResult)
      
    }
    
  }

   function handleDataUpdate (previousData:createCamera)  {
    setFormData(previousData)
    dispatch(handleOpen())
    dispatch(handleUpdate())
  }
  return [rowData,formData,getAllCameraDataFromBackEnd,createNewCameraOnSubmit,handleClick,handleDataUpdate,deleteSingleCamera]
    
  
}

export default useTableHook