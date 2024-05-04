"use client"
import { useState } from "react"
import { useAppDispatch, useAppSelector } from "@/reduxtoolkit/store/Hooks";

import { handleClose, handleOpen,handleUpdate } from "@/reduxtoolkit/features/ModalSlice";
import { camera } from "@/typescript.definations";
import { axiosAuth } from "@/app/lib/axios";
import { AxiosError, isAxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from 'sonner';





function useTableHook() {
  const router=useRouter()
  
  
    const dispatch = useAppDispatch();
    const initialState={
    _id:"",
    name:"",
    district:"",
    taluka:"",
    city:"",
    area:"",
    url:"",
    isActive:true
  }
    // rowData is used to fill the userTable 
    const [rowData, setRowData] = useState<camera[] | []>([]);
    // modal table data using formData
    const [formData,setFormData]=useState(initialState)

//   handleClick is used to get data from modal Input
  function handleClick(e: React.ChangeEvent<HTMLInputElement>){
    console.log(e.target.name,e.target.value)
    setFormData({
      ...formData,
     
    [e.target.name]:e.target.value
    })

  }
  
// fetch All Camera Details from backend database 
   const getAllCameraDataFromBackEnd = async () => {
    try {
        const response=await axiosAuth.get("/camera")
        
        console.log(response.data)
    
        setRowData(response.data.message);
      
    } catch (error) {
      if (isAxiosError(error)){
        console.log(error.response?.statusText)
      }
      // const errorResult = (error as AxiosError);
      // if(!errorResult.response)
      //  toast.error("Connectivity Error to Backend")
      
    }
    
  };

//   this is used to create new Camera or update exisiting camera detail
  async function handleFormSubmit(){
    
       try {

      if(formData._id){
        const response= await axiosAuth.patch(`camera/${formData._id}`,{
        name:formData.name,
        district:formData.district,
        taluka:formData.taluka,
        area:formData.area,
        city:formData.city,
        url:formData.url
       })
       
      if(response.status===200){
        
        await getAllCameraDataFromBackEnd()
        dispatch(handleClose())
        dispatch(handleUpdate(false))
    
      }

      }else{
        const response= await axiosAuth.post("camera",{
        name:formData.name,
        district:formData.district,
        taluka:formData.taluka,
        area:formData.area,
        city:formData.city,
        url:formData.url
      })
       dispatch(handleClose())
      if(response.status===200){
        await getAllCameraDataFromBackEnd()
        setFormData(initialState)
       
      }
        
      }
       
        
    } catch (error) {
      const errorResult = (error as AxiosError);
      
      toast.success(errorResult?.response?.data?.message)
      
      
    }
    
  }

  async function deleteSingleCamera(_id:string){

        try {
       const response= await axiosAuth.delete(`camera/${_id}`)
       
      if(response.status===200){
        
         getAllCameraDataFromBackEnd()
        
      }
        
    } catch (error) {
      const errorResult = (error as AxiosError);
      
      toast.error(errorResult.message)
        

      
      
    }
    
  }

  
// this function is used to get previous data from AG Grid event in Action Component 
   function handleDataUpdateOnEditButton (paramsPreviousData:any)  {
    
    setFormData(paramsPreviousData)
    dispatch(handleOpen())
    dispatch(handleUpdate(true))
  }
  return [rowData,formData,getAllCameraDataFromBackEnd,handleFormSubmit,handleClick,handleDataUpdateOnEditButton,deleteSingleCamera]
    
  
}

export default useTableHook