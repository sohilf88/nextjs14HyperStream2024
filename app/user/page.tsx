"use client"
import HlsPlayer from '@/components/hslplayer';
import PaginationClient from '@/components/Pagination';
import { camera } from '@/typescript.definations';
import { axiosAuth } from '../lib/axios';
import { useSearchParams } from 'next/navigation';
import { errorHandler } from '@/hooks/useTableHook';
import { useEffect, useState } from 'react';
type dataDetail={
  message:camera[],
  success:boolean,
  totalCount:number,
  countPerPage:number,
}
function User() {
const searchParams=useSearchParams()
const page=searchParams.get("page") ?? '1'
const limit=searchParams.get("limit") ?? '8'

const gridLimit=Number(limit)/2
const start=(Number(page)-1)*(Number(limit))
const end=start+Number(limit)

console.log(page,limit)
const [data,setData]=useState<dataDetail>({
  success:false,
  message:[],
  totalCount:0,
  countPerPage:0
})
 async function getFilteredData(){
  try {
    const response =await axiosAuth.get(`/camera/filtered?page=${page}&limit=${limit}`)
    if(response.data){
  setData(response.data)
    }
    
  } catch (error) {
    errorHandler(error)
    
  }
 }
 
useEffect(()=>{
  getFilteredData()
},[page,limit])

 
<<<<<<< HEAD
  const hasNext=(end < data.totalCount)
=======
  const page = searchParams['page'] ?? '1'
  const limit = searchParams['limit'] ?? '8'
 
 const gridLimit=Number(limit)/2
  const start=(Number(page)-1)*(Number(limit))
  const end=start+Number(limit)
 
  const response=await axiosAuth.get(`/camera/filtered?page=${page}&limit=${limit}`,{withCredentials:true})
  // console.log(response)
 const hasNext=(end < response.data.totalCount)
>>>>>>> 15-formImprovement
 const hasPrevious=(start>0)

  

  


return (

<main className=''>
  <div className='pt-7 pb-6'>
    <div className="">
      <PaginationClient data={data} hasNext={hasNext} hasPrevious={hasPrevious}/>
    </div>
   
  </div>
<<<<<<< HEAD
  <div className={`grid ${gridLimit===3?"grid-cols-3":"lg:grid-cols-4"} gap-x-1 gap-y-3  mx-1   `}>
=======
  <div className={`grid ${gridLimit===3?"grid-cols-3":"lg:grid-cols-4"} 3xl:grid-cols-5 gap-x-1 gap-y-3  mx-1  `}>
>>>>>>> 15-formImprovement
      
   {
    data && data.message.map((item:camera)=>(
      <div key={item._id}>
         <HlsPlayer url={item.url}/>
      </div>
    ))
   }
<<<<<<< HEAD
  
=======
    
>>>>>>> 15-formImprovement
  </div>
     
  </main>


)
}

export default User;
