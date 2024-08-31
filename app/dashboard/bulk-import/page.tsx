"use client"
import  { axiosAuth } from "@/app/lib/axios"
import { errorHandler } from "@/hooks/useTableHook"
import { Button, Typography } from "@mui/material"
import Link from "next/link"
import { useState } from "react"

function BulkImport() {
const [file,setFile]=useState({})

function onChange(e:InputHTMLAttributes<HTMLInputElement>){
  if(e.currentTarget.files){
    setFile(e.currentTarget.files[0])
  }
}

    
async function onFormSubmit(event:React.FormEventHandler<HTMLFormElement>){
  event.preventDefault()
  try {
   const response = await axiosAuth.post("/camera/bulk-import",{file:file},
    {
      headers:{
        "Content-Type":"Application/csv"
      }
    }
   )
  console.log( response.data) 
  } catch (error) {
    errorHandler(error)
  }
  
}
  
  
  return (
    <> 
    
    <main className="w-full h-screen flex justify-center items-center text-white ">
       
    <form onSubmit={onFormSubmit}  className="max-w-2xl w-full flex flex-col gap-4 h-72 items-center justify-center border rounded mx-3">
        <Typography variant="h5">Bulk import using CSV file</Typography>
    <label htmlFor="large-file-input" className="sr-only bg-blue-500">bulk import</label>
    < input onChange={onChange} required accept=".csv" type="file" name="input" id="large-file-input" className="block max-w-lg w-full border  shadow-sm rounded-lg text-sm focus:z-10 border-zinc-100 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none
      file:bg-gray-50 file:border-0
      file:me-4
      file:py-3 file:px-4 file:sm:py-5
      dark:file:bg-neutral-700 dark:file:text-neutral-400"/>
      <div className="flex gap-5 max-w-xl">
      <Button variant="contained" size="large" type="submit">submit</Button>
      <Button color="error" component={Link} href="/dashboard" variant="contained" size="large">cancel</Button>
</div>
  </form>
  </main>
   </>
  )
}

export default BulkImport