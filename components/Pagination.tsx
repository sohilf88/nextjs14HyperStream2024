"use client"
import { Box, Button, Stack, TextField, Typography } from "@mui/material"
import { useRouter, useSearchParams } from "next/navigation"
import ArrowRightTwoToneIcon from '@mui/icons-material/ArrowRightTwoTone';
import ArrowLeftTwoToneIcon from '@mui/icons-material/ArrowLeftTwoTone';
import { camera } from "@/typescript.definations";
import { useState } from "react";



function PaginationClient({hasNext,hasPrevious,data}:{
  hasNext:boolean,
  hasPrevious:boolean,
  data:{
    result:camera[],
    totalCount:number,
    countPerPage:number
  }
}) {
   const searchParams = useSearchParams()
   const router = useRouter()
   const page = searchParams.get('page') ?? '1'
   const limit = searchParams.get('limit') ?? '8'
   
  const [option,setOption]=useState(8)
  const end=Math.ceil(Number(data.totalCount)/Number(limit))
 
   
  

  
  const onChange=(e: any)=>{
    setOption(e.target.value*1)
     router.push(`/user?page=${page}&limit=${e.target.value}`)
    }
  
 
   
  return (
    <div className=" mx-auto">
   <Stack direction={"row"} spacing={2} justifyContent={"center"}>
    <Button color="error"   variant="contained"  startIcon={<ArrowLeftTwoToneIcon/>}
      disabled={!hasPrevious}
       onClick={() => {
          router.push(`/user?page=${Number(page) - 1}&limit=${limit}`)
        }}>Previous</Button>
     <div className="flex justify-center items-center  font-semibold text-lg">
      <div className="px-2 py-1 text-white  rounded shadow-inner">Page-{page} of {end}</div>
     </div>
      <Button  color="success"  variant="contained"  endIcon={<ArrowRightTwoToneIcon/>}
       disabled={!hasNext}
       
       onClick={() => {
          router.push(`/user?page=${Number(page) + 1}&limit=${limit}`)
        }}>Next</Button>

        
      
     
        <select value={option} className=" border text-white shadow-md bg-transparent px-5 py-1  rounded hover:bg-zinc-500" onChange={onChange} name="" id="">
          
         
      
          <option className="text-center" defaultValue={8} value="8">08-Cameras</option>
          <option  className="text-center" value="6">06-Cameras</option>
        </select>
        {/* search by district, taluka or name or city */}

        
        
      </Stack>
   
        </div>
       
    
  )
}

export default PaginationClient