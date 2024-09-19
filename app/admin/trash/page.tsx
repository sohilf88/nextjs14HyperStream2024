"use client"

import { useState,useEffect } from "react";

import Link from "next/link";
import { user, usersData } from "@/typescript.definations";

import { errorHandler } from "@/hooks/useTableHook";
import { Modal,IconButton, Button, Typography, Box, Input, TextField, Fab } from "@mui/material";

import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import NoAccountsTwoToneIcon from '@mui/icons-material/NoAccountsTwoTone';
import VideoCameraFrontTwoToneIcon from '@mui/icons-material/VideoCameraFrontTwoTone';

import KeyboardReturnTwoToneIcon from '@mui/icons-material/KeyboardReturnTwoTone';

import ChangeProfile from "@/components/modalTabs";
import {  isAxiosError } from "axios";
import AccessDenied from "@/components/http403";

import Header from "@/components/Header";
import { toast } from "sonner";
import { axiosAuth } from "@/app/lib/axios";
function trash() {
  const [users,setUsers]=useState<usersData>()
  // const [username,setUsername]=useState("")
  const [email,setEmail]=useState("")
  const [open,setIsopen]=useState(false)
  const [clear,setClear]=useState(false)
  const [errorState,setErrorState]=useState(false)
  const [user,setUser]=useState("")
  
 
// get disable users by use of isActive:false
const getAllDisableUsers=async()=>{
  try {
  const response=await axiosAuth.get("/admin/users?isActive=false")

  // console.log(response.data?.message.length!==0)

 if(response.data){
  setUsers(response.data)
 
}

  } catch (error) {
    // console.log(error)
  //  need to add error status condition below
    if(isAxiosError(error) && error.response?.status===401){
     setErrorState(!errorState)
    }
    
  }
}

// fetch users on page load
useEffect(()=>{
  getAllDisableUsers()
},[])

// get user detail on edit icon function

async function getUserDetail(userid:string){
   
  try {
     const userDetail=await axiosAuth.get(`/admin/users/${userid}`)
    
     if(userDetail.data){
      setUser(userDetail.data.message)
      
      setIsopen(true)

     }
  } catch (error) {
    errorHandler(error)
  }
 
 
}
// search user by email id function
async function onSubmit(e:React.FormEvent<HTMLFormElement>){
  e.preventDefault()
  const response=await axiosAuth.get(`/admin/users?isActive=false&email=${email}`)
  setClear(!clear)
  if(response.data){
    setUsers(response.data)
  }
}

// console.log(user)
async function onClickDelete(userid:string){
  try {
     const response=await axiosAuth.delete(`/admin/users/${userid}`)
     if(response.data){
      // toast.success(response.data.message)
      toast.error(response.data.message)
      await getAllDisableUsers()
     }
    // console.log(response)
  } catch (error) {
    console.log(error)
    errorHandler(error)
  }

  // Restore function

  
 
 
 
  
}

async function onClickRestoreUser(userid:string){
  try {
     const response=await axiosAuth.patch(`/admin/users/${userid}`,{isActive:true})
     if(response.data){
      toast.success(response.data.message)
      await getAllDisableUsers()
     }
    // console.log(response)
  } catch (error) {
    // console.log(error)
    errorHandler(error)
  }

  // Restore function

    
}
// clear search button function

async function onClickClearButton(){
  setEmail("")
  setClear(!clear)
 await getAllDisableUsers()
}

return (
  !errorState?(
    <>
       <Header/>
    
  <main className="text-slate-300 bg-slate-800 h-screen px-10 py-5 w-full">
 


   
    
   <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-3 md:gap-4 lg:mx-8 mx-4 md:mx-6 ">
  <div className="col-span-full flex items-center gap-3">
  

  <form className="mb-5 w-full " onSubmit={onSubmit}>
    <div className="w-full">
      <div className="flex space-x-1 mb-2 items-center justify-between">
        <div>

        {/* <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg> */}
        <p className="text-white text-lg font-semibold">Search User with E-mail</p>
        </div>
        <div className=" text-white flex items-center lg:gap-5 text-lg font-semibold" >
        
        <Button color="inherit" size="large" startIcon={<KeyboardReturnTwoToneIcon/>} component={Link} className="text-lg font-semibold hover:text-red-600"  href="/admin">back</Button>
        {/* <Link className="text-lg font-semibold hover:text-green-500"  href="/admin/signup"><PersonAddAltTwoToneIcon></PersonAddAltTwoToneIcon> New User</Link> */}
        </div>
        
      </div>
      <div className="flex space-x-4  ">
        <div className="flex rounded-md overflow-hidden w-full gap-2">
          <input  required value={email} onChange={(e)=>setEmail(e.target.value)} type="email" className=" text-zinc-700 pl-4 w-full rounded-md rounded-r-none placeholder:pl-4 max-w-2xl" placeholder="Search user with Email Address" />
          <button type="submit" className="bg-indigo-600 text-white px-6 text-lg font-semibold py-3 rounded-r-md">Go</button>
          <button disabled={!clear} onClick={onClickClearButton} type="button" className=" disabled:bg-red-300 bg-red-500 disabled:hover:cursor-not-allowed px-6 text-lg font-semibold py-2 rounded-md">Clear</button>
        </div>
        
         


        
      </div>
    </div>
  </form>
 
 
    </div>
    
   
   
      {(users?.message.length !==0) ? (users?.message.map((user:user)=>(
        <form
        className=" rounded-sm bg-slate-600 text-yellow-50 text-lg  flex flex-col px-5 py-5 gap-y-5   transition-all duration-100 xl:hover:scale-[1.01] last:mb-10 shadow-2xl h-full"
         key={user._id}>
          <div className="flex justify-between">
          <Typography variant="h5" className="px-2 py-1 font-semibold text-center flex-1">{`${user.username}'s Profile `}</Typography>
          {/* <button type="button" value={user._id} onClick={(e)=>getUserDetail(e.currentTarget.value)}>Edit</button> */}
          <IconButton color="warning"  aria-label="edit" type="button" value={user._id} onClick={(e)=>getUserDetail(e.currentTarget.value)}>
  <EditTwoToneIcon />
</IconButton>
          </div>
          
        
         <div className="text-2xl"><strong>Username:- </strong>{user.username}</div>
         <div className="text-2xl"><strong>E-mail:- </strong>{user.email}</div>
         <div className="text-2xl"><strong>Roles:- </strong>{user.roles}</div>
         <div className="  text-2xl  flex items-center  justify-end gap-2">
         

         <Button color="error" variant="contained" type="button" value={user._id} onClick={(e)=>onClickDelete(e.currentTarget.value)} startIcon={<NoAccountsTwoToneIcon/>}>delete forever</Button>
         <Button variant="contained" component={Link} href={`/dashboard/${user._id}`} color="success" startIcon={<VideoCameraFrontTwoToneIcon/>}>cameras</Button>
          <Button value={user._id} type="button"  variant="text" color="warning" startIcon={<VideoCameraFrontTwoToneIcon/>}
          onClick={(e)=>onClickRestoreUser(e.currentTarget.value)}
          >Restore</Button>
         </div>
         
        
         
         {/* <div className="">
          
            
          <div className="flex items-center justify-end gap-4">
          <Link className="flex   items-center gap-1" href={`/dashboard/${user._id}`}>
            
           <CameraTwoToneIcon fontSize="small" className=" text-white "/><Typography>cameras</Typography>
          </Link>
          
           
          </div>
         
          </div>
          */}
           
          </form>

      ))):(<div className="md:text-2xl flex items-center w-full uppercase  lg:text-3xl"> <span className="text-7xl">🤪</span> No disabled user</div>)}
    
  
   </section>
   
      <Modal open={open} onClose={() =>setIsopen(false)}>
      <Box>
        <ChangeProfile getAllUsers={getAllDisableUsers} user={user} open={open} setIsopen={setIsopen}/>
        </Box>
       </Modal> 
   
  </main>
  </>
  ):(<AccessDenied/>)
)

}

export default trash;
