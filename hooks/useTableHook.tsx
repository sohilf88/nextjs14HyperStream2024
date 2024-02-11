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
    try {
        const data = await axios.get("camera");
    // console.log(data.data.result)
        setRowData(data.data.result);
      
    } catch (error) {
      const errorResult = (error as Error).message;
    //   console.log(errorResult)
      toast.error(errorResult)
    }
    
  };

//   this is used to create new Camera or update exisiting camera detail
  async function handleFormSubmit(){
    
   
    try {

      if(formData._id){
        const response= await axios.patch(`camera/${formData._id}`,{
        name:formData.name,
        district:formData.district,
        taluka:formData.taluka,
        area:formData.area,
        city:formData.city,
        url:formData.url
       })
       
      if(response.status===200){
        
        getAllCameraDataFromBackEnd()
        dispatch(handleClose())
        dispatch(handleUpdate(false))
    
      }

      }else{
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

  
// this function is used to get previous data from AG Grid event in Action Component 
   function handleDataUpdateOnEditButton (paramsPreviousData)  {
    setFormData(paramsPreviousData)
    dispatch(handleOpen())
    dispatch(handleUpdate(true))
  }
  return [rowData,formData,getAllCameraDataFromBackEnd,handleFormSubmit,handleClick,handleDataUpdateOnEditButton,deleteSingleCamera]
    
  
}

export default useTableHook