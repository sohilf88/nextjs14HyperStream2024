"use client"

import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import NoAccountsTwoToneIcon from '@mui/icons-material/NoAccountsTwoTone';
import PeopleAltTwoToneIcon from '@mui/icons-material/PeopleAltTwoTone';

import { useState,useEffect } from "react";
import { axiosAuth } from "../lib/axios";
import Link from "next/link";
<<<<<<< HEAD
import { user, usersData } from "@/typescript.definations";
=======
import { user, userDetail, usersData } from "@/typescript.definations";
>>>>>>> 15-formImprovement
import PersonAddAltTwoToneIcon from '@mui/icons-material/PersonAddAltTwoTone';
import AutoDeleteTwoToneIcon from '@mui/icons-material/AutoDeleteTwoTone';
import { errorHandler } from "@/hooks/useTableHook";222
import { Modal,IconButton, Button, Typography, Box, Input, TextField, Fab } from "@mui/material";
import CameraTwoToneIcon from '@mui/icons-material/CameraTwoTone';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';

import VideoCameraFrontTwoToneIcon from '@mui/icons-material/VideoCameraFrontTwoTone';
import UnfoldMoreDoubleTwoToneIcon from '@mui/icons-material/UnfoldMoreDoubleTwoTone';
import Badge from '@mui/material/Badge';

import ChangeProfile from "@/components/modalTabs";
import {  isAxiosError } from "axios";
import AccessDenied from "@/components/http403";

import Header from "@/components/Header";
import { toast } from "sonner";
import SettingsTwoToneIcon from '@mui/icons-material/SettingsTwoTone';


function admin() {
  
  const [users,setUsers]=useState<usersData>({success:false,message:[],totalUsers:0})
  // const [username,setUsername]=useState("")
  const [email,setEmail]=useState("")
  const [open,setIsopen]=useState(false)
  const [clear,setClear]=useState(false)
  const [errorState,setErrorState]=useState(false)
  const [userData,setUserData]=useState<user>(
    
  )
  // const [id,setId]=useState("")
 

const getAllUsers=async()=>{
  try {
  const response=await axiosAuth.get("/admin/users?isActive=true")
  // console.log(response.data)

 if(response.data){
  setUsers(response.data)
 
}

  } catch (error) {
    // console.log(error)
  //  need to add error status condition below
    if(isAxiosError(error) && error.response?.status===403){
     setErrorState(!errorState)
    }
    
  }
}
useEffect(()=>{
  getAllUsers()
},[])

// console.log(users)
async function getUserDetail(userid:string){
   
  try {
     const userDetail=await axiosAuth.get(`/admin/users/${userid}`)
    // console.log(userDetail)
     if(userDetail.data){
      setUserData(userDetail.data.message)
      
      setIsopen(true)

     }
  } catch (error) {
    errorHandler(error)
  }
 
 
}

async function onSubmit(e:React.FormEvent<HTMLFormElement>){
  e.preventDefault()
  const response=await axiosAuth.get(`/admin/users?isActive=true&email=${email}`)
  setClear(!clear)
  if(response.data){
    setUsers(response.data.message)
  }
}

// console.log(user)
async function onClickAndDisable(userid:string){
  try {
     const response=await axiosAuth.patch(`/admin/users/${userid}`,{isActive:false})
     if(response.data){
      toast.success(response.data.message)
      await getAllUsers()
     }
    // console.log(response)
  } catch (error) {
    // console.log(error)
    errorHandler(error)
  }
 
 
 
  
}
async function onClickClearButton(){
  setEmail("")
  setClear(!clear)
 await getAllUsers()
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
          <span><Typography><AssignmentIndIcon/>{" "}TOTAL-<span>{users.totalUsers}</span></Typography></span>
          <span><Typography><PeopleAltTwoToneIcon/>{" "}ACTIVE-{(Number(users.message.length))}</Typography></span>
          <span><Typography><NoAccountsTwoToneIcon/>{" "}INACTIVE-{Number(users.totalUsers)-(Number(users.message.length))}</Typography></span>
        <Badge  badgeContent={Number(users.totalUsers)-(Number(users.message.length))} color="success" >
        <Button variant="contained" color="secondary" startIcon={<AutoDeleteTwoToneIcon/>} component={Link} className=""  href="/admin/trash">trash</Button>
        </Badge>
        <Button variant="contained" color="success"  startIcon={<PersonAddAltTwoToneIcon/>} component={Link} className="text-lg font-semibold hover:text-green-600"  href="/admin/signup">new user</Button>
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
    
   
    {
      users.message ? users.message?.map((user:user)=>(
        <form
        className=" rounded-sm bg-slate-600 text-yellow-50 text-lg  flex flex-col px-5 py-5 gap-y-5   transition-all duration-100 xl:hover:scale-[1.01] last:mb-10 shadow-2xl h-full"
         key={user._id}>
          <div className="flex justify-between">
          <Typography variant="h5" className="px-2 py-1 font-semibold text-center flex-1">{`${user.username}'s Profile `}</Typography>
          {/* <button type="button" value={user._id} onClick={(e)=>getUserDetail(e.currentTarget.value)}>Edit</button> */}
          <IconButton  color="inherit" size="large"  aria-label="edit" type="button" value={user._id} onClick={(e)=>getUserDetail(e.currentTarget.value)}>
  <EditTwoToneIcon />
</IconButton>
          </div>
          
        
         <div className="text-2xl"><strong>Username:- </strong>{user.username}</div>
         <div className="text-2xl"><strong>E-mail:- </strong>{user.email}</div>
         <div className="text-2xl"><strong>Roles:- </strong>{user.roles}</div>
         <div className="  text-2xl  flex items-center  justify-end gap-2">
         

         <Button color="secondary" variant="contained" type="button" value={user._id} onClick={(e)=>onClickAndDisable(e.currentTarget.value)} startIcon={<NoAccountsTwoToneIcon/>}>disable account</Button>
         <Button variant="contained" component={Link} href={`/dashboard/${user._id}`} color="success" startIcon={<VideoCameraFrontTwoToneIcon/>}>cameras</Button>
         </div>
<<<<<<< HEAD
         
        
         
      
           
          </form>
=======
        </form>
>>>>>>> 15-formImprovement

      )):<><div className="bg-white w-full h-full">No Access</div></>
    }
  
   </section>
   
     <Modal open={open} onClose={() =>setIsopen(false)}>
      <Box>
        {/* @ts-ignore */}
        <ChangeProfile getAllUsers={getAllUsers} userData={userData} open={open} setIsopen={setIsopen}/>
        </Box>
       </Modal>
   
  </main>
  </>
  ):(<AccessDenied/>)
)

}

export default admin;
