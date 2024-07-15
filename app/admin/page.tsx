"use client"

import { useState,useEffect } from "react";
import { axiosAuth } from "../lib/axios";
import Link from "next/link";
import { user } from "@/typescript.definations";

function admin() {
  const [users,setUsers]=useState([])

const getAllUsers=async()=>{
 const response=await axiosAuth.get("/admin/users")
 console.log(response.data)
 if(response.data){
  setUsers(response.data)
 }
}
useEffect(()=>{
  getAllUsers()
},[])

  return <div>
    <h1>admin page</h1>
    <main className=" grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 max-w-full mx-10 text-zinc-200 bg-zinc-700 last-of-type:my-5 ">
      <div className="col-span-3 ">
        <div className="text-center px-2 py-5 text-3xl">Admin Dashboard</div>
        <form action="" className="flex justify-end ">
          <input  className="bg-transparent px-1 py-2 border max-w-md w-full" type="email" name="" id="" placeholder="Search by email address"/>
          <button type="submit" className="px-5 py-2">Search</button>
        </form>
      </div>
    {
      
      users && users.map((user:user)=>(
        <form className=" bg-zinc-800 w-full border border-spacing-2 flex flex-col px-1 py-2 justify-center  items-center gap-1  shadow-2xl shadow-slate-900 transition-all duration-200 hover:scale-[1.03] " key={user._id}>
          <div className="flex gap-2 items-center">
            <span>Username:-</span>
            <input type="text" className="bg-transparent  py-2 " value={user.username} />
          </div>
          <div className="flex gap-2 items-center">
            <span>Email:-</span>
            <input type="email" className="bg-transparent  py-2" value={user.email} />
          </div>
          <div className="flex gap-2 items-center">
             <span>User Active:-</span>
            <input type="checkbox" className="bg-transparent  py-2" checked={user.active} />
          </div>
          <Link className="inline-block text-red-300 font-mono font-semibold px-2 text-right" href={`/dashboard/${user._id}`}>Cameras details</Link>
        
          
          
          
          

          
         
        </form>
      ))
      
    }
    </main>
   
  </div>;
}

export default admin;
