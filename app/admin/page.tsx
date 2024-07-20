"use client"

import { useState,useEffect } from "react";
import { axiosAuth } from "../lib/axios";
import Link from "next/link";
import { user } from "@/typescript.definations";

import { errorHandler } from "@/hooks/useTableHook";
import { Modal,IconButton, Button, Typography, Box, Input } from "@mui/material";
import CameraTwoToneIcon from '@mui/icons-material/CameraTwoTone';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import PasswordTwoToneIcon from '@mui/icons-material/PasswordTwoTone';
import { useAppDispatch, useAppSelector } from "@/reduxtoolkit/store/Hooks";
import { handleClose, handleOpen } from "@/reduxtoolkit/features/ModalSlice";
import AdminModal from "@/components/adminModal";
import ChangeProfile from "@/components/modalTabs";
function admin() {
  const [users,setUsers]=useState([])
  // const [username,setUsername]=useState("")
  // const [email,setEmail]=useState("")
  const [open,setIsopen]=useState(false)
  const [user,setUser]=useState("")
  const [id,setId]=useState("")
 

const getAllUsers=async()=>{
 const response=await axiosAuth.get("/admin/users")
//  console.log(response.data)
 if(response.data){
  setUsers(response.data)
 }
}
useEffect(()=>{
  getAllUsers()
},[])


async function getUserDetail(userid:string){
   
  try {
     const userDetail=await axiosAuth.get(`/admin/users/${userid}`)
     console.log(userDetail.data)
     if(userDetail.data){
      setUser(userDetail.data.message)
      setId(userid)
      setIsopen(true)

     }
  } catch (error) {
    errorHandler(error)
  }
 
 
}

console.log(user)
// const dispatch=useAppDispatch()
// const { isOpen } = useAppSelector((store) => store.root.modal);
return (
  <main className="text-slate-300 bg-zinc-700">
    <section className="mb-10 lg:py-8 sticky inset-0 bg-zinc-800 z-[1000] shadow-lg drop-shadow-2xl shadow-[#a6fd29] hover:shadow-[#FFD300]">
      <div className="text-ellipsis text-center lg:py-2 lg:text-2xl">Administrator Dashboard</div>
    </section>
   <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-3 md:gap-4 lg:mx-8 mx-4 md:mx-6">
    {
      users && users.map((user:user)=>(
        <form
        className=" bg-zinc-800 h-64 text-yellow-50  flex flex-col px-5 py-5 gap-y-5   transition-all duration-200 xl:hover:scale-[1.01] last:mb-10  drop-shadow shadow-[#a6fd29] shadow-inner hover:shadow-[#00f6ff]  "
         key={user._id}>
          <div className="flex justify-between">
          <Typography variant="h6" className="px-2 py-1 text-lg font-semibold text-center flex-1">{`User ${user.username} Profile `}</Typography>
          <button type="button" value={user._id} onClick={(e)=>getUserDetail(e.currentTarget.value)}>Edit</button>
          </div>
          
         <div><strong>Username:- </strong>{user.username}</div>
         <div><strong>E-mail:- </strong>{user.email}</div>
         <div><strong>Roles:- </strong>{user.roles}</div>
         <div>
          
            
          <div className="flex items-center justify-end gap-4">
          <Link className="flex   items-center gap-1" href={`/dashboard/${user._id}`}>
            
           <CameraTwoToneIcon fontSize="small" className=" text-white "/><Typography>Get Camera </Typography>
          </Link>
          
          <Button color="error" size="small" variant="text" startIcon={<PasswordTwoToneIcon /> }  >

            Reset password
          </Button> 
          </div>
         
          </div>
         
           
          </form>

      ))
    }
  
   </section>
   
     <Modal open={open} onClose={() =>setIsopen(false)}>
      <Box>
        <ChangeProfile getAllUsers={getAllUsers} id={id} user={user} open={open} setIsopen={setIsopen}/>
        </Box>
       </Modal>
   
  </main>
)
}

export default admin;
