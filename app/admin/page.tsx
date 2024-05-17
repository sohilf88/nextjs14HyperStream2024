"use client"

import { useState,useEffect } from "react";
import { axiosAuth } from "../lib/axios";
import Link from "next/link";

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
    {
      users && users.map((user)=>(
        <div key={user._id}>
          <Link href={`/dashboard/${user._id}`}>{user.email}</Link>
        </div>
      ))
    }
   
  </div>;
}

export default admin;
