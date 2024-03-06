"use client"
import { Button, Stack } from "@mui/material"
import { useRouter, useSearchParams } from "next/navigation"
import ArrowRightTwoToneIcon from '@mui/icons-material/ArrowRightTwoTone';
import ArrowLeftTwoToneIcon from '@mui/icons-material/ArrowLeftTwoTone';


function PaginationClient({hasNext,hasPrevious}:{
  hasNext:boolean,
  hasPrevious:boolean,
}) {
   const searchParams = useSearchParams()
   const router = useRouter()
  const page = searchParams.get('page') ?? '1'
  const limit = searchParams.get('limit') ?? '8'
  

  
  const onChange=(e: any)=>{
     router.push(`/user?page=${page}&limit=${e.target.value}`)
    }
   
  return (
    <div className="max-w-xl mx-auto">
   <Stack direction={"row"} spacing={2} justifyContent={"center"}>
    <Button color="error"  fullWidth variant="contained"  startIcon={<ArrowLeftTwoToneIcon/>}
      disabled={!hasPrevious}
       onClick={() => {
          router.push(`/user?page=${Number(page) - 1}&limit=${limit}`)
        }}>Previous</Button>
    
      <Button fullWidth color="success"  variant="contained"  endIcon={<ArrowRightTwoToneIcon/>}
       disabled={!hasNext}
       
       onClick={() => {
          router.push(`/user?page=${Number(page) + 1}&limit=${limit}`)
        }}>Next</Button>
      
     
        <select className=" border text-white shadow-md bg-transparent px-5 py-1  rounded hover:bg-zinc-500" onChange={onChange} name="" id="">
          
         
      
          <option className="text-center" defaultValue={8} value="8">08-Cameras</option>
          <option  className="text-center" value="6">06-Cameras</option>
        </select>
      </Stack>
   
        </div>
       
    
  )
}

export default PaginationClient