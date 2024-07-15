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

  // return <div className="">
    
  //   <main className=" grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 max-w-full mx-2 text-zinc-200 bg-zinc-700 last-of-type:my-10 ">
  //     <div className="text-center px-2 py-5 text-3xl">Admin Dashboard</div>
  //       <div><span><strong>Total Users-</strong> {users.length}</span> 
  //         <form action="" className="flex justify-end ">
  //         <input  className="bg-transparent px-1 py-2 border max-w-md w-full" type="email" name="" id="" placeholder="Search by email address"/>
  //         <button type="submit" className="px-5 py-2">Search</button>
  //       </form>
  //       </div>
  //     <div className="col-span-3 ">
        
        
  //     </div>
  //   {
      
  //     users && users.map((user:user)=>(
  //       <form className=" bg-zinc-800  border border-spacing-2 flex flex-col px-1 py-2 justify-center  items-center gap-1  shadow-2xl shadow-slate-900 transition-all duration-200 hover:scale-[1.03] " key={user._id}>
  //         <div className="flex gap-2 items-center">
  //           <span>Username:-</span>
  //           <input type="text" className="bg-transparent  py-2 " value={user.username} />
  //         </div>
  //         <div className="flex gap-2 items-center">
  //           <span>Email:-</span>
  //           <input type="email" className="bg-transparent  py-2" value={user.email} />
  //         </div>
  //         <div className="flex gap-2 items-center">
  //            <span>User Active:-</span>
  //           <input type="checkbox" className="bg-transparent  py-2" checked={user.active} />
  //         </div>
  //         <Link className="inline-block text-red-300 font-mono font-semibold px-2 text-right" href={`/dashboard/${user._id}`}>Cameras details</Link>
        
          
          
          
          

          
         
  //       </form>
  //     ))
      
  //   }
  //   </main>
   
  // </div>;

return (
  <main className="text-slate-300 bg-zinc-700">
    <section className="h-24  mb-5 sticky inset-0 bg-zinc-800 z-[1000] shadow-sm drop-shadow-2xl shadow-[#a6fd29] hover:shadow-[#FFD300]">
      <div className="text-ellipsis text-center lg:py-2 lg:text-2xl">Administrator Dashboard</div>
    </section>
   <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-3 md:gap-4 lg:mx-8 mx-4 md:mx-6">
    {
      users && users.map((user:user)=>(
        <form
        className="bg-zinc-800 h-48  flex flex-col px-1 py-2 justify-center  items-center gap-y-5   transition-all duration-200 xl:hover:scale-[1.01] last:mb-10  drop-shadow shadow-[#a6fd29] shadow-inner hover:shadow-[#00f6ff]  "
         key={user._id}>
          
        </form>

      ))
    }
  
   </section>
  </main>
)
}

export default admin;
