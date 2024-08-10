"use client"

import { useState,useEffect } from "react";
import { axiosAuth } from "../lib/axios";
import Link from "next/link";
import { user } from "@/typescript.definations";

import { errorHandler } from "@/hooks/useTableHook";
import { Modal,IconButton, Button, Typography, Box, Input, TextField, Fab } from "@mui/material";
import CameraTwoToneIcon from '@mui/icons-material/CameraTwoTone';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';


import ChangeProfile from "@/components/modalTabs";
function admin() {
  const [users,setUsers]=useState([])
  // const [username,setUsername]=useState("")
  const [email,setEmail]=useState("")
  const [open,setIsopen]=useState(false)
  const [clear,setClear]=useState(false)
  const [user,setUser]=useState("")
  // const [id,setId]=useState("")
 

const getAllUsers=async()=>{
  try {
const response=await axiosAuth.get("/admin/users")
 console.log(response)
 if(response.data){
  setUsers(response.data)
 
}
  } catch (error) {
    errorHandler(error)
  }
}
useEffect(()=>{
  getAllUsers()
},[])

// onsole.log(users)
async function getUserDetail(userid:string){
   
  try {
     const userDetail=await axiosAuth.get(`/admin/users/${userid}`)
    //  console.log(userDetail.data)
     if(userDetail.data){
      setUser(userDetail.data.message)
      // setId(userid)
      setIsopen(true)

     }
  } catch (error) {
    errorHandler(error)
  }
 
 
}

async function onSubmit(e:React.HTMLFormElement){
  e.preventDefault()
  const response=await axiosAuth.get(`/admin/users?email=${email}`)
  setClear(!clear)
  if(response.data){
    setUsers(response.data)
  }
}

async function onClickClearButton(){
  setEmail("")
  setClear(!clear)
 await getAllUsers()
}
// console.log(user)
// const dispatch=useAppDispatch()
// const { isOpen } = useAppSelector((store) => store.root.modal);
return (
  <main className="text-slate-300 bg-slate-800 h-screen px-10 py-5 w-full">


    {/* <section className="py-10 sticky inset-0 g-zinc-800 z-[1000] shadow-lg drop-shadow-2xl shadow-[#a6fd29] hover:shadow-[#FFD300]">
      <ul className="flex justify-around items-center">
        <li>Hello</li>
        <li>Super Admin Dashboard</li>
        <li>
          <TextField size="small" fullWidth/>
        </li>
      </ul>
     
    </section> */}
   <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-3 md:gap-4 lg:mx-8 mx-4 md:mx-6">
  <div className="col-span-full flex items-center gap-3">
  

  <form className="mb-5 flex-1 " onSubmit={onSubmit}>
    <div className="max-w-xl">
      <div className="flex space-x-1 items-center mb-2">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p className="text-white text-lg font-semibold">Search User with E-mail</p>
      </div>
      <div className="flex space-x-4">
        <div className="flex rounded-md overflow-hidden w-full">
          <input required value={email} onChange={(e)=>setEmail(e.target.value)} type="email" className=" text-zinc-700 pl-4 w-full rounded-md rounded-r-none placeholder:pl-4" placeholder="Search user with Email Address" />
          <button type="submit" className="bg-indigo-600 text-white px-6 text-lg font-semibold py-3 rounded-r-md">Go</button>
        </div>
        <button disabled={!clear} onClick={onClickClearButton} type="button" className=" disabled:bg-red-300 bg-red-500 disabled:hover:cursor-not-allowed px-6 text-lg font-semibold py-2 rounded-md">Clear</button>
      </div>
    </div>
  </form>
 
 
    </div>
    <div className="col-span-full">
      <ul className="flex md:text-lg lg:text-2xl gap-2 md:gap-4 lg:gap-10 items-center lg:justify-center py-4 px-4">
        
        <li>Camera dashboard</li>
        <li>Super-admin dashboard</li>
        <li>Logout</li>
      </ul>
    </div>
    {
      users ? users.map((user:user)=>(
        <form
        className=" bg-slate-600 text-yellow-50 text-lg  flex flex-col px-5 py-5 gap-y-5   transition-all duration-100 xl:hover:scale-[1.01] last:mb-10 shadow-2xl h-full"
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
         <div className="">
          
            
          <div className="flex items-center justify-end gap-4">
          <Link className="flex   items-center gap-1" href={`/dashboard/${user._id}`}>
            
           <CameraTwoToneIcon fontSize="small" className=" text-white "/><Typography>cameras</Typography>
          </Link>
          
           
          </div>
         
          </div>
         
           
          </form>

      )):<><div className="bg-white w-full h-full">No Access</div></>
    }
  
   </section>
   
     <Modal open={open} onClose={() =>setIsopen(false)}>
      <Box>
        <ChangeProfile getAllUsers={getAllUsers} user={user} open={open} setIsopen={setIsopen}/>
        </Box>
       </Modal>
   
  </main>
)
}

export default admin;
