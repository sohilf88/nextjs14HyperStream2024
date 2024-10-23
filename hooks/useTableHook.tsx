"use client"
import { useState } from "react"
import { useAppDispatch, useAppSelector } from "@/reduxtoolkit/store/Hooks";

import { handleClose, handleOpen,handleUpdate } from "@/reduxtoolkit/features/ModalSlice";
import { camera } from "@/typescript.definations";
import { axiosAuth } from "@/app/lib/axios";
import axios, {  isAxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from 'sonner';


export function errorHandler(error:unknown){
  // console.log(error)
  if(isAxiosError(error) && error.response?.data){
    
          if( error.response?.status===400 || error.response?.status===401 ||error.response?.status===403|| error.response?.status===404 || error.response?.status===500){
            // const errorResponse = error.response.data
          return  toast.error(error.response.data.message)
          }
           
          // else if(error.response?.data.status===401){
          // return toast.info(error.response.data.message)
          // }
          else if(error.response?.status===429){
            // console.log("error")
          return toast.warning(error.response.data)
          }
          else if(error.response?.status===409){
            // console.log("error")
          return toast.warning(error.response.data.message)
          }
             
             
          
}else{
            const errorMessage=error as Error
            toast.error(errorMessage.message)
          }
}

function useTableHook() {
  const {id}=useAppSelector((store)=>store.root.cameras)

  const {role}=useAppSelector((store)=>store.root.userRole)
  // const [roles,setRoles]=useState("user")

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
    const [formData,setFormData]=useState<camera  >(initialState)

//   handleClick is used to get data from modal Input
  function handleClick(e: React.ChangeEvent<HTMLInputElement>){
    // console.log(e.target.name,e.target.value)
    setFormData({
      ...formData,
     
    [e.target.name]:e.target.value
    })

  }
  
// fetch All Camera Details from backend database 
   const getAllCameraDataFromBackEnd = async () => {
    let userRole=["root","admin"]


    // console.log(id, role)
    try {
      if(role==="root" && !id){
        const response=await axiosAuth.get(`admin/cameras/all`)
        
      //  console.log(response.data)
        setRowData(response.data.message);
      }
      else if(role==="root" && id){
        const response=await axiosAuth.get(`admin/cameras/specific?userId=${id}`)
        
      //  console.log(response.data)
        setRowData(response.data.message);
      // }else if(userRole.includes(role) && id?.[0]==="disabled"){
      //   const response=await axiosAuth.get(`/camera?isActive=false`)
      //   setRowData(response.data.message);
      }
       
      else {
        const response=await axiosAuth.get(`/camera?isActive=true`)
        
        // console.log(response.data)
        setRowData(response.data.message);
      }
        
        
      
    } catch (error) {
      errorHandler(error)
      
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
        setFormData(initialState)
  
    
      }

      }else{
        const response= await axiosAuth.post("/camera",{
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
      errorHandler(error)
       
    }
    
  }

  // disable camera and move into trash
  async function deleteSingleCamera(_id:string){

        try {
       const response= await axiosAuth.delete(`/camera/${_id}`)
       
      if(response.status===200){
        
         getAllCameraDataFromBackEnd()
        
      }
        
    } catch (error) {
      errorHandler(error)
    
    }
    
  }
// disable selected Cameras in 
async function disableSelectedCamera(_id:string){
        console.log("function triggerCamera")
        try {
       const response= await axiosAuth.patch(`/camera/disable/${_id}`,{isActive:false})
       
      if(response.data?.success){
        
         getAllCameraDataFromBackEnd()
         toast.success(response.data.message)
        
      }
        
    } catch (error) {
      errorHandler(error)
    
    }
    
  }

// this function is used to get previous data from AG Grid event in Action Component 
   function handleDataUpdateOnEditButton (paramsPreviousData:any)  {
    
    setFormData(paramsPreviousData)
    dispatch(handleOpen())
    dispatch(handleUpdate(true))
  }
  return [rowData,formData,getAllCameraDataFromBackEnd,handleFormSubmit,handleClick,handleDataUpdateOnEditButton,deleteSingleCamera,setFormData,setRowData,disableSelectedCamera]
    
  
}

export default useTableHook